import { RootState } from '../store';

export const getListCartDisplay = (
    state: RootState,
): Array<{
    Id: string;
    TotalItem: number;
    Label: string;
}> => {
    const carts = state?.cart?.carts ?? [];
    if (!Array.isArray(carts)) {
        return [];
    }

    return carts.map((item, index) => ({
        Id: item?.CartId || '',
        TotalItem: item.Total || 0,
        Label: `${index}`,
    }));
};
