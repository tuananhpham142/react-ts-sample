export type RouteItemInterface = {
    name: string;
    path: string;
    subRoutes?: Array<RouteItemInterface>;
    header?: Array<HeaderInterface>;
    exact?: boolean;
    component?: React.FunctionComponent<any>;
    isPrivate?: boolean;
};

export type HeaderInterface = {
    name: string;
    path: string;
};

export type RegionItemInterface = {
    name: string;
    routes: Array<RouteItemInterface>;
};

export type RouteInterface = Array<RouteItemInterface>;
export type RegionInterface = Array<RegionItemInterface>;
