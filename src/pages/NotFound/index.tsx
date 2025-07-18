import { useNavigate } from 'react-router-dom';

type Props = {};

const NotFound = (props: Props) => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900'>
            <h1 className='text-6xl font-bold text-primary'>404</h1>
            <h2 className='text-2xl font-semibold mt-4'>Oops! Trang không tìm thấy</h2>
            <p className='text-gray-600 mt-2 text-center max-w-md'>
                Trang bạn đang tìm kiếm có thể đã bị xóa, đã đổi tên hoặc tạm thời không khả dụng.
            </p>
            <div className='flex items-center gap-4'>
                <button
                    onClick={() => {
                        navigate(-1);
                    }}
                    className='mt-6 px-2 py-1.5 rounded-lg bg-primary text-white'
                >
                    Quay lại trang trước
                </button>
            </div>
        </div>
    );
};

export default NotFound;
