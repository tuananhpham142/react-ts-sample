import { login } from '@/services/auth/thunk';
import { AppDispatch, RootState, useAppDispatch } from '@/services/store';
import setCookie from '@/utils/cookies/setCookie';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Spinner: React.FC = () => (
    <svg
        className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
    >
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
        <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        ></path>
    </svg>
);

const LoginPage: React.FC = () => {
    const isLoading = useSelector<RootState, boolean>((state) => state.auth.isLoading);
    const navigate = useNavigate();
    const dispatch: AppDispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const [login, loginState] = useLoginMutation();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const result = unwrapResult(
                await dispatch(
                    login({
                        Password: password,
                        Username: email,
                    }),
                ),
            );
            if (result) {
                // const cookies = new Cookies();
                // cookies.set('_token', result.AccessToken, { maxAge: 2147483647, path: '/' });
                // cookies.set('_refreshToken', result.AccessToken, { maxAge: 2147483647, path: '/' });

                setCookie({
                    name: process.env.VITE_AUTH_KEY as string,
                    value: result.AccessToken,
                    options: {
                        maxAge: result.Expires,
                    },
                });
                setCookie({
                    name: process.env.VITE_AUTH_REFRESH as string,
                    value: result.AccessToken,
                    options: {
                        maxAge: result.Expires * 2,
                    },
                });
                // Navigate after login
                navigate('/');
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <div className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg'>
                <div>
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
                </div>
                <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                    <div className='rounded-md shadow-sm -space-y-px'>
                        <div>
                            <label htmlFor='email-address' className='sr-only'>
                                Email address
                            </label>
                            <input
                                id='email-address'
                                name='email'
                                type='email'
                                autoComplete='email'
                                required
                                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                placeholder='Email address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='sr-only'>
                                Password
                            </label>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                autoComplete='current-password'
                                required
                                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            disabled={isLoading}
                            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed'
                        >
                            {isLoading ? <Spinner /> : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
