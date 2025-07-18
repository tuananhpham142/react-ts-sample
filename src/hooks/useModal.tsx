import React, { ReactNode, useCallback, useContext, useEffect, useReducer } from 'react';

export interface ModalState {
    id: string;
    args?: Record<string, unknown>;
    visible?: boolean;
    delayVisible?: boolean;
    keepMounted?: boolean;
}

export interface ModalStore {
    [key: string]: ModalState;
}

export interface ModalAction {
    type: string;
    payload: {
        modalId: string;
        args?: Record<string, unknown>;
        flags?: Record<string, unknown>;
    };
}
interface ModalCallbacks {
    [modalId: string]: {
        resolve: (args: unknown) => void;
        reject: (args: unknown) => void;
        promise: Promise<unknown>;
    };
}

/**
 * The handler to manage a modal returned by {@link useModal | useModal} hook.
 */
export interface ModalHandler<Props = Record<string, unknown>> extends ModalState {
    /**
     * Whether a modal is visible, it's controlled by {@link ModalHandler.show | show}/{@link ModalHandler.hide | hide} method.
     */
    visible: boolean;
    /**
     * If you don't want to remove the modal from the tree after hide when using helpers, set it to true.
     */
    keepMounted: boolean;
    /**
     * Show the modal, it will change {@link ModalHandler.visible | visible} state to true.
     * @param args - an object passed to modal component as props.
     */
    show: (args?: Props) => Promise<unknown>;
    /**
     * Hide the modal, it will change {@link ModalHandler.visible | visible} state to false.
     */
    hide: () => Promise<unknown>;
    /**
     * Resolve the promise returned by {@link ModalHandler.show | show} method.
     */
    resolve: (args?: unknown) => void;
    /**
     * Reject the promise returned by {@link ModalHandler.show | show} method.
     */
    reject: (args?: unknown) => void;
    /**
     * Remove the modal component from React component tree. It improves performance compared to just making a modal invisible.
     */
    remove: () => void;

    /**
     * Resolve the promise returned by {@link ModalHandler.hide | hide} method.
     */
    resolveHide: (args?: unknown) => void;
}

// Omit will not work if extends Record<string, unknown>, which is not needed here
export interface ModalHocProps {
    id: string;
    defaultVisible?: boolean;
    keepMounted?: boolean;
}
const symModalId = Symbol('ModalId');
const initialState: ModalStore = {};
const ModalContext = React.createContext<ModalStore>(initialState);
const ModalIdContext = React.createContext<string | null>(null);
const MODAL_REGISTRY: {
    [id: string]: {
        comp: React.FC<any>;
        props?: Record<string, unknown>;
    };
} = {};
const ALREADY_MOUNTED: Record<string, any> = {};

let uidSeed = 0;
let dispatch: React.Dispatch<ModalAction> = () => {
    throw new Error('No dispatch method detected, did you embed your app with Modal.Provider?');
};
const getUid = () => `_sc_modal_${uidSeed++}`;

// Modal reducer used in useReducer hook.
export const reducer = (state: ModalStore = initialState, action: ModalAction): ModalStore => {
    switch (action.type) {
        case 'modal/show': {
            const { modalId, args } = action.payload;
            return {
                ...state,
                [modalId]: {
                    ...state[modalId],
                    id: modalId,
                    args,
                    // If modal is not mounted, mount it first then make it visible.
                    // There is logic inside HOC wrapper to make it visible after its first mount.
                    // This mechanism ensures the entering transition.
                    visible: !!ALREADY_MOUNTED[modalId],
                    delayVisible: !ALREADY_MOUNTED[modalId],
                },
            };
        }
        case 'modal/hide': {
            const { modalId } = action.payload;
            if (!state[modalId]) return state;
            return {
                ...state,
                [modalId]: {
                    ...state[modalId],
                    visible: false,
                },
            };
        }
        case 'modal/remove': {
            const { modalId } = action.payload;
            const newState = { ...state };
            delete newState[modalId];
            return newState;
        }
        case 'modal/set-flags': {
            const { modalId, flags } = action.payload;
            return {
                ...state,
                [modalId]: {
                    ...state[modalId],
                    ...flags,
                },
            };
        }
        default:
            return state;
    }
};

// action creator to show a modal
function showModal(modalId: string, args?: Record<string, unknown>): ModalAction {
    return {
        type: 'modal/show',
        payload: {
            modalId,
            args,
        },
    };
}

// action creator to set flags of a modal
function setModalFlags(modalId: string, flags: Record<string, unknown>): ModalAction {
    return {
        type: 'modal/set-flags',
        payload: {
            modalId,
            flags,
        },
    };
}
// action creator to hide a modal
function hideModal(modalId: string): ModalAction {
    return {
        type: 'modal/hide',
        payload: {
            modalId,
        },
    };
}

// action creator to remove a modal
function removeModal(modalId: string): ModalAction {
    return {
        type: 'modal/remove',
        payload: {
            modalId,
        },
    };
}

