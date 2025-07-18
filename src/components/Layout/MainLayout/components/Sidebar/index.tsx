
import useTranslation from '@/hooks/useTranslation';
type Props = { isCollapsed: boolean; setIsCollapsed: (value: boolean) => void };

export type SidebarItemModel = {
    name: string;
    path: string;
    pattern?: string;
    icon?: JSX.Element;
    children?: Array<SidebarItemModel>;
};

const Sidebar = (props: Props) => {
    const { isCollapsed, setIsCollapsed } = props;
    const { t } = useTranslation();

    return (
        <aside
            className={`bg-primary text-white font-light transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}
        ></aside>
    );
};

export default Sidebar;
