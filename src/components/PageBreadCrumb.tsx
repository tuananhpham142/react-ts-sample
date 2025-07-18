import React from 'react';
import { Link, To, useLocation, useNavigate } from 'react-router-dom'; // Nếu dùng Next.js, thay bằng `next/link`

interface Breadcrumb {
    label: string;
    to: To;
}

interface BreadcrumbsProps {
    items: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    const navigate = useNavigate();
    const { state } = useLocation();
    return (
        <nav aria-label='breadcrumb' className=''>
            <ul className='ps-2 flex text-gray-600'>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={item.label} className='flex items-center text-sm'>
                            {index > 0 && <span className='mx-1.5'>/</span>}
                            {isLast ? (
                                <span className='text-gray-800'>{item.label}</span>
                            ) : (
                                <span
                                    onClick={() => {
                                        navigate(item.to, {
                                            state,
                                        });
                                    }}
                                    className='hover:underline text-blue-12 cursor-pointer'
                                >
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;