const modalCallbacks: ModalCallbacks = {};
const hideModalCallbacks: ModalCallbacks = {};
const getModalId = (modal: string | React.FC<any>): string => {
    if (typeof modal === 'string') return modal as string;
    //@ts-ignore
    if (!modal[symModalId]) {
        //@ts-ignore
        modal[symModalId] = getUid();
    }
    //@ts-ignore
    return modal[symModalId];
};

/** omit id and partial all required props */
type ModalArgs<T> = T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
    ? Omit<React.ComponentProps<T>, 'id'>
    : Record<string, unknown>;
export function show<T extends any>(modal: React.FC<any>, args?: ModalArgs<React.FC<any>>): Promise<T>;
// export function show<T extends any, C extends React.FC>(modal: C, args?: Omit<React.ComponentProps<C>, 'id'>): Promise<T>;
export function show<T extends any>(modal: string, args?: Record<string, unknown>): Promise<T>;
export function show<T extends any, P extends any>(modal: string, args: P): Promise<T>;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function show(modal: React.FC<any> | string, args?: ModalArgs<React.FC<any>> | Record<string, unknown>) {
    const modalId = getModalId(modal);
    if (typeof modal !== 'string' && !MODAL_REGISTRY[modalId]) {
        register(modalId, modal as React.FC);
    }

    dispatch(showModal(modalId, args));
    if (!modalCallbacks[modalId]) {
        // `!` tell ts that theResolve will be written before it is used
        let theResolve!: (args?: unknown) => void;
        // `!` tell ts that theResolve will be written before it is used
        let theReject!: (args?: unknown) => void;
        const promise = new Promise((resolve, reject) => {
            theResolve = resolve;
            theReject = reject;
        });
        modalCallbacks[modalId] = {
            resolve: theResolve,
            reject: theReject,
            promise,
        };
    }
    return modalCallbacks[modalId].promise;
}

export function hide<T>(modal: string | React.FC<any>): Promise<T>;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function hide(modal: string | React.FC<any>) {
    const modalId = getModalId(modal);
    dispatch(hideModal(modalId));
    // Should also delete the callback for modal.resolve #35
    delete modalCallbacks[modalId];
    if (!hideModalCallbacks[modalId]) {
        // `!` tell ts that theResolve will be written before it is used
        let theResolve!: (args?: unknown) => void;
        // `!` tell ts that theResolve will be written before it is used
        let theReject!: (args?: unknown) => void;
        const promise = new Promise((resolve, reject) => {
            theResolve = resolve;
            theReject = reject;
        });
        hideModalCallbacks[modalId] = {
            resolve: theResolve,
            reject: theReject,
            promise,
        };
    }
    return hideModalCallbacks[modalId].promise;
}

export const remove = (modalId: string): void => {
    dispatch(removeModal(modalId));
    delete modalCallbacks[modalId];
    delete hideModalCallbacks[modalId];
};

const setFlags = (modalId: string, flags: Record<string, unknown>): void => {
    dispatch(setModalFlags(modalId, flags));
};
export function useModal(): ModalHandler;
export function useModal(modal: string, args?: Record<string, unknown>): ModalHandler;
export function useModal<
    T extends React.FC<any>,
    ComponentProps extends ModalArgs<T>,
    PreparedProps extends Partial<ComponentProps> = {} | ComponentProps,
    RemainingProps = Omit<ComponentProps, keyof PreparedProps> & Partial<ComponentProps>,
