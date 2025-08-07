import LoginPage from '@/pages/Auth/Login';
import Home from '@/pages/Home';
import { RouteItemInterface } from '@/types/route.types';

type RouteInterface = Array<RouteItemInterface>;

export const paths = {
    Home: '/',
    Login: '/login',
};

const routes: RouteInterface = [
    {
        name: 'Home',
        path: `${paths.Home}`,
        exact: true,
        component: Home,
        isPrivate: false,
    },
    {
        name: 'Login',
        path: `${paths.Login}`,
        exact: true,
        component: LoginPage,
        isPrivate: false,
    },
];

export default routes;
