import '@/styles/app.scss';
import dayjs from 'dayjs';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './global.css';
import AppRoutes from './routes/AppRoutes';
import store, { persistor } from './services/store';
import { i18n } from './translations';
import I18nextProviderWrapper from './translations/i18n/I18nextProviderWrapper';
dayjs.locale('vi');

function App() {
    return (
        <I18nextProviderWrapper i18n={i18n}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <BrowserRouter>
                        <AppRoutes />
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </I18nextProviderWrapper>
    );
}

export default App;
