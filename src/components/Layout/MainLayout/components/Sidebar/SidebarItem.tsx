import { FC, useState } from 'react';
import { FaChevronDown, FaChevronRight, FaShapes } from 'react-icons/fa6';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import { SidebarItemModel } from '.';

type Props = {
    item: SidebarItemModel;
    isCollapsed: boolean;
};

const SidebarItem: FC<Props> = (props) => {
    const { item, isCollapsed } = props;
    const location = useLocation();
    const navigate = useNavigate();

    const hasChildren = item.children && item.children.length > 0;
    const isHasChildActive =
        hasChildren &&
        item?.children?.some((child) =>
            matchPath(
                {
                    path: child?.pattern || child.path,
                    caseSensitive: false,
                },
                location.pathname,
            ),
        );
    const isActive =
        matchPath(
            {
                path: item.pattern || item.path,
                caseSensitive: false,
            },
            location.pathname,
        ) || isHasChildActive;

    const [expanded, setExpanded] = useState(isHasChildActive);
    return (
        <li key={item.path} className='mb-2 w-full relative group'>
            <Link
                to={item.path}
                className={`flex items-center ps-4 pe-3 group-hover:bg-gray-700 rounded text-nowrap h-8 cursor-pointer ${
                    isActive ? 'bg-gray-700' : ''
                }`}
                onClick={(e) => {
                    e?.preventDefault();
                    hasChildren ? setExpanded(!expanded) : navigate(item.path);
                }}
            >
                <div className='flex-grow flex items-center'>
                    {isCollapsed ? item.icon || <FaShapes /> : <p>{item.name}</p>}
                </div>
                {hasChildren && !isCollapsed && (
                    <span className='ml-auto'>
                        {expanded ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
                    </span>
                )}
            </Link>

            {hasChildren && (expanded || isCollapsed) && (
                <div
                    className={`${
                        isCollapsed &&
                        'ps-1 hidden group-hover:flex items-center absolute top-1/2 -translate-y-1/2 left-full z-100'
                    }`}
                >
                    <div
                        className={`ml-4 flex flex-row gap-0.5 bg-primary rounded-lg ${
                            isCollapsed ? 'min-w-52 relative shadow p-2' : 'mt-1.5'
                        }`}
                    >
                        <div className='flex flex-col gap-1.5 flex-1'>
                            {item?.children?.map((child) => {
                                const isActive = matchPath(
                                    {
                                        path: child?.pattern || child.path,
                                        caseSensitive: false,
                                    },
                                    location.pathname,
                                );

                                return (
                                    <Link
                                        key={child.path}
                                        className={`ps-2 block py-1.5 rounded hover:bg-gray-700 ${
                                            isActive ? 'bg-gray-700 !text-secondary' : ''
                                        }`}
                                        to={child.path}
                                    >
                                        <p>{child.name}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </li>
    );
};

export default SidebarItem;
