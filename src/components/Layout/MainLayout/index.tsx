import { FC, PropsWithChildren, useState } from 'react';
import Header from './components/Header/index';
import Sidebar from './components/Sidebar';
import useLocalStorage from '@/utils/useLocalStorage';

interface IProps extends PropsWithChildren {}

const MainLayout: FC<IProps> = (props) => {
    const { children } = props;
    const [isCollapsed, setIsCollapsed] = useLocalStorage('collapse-sidebar', false);

    return (
        <div className='flex h-screen'>
            {/* Sidebar */}
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            {/* Main Content */}
            <div className='flex-1 flex flex-col'>
                {/* Header */}
                <Header />
                {/* Page Content */}
                <main className='flex-1 p-4 bg-gray-100 overflow-auto'>{children}</main>
            </div>
        </div>
    );
};
export default MainLayout;
