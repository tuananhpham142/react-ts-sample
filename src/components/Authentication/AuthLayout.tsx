import React from 'react';
import background from '../../assets/background.svg';

type Props = {
    children: React.ReactNode;
};

const AuthLayout = (props: Props) => {
    const { children } = props;
    return (
        <div
            className='flex flex-col h-full bg-cover bg-center bg-no-repeat bg-primary'
            style={{
                backgroundImage: `url(${background})`,
            }}
        >
            {children}
        </div>
    );
};

export default AuthLayout;
