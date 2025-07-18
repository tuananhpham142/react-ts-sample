import { useCallback, useState } from 'react';

const useForceUpdate = () => {
    //@ts-ignore
    const [trigger, setTrigger] = useState<boolean>(false);

    return useCallback(() => {
        setTrigger((trigger) => !trigger);
    }, []);
};

export default useForceUpdate;
