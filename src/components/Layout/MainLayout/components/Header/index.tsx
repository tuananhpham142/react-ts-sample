import useTranslation from '@/hooks/useTranslation';
import { FC } from 'react';
interface IProps {}

const Header: FC<IProps> = (props) => {
    const { t } = useTranslation();

    return (
        <header className='bg-white shadow px-4 flex justify-between items-center h-16 border-b border-gray-100'></header>
    );
};
export default Header;
