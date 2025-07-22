import { CartModel } from '@/models/Cart/CartModel';
import { createCart, getListCart } from '@/services/cart';
import { getListCartDisplay } from '@/services/cart/selectors';
import { RootState, useAppDispatch } from '@/services/store';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

type Props = {};

const Home: FC<Props> = (props) => {
    const dispatch = useAppDispatch();

    const currentCart = useSelector<RootState, CartModel | null>((state) => state.cart.cart);
    const carts = useSelector((state: RootState) => getListCartDisplay(state));

    const handleCreateCart = async () => {
        alert('This Action will call API create cart');
        await dispatch(createCart({}));
    };

    useEffect(() => {
        dispatch(getListCart({}));
    }, []);

    return (
        <div className='h-screen flex items-center justify-center'>
            <ul>
                {carts.map((cart) => (
                    <li key={cart.Id}>{cart.Label}</li>
                ))}
            </ul>
            <button className='bg-primary rounded-lg text-white px-2 py-1.5' onClick={handleCreateCart}>
                Create cart
            </button>
        </div>
    );
};

export default Home;