>(
    modal: T,
    args?: PreparedProps,
): Omit<ModalHandler, 'show'> & {
    show: Partial<RemainingProps> extends RemainingProps
        ? (args?: RemainingProps) => Promise<unknown>
        : (args: RemainingProps) => Promise<unknown>;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useModal(modal?: any, args?: any): any {
    const modals = useContext(ModalContext);
    const contextModalId = useContext(ModalIdContext);
    let modalId: string | null = null;
    const isUseComponent = modal && typeof modal !== 'string';
    if (!modal) {
        modalId = contextModalId;
    } else {
        modalId = getModalId(modal);
    }

    // Only if contextModalId doesn't exist
    if (!modalId) throw new Error('No modal id found in Modal.useModal.');

    const mid = modalId as string;
    // If use a component directly, register it.
    useEffect(() => {
        if (isUseComponent && !MODAL_REGISTRY[mid]) {
            register(mid, modal as React.FC, args);
        }
    }, [isUseComponent, mid, modal, args]);

    const modalInfo = modals[mid];

    const showCallback = useCallback((args?: Record<string, unknown>) => show(mid, args), [mid]);
    const hideCallback = useCallback(() => hide(mid), [mid]);
    const removeCallback = useCallback(() => remove(mid), [mid]);
    const resolveCallback = useCallback(
        (args?: unknown) => {
            modalCallbacks[mid]?.resolve(args);
            delete modalCallbacks[mid];
        },
        [mid],
    );
    const rejectCallback = useCallback(
        (args?: unknown) => {
            modalCallbacks[mid]?.reject(args);
            delete modalCallbacks[mid];
        },
        [mid],
    );
    const resolveHide = useCallback(
        (args?: unknown) => {
            hideModalCallbacks[mid]?.resolve(args);
            delete hideModalCallbacks[mid];
        },
        [mid],
    );

    return {
        id: mid,
        args: modalInfo?.args,
        visible: !!modalInfo?.visible,
        keepMounted: !!modalInfo?.keepMounted,
        show: showCallback,
        hide: hideCallback,
        remove: removeCallback,
        resolve: resolveCallback,
        reject: rejectCallback,
        resolveHide,
    };
}
export const create = <P extends {}>(Comp: React.ComponentType<P>): React.FC<P & ModalHocProps> => {
    return ({ defaultVisible, keepMounted, id, ...props }) => {
        const { args, show } = useModal(id);

        // If there's modal state, then should mount it.
        const modals = useContext(ModalContext);
        const shouldMount = !!modals[id];

        useEffect(() => {
            // If defaultVisible, show it after mounted.
            if (defaultVisible) {
                show();
            }

            ALREADY_MOUNTED[id] = true;

            return () => {
                delete ALREADY_MOUNTED[id];
            };
        }, [id, show, defaultVisible]);

        useEffect(() => {
            if (keepMounted) setFlags(id, { keepMounted: true });
        }, [id, keepMounted]);

        const delayVisible = modals[id]?.delayVisible;
        // If modal.show is called
        //  1. If modal was mounted, should make it visible directly
        //  2. If modal has not been mounted, should mount it first, then make it visible
        useEffect(() => {
            if (delayVisible) {
                // delayVisible: false => true, it means the modal.show() is called, should show it.
                show(args);
            }
        }, [delayVisible, args, show]);

        if (!shouldMount) return null;
        return (
            <ModalIdContext.Provider value={id}>
                <Comp {...(props as unknown as P)} {...args} />
            </ModalIdContext.Provider>
        );
    };
};

// All registered modals will be rendered in modal placeholder
export const register = <T extends React.FC<any>>(id: string, comp: T, props?: Partial<ModalArgs<T>>): void => {
    if (!MODAL_REGISTRY[id]) {
        MODAL_REGISTRY[id] = { comp, props };
    } else {
        MODAL_REGISTRY[id].props = props;
    }
};

/**
 * Unregister a modal.
 * @param id - The id of the modal.
 */
export const unregister = (id: string): void => {
    delete MODAL_REGISTRY[id];
};

// The placeholder component is used to auto render modals when call modal.show()
// When modal.show() is called, it means there've been modal info
const ModalPlaceholder: React.FC = () => {
    const modals = useContext(ModalContext);
    const visibleModalIds = Object.keys(modals).filter((id) => !!modals[id]);
    visibleModalIds.forEach((id) => {
        if (!MODAL_REGISTRY[id] && !ALREADY_MOUNTED[id]) {
            console.warn(
                `No modal found for id: ${id}. Please check the id or if it is registered or declared via JSX.`,
            );
            return;
        }
    });

    const toRender = visibleModalIds
        .filter((id) => MODAL_REGISTRY[id])
        .map((id) => ({
            id,
            ...MODAL_REGISTRY[id],
        }));

    return (
        <>
            {toRender.map((t) => (
                <t.comp key={t.id} id={t.id} {...t.props} />
            ))}
        </>
    );
};

const InnerContextProvider: React.FC<any> = ({ children }) => {
    const arr = useReducer(reducer, initialState);
    const modals = arr[0];
    dispatch = arr[1];
    return (
        <ModalContext.Provider value={modals}>
            {children}
            <ModalPlaceholder />
        </ModalContext.Provider>
    );
};

export const Provider: React.FC<{
    children: ReactNode;
    dispatch?: React.Dispatch<ModalAction>;
    modals?: ModalStore;
}> = ({
    children,
    dispatch: givenDispatch,
    modals: givenModals,
}: {
    children: ReactNode;
    dispatch?: React.Dispatch<ModalAction>;
    modals?: ModalStore;
}) => {
    if (!givenDispatch || !givenModals) {
        return <InnerContextProvider>{children}</InnerContextProvider>;
    }
    dispatch = givenDispatch;
    return (
        <ModalContext.Provider value={givenModals}>
            {children}
            <ModalPlaceholder />
        </ModalContext.Provider>
    );
};

/**
 * Declarative way to register a modal.
 * @param id - The id of the modal.
 * @param component - The modal Component.
 * @returns
 */
export const ModalDef: React.FC<{
    id: string;
    component: React.FC<any>;
}> = ({ id, component }: { id: string; component: React.FC<any> }) => {
    useEffect(() => {
        register(id, component);
        return () => {
            unregister(id);
        };
    }, [id, component]);
    return null;
};

const Modal = {
    Provider,
    ModalDef,
    ModalContext,
    create,
    register,
    show,
    hide,
    remove,
    useModal,
    reducer,
};

export default Modal;
