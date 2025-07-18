import { api } from '../api';
import { login } from './queries/login';
import { register } from './queries/register';

const queries = api.injectEndpoints({
    endpoints: (builder) => ({
        register: register(builder),
        login: login(builder),
    }),
});

export default queries;
