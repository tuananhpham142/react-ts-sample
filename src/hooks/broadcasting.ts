const supportsBroadcastAPI = typeof window !== 'undefined' && 'BroadcastChannel' in window;

const postBroadcasting = (channelName: string, message: string) => {
    let channel: BroadcastChannel | undefined = undefined;

    if (channelName === undefined) {
        throw Error('You need to pass a channel name e.g. useBrowserContextCommunication("GreatChannel")');
    }

    if (supportsBroadcastAPI) {
        channel = new BroadcastChannel(channelName);
    }

    const msg = JSON.stringify({
        message,
        time: Date.now(),
    });

    if (supportsBroadcastAPI && channel) {
        channel.postMessage(msg);
    } else {
        window.localStorage.setItem(channelName, msg);
    }
};

export default postBroadcasting;
