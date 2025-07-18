export const isValidJWT = (jwt: string) => {
    let regex = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/gm;
    const regexChecked = jwt.match(regex);
    return regexChecked !== null && Array.isArray(regexChecked)
        ? regexChecked.length > 0
            ? Boolean(regexChecked[0])
            : false
        : false;
};

const parseJwt = (token: string) => {
    if (token && token !== '' && isValidJWT(token)) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(
            window
                .atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join(''),
        );

        return JSON.parse(jsonPayload);
    }
    return undefined;
};

export default parseJwt;
