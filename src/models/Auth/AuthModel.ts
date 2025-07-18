export type TokenPayloadModel = {
    nameid: string;
    unique_name: string;
    jti: string;
    tenantid: string;
    tenantcode: string;
    tenantwgid: string;
    usertenantid: string;
    displayname: string;
    avatar: string;
    type: string;
    region: string;
    lang: string;
    permission: Array<string>;
    iss: string;
    aud: string;
    exp: number;
    nbf: number;
};

export type PartitionAccessedItemModel = {
    host: string;
    hostDisplayName: string;
    code: string;
    codeDisplayName: string;
};
