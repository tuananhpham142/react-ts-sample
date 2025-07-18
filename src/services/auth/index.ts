import queries from './query';

const actions: typeof queries = {
    ...queries,
};
const { useLoginMutation, useRegisterMutation } = actions;

export { useLoginMutation, useRegisterMutation };
export default actions;
