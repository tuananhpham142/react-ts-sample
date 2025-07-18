import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import NotFound from '@/pages/NotFound';
import routes from '@/routes/routeConfig';
import { useAppSelector } from '@/services/store';
import { RouteItemInterface } from '@/types/route.types';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';

const AppRoutes = () => {
    const location = useLocation();
    const { data } = useAppSelector((state) => state.auth);

    return (
        <TransitionGroup component={null}>
            <Routes location={location}>
                <Route path='/' element={<Navigate to='/dashboard' replace={true} />}></Route>
                {routes.map((route: RouteItemInterface) => {
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <LayoutWrapper token={data.AccessToken}>
                                    {/* @ts-ignore */}
                                    <route.component />
                                </LayoutWrapper>
                            }
                        />
                    );
                })}

                <Route path='*' element={<NotFound />}></Route>
            </Routes>
        </TransitionGroup>
    );
};
export default AppRoutes;
