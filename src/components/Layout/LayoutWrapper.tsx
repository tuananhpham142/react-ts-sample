import { useAppSelector } from '@/services/store';
import { FC, PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';

interface IProps extends PropsWithChildren {
    token: string;
}

const LayoutWrapper: FC<IProps> = (props) => {
    const { children } = props;
    const location = useLocation();
    const { data } = useAppSelector((state) => state.auth);

    // IS AUTHENTICATED
    // const isAuthenticated = useMemo(() => {
    //     return Boolean(data?.AccessToken && isValidJWT(data?.AccessToken));
    // }, [data]);

    // IS AUTHENTICATED

    // IS AUTH ROUTE
    // const isAuthRoute = matchPath(paths.Login, location.pathname);
    // IS AUTH ROUTE

    // IS AUTHORIZATION ROUTE
    // const isAuthorizationRoute = matchPath(paths.SSOAuthorization, location.pathname);
    // IS AUTHORIZATION ROUTE

    // CHECK AUTHENTICATION AND ROUTE TO: NAVIGATE OR RENDER LAYOUT
    // if (!isAuthenticated) {
    //     if (isAuthRoute) {
    //         return <MinimalLayout>{children}</MinimalLayout>;
    //     }
    //     if (!isAuthRoute) {
    //         return <Navigate to={paths.Login} state={{ from: location.state?.from || location.pathname }} />;
    //     }
    // } else {
    //     if (isAuthRoute) {
    //         return <Navigate to={location.state?.from || paths.Dashboard} />;
    //     } else {
    //         if (isAuthorizationRoute) {
    //             return <MinimalLayout>{children}</MinimalLayout>;
    //         }
    //         return <MainLayout>{children}</MainLayout>;
    //     }
    // }
    return <>{children}</>;
};

export default LayoutWrapper;
