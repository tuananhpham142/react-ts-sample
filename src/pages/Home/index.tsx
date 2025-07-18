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
        await dispatch(createCart({}));
    };

    useEffect(() => {
        dispatch(getListCart({}));
    }, []);

    return <div className='h-screen'>Homepage</div>;
};

export default Home;
