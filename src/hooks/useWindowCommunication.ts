import { useEffect, useRef, useState } from 'react';

const initialState = {
    lastMessage: undefined,
    messages: [],
};

const supportsBroadcastAPI = typeof window !== 'undefined' && 'BroadcastChannel' in window;

const useBrowserContextCommunication = (channelName: string) => {
    if (channelName === undefined) {
        throw Error('You need to pass a channel name e.g. useBrowserContextCommunication("GreatChannel")');
    }

    const [messages, setMessages] = useState<any>(initialState);
    const channel = useRef<any>();

    if (supportsBroadcastAPI) {
        channel.current = new BroadcastChannel(channelName);
    }

    const postMessage = (message: string) => {
        if (message) {
            const msg = JSON.stringify({
                message,
                time: Date.now(),
            });

            if (supportsBroadcastAPI && channel && channel.current) {
                channel.current.postMessage(msg);
            } else {
                window.localStorage.setItem(channelName, msg);
            }
        }
    };

    const updateState = (data: { message: string }) => {
        setMessages((prevState: any) => {
            return {
                lastMessage: data.message,
                messages: prevState.messages.concat(data.message),
            };
        });
    };

    const updateFromLocalStorage = (e: any) => {
        try {
            const data = JSON.parse(e.newValue);
            if (data !== null && data !== undefined) {
                updateState(data);
            }
        } catch (error: any) {
            console.info('React Window Communication: Failed to parse json from localstorage');
        }
    };

    useEffect(() => {
        if (supportsBroadcastAPI && channel && channel.current) {
            if (channel && channel.current) {
                channel.current.onmessage = (e: any) => updateState(JSON.parse(e.data));
            }
        } else {
            window.addEventListener('storage', updateFromLocalStorage);
        }

        return function cleanUp() {
            if (channel && channel.current) {
                channel.current.close();
                channel.current = null;
            } else {
                window.localStorage.removeItem(channelName);
                window.removeEventListener('storage', updateFromLocalStorage);
            }
        };
    }, [channelName]);

    return [messages, postMessage];
};

export default useBrowserContextCommunication;
