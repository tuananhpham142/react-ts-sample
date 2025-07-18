import Home from '@/pages/Home';
import { RouteItemInterface } from '@/types/route.types';
// import Workgroup from '@/pages/Workgroup/List';

type RouteInterface = Array<RouteItemInterface>;

export const paths = {
    Home: '/',
};

const routes: RouteInterface = [
    // Home
    {
        name: 'Home',
        path: `${paths.Home}`,
        exact: true,
        component: Home,
        isPrivate: false,
    },
];

export default routes;
