import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './features/Slices/UserSlice';
import LogSlice from './features/Slices/LogSlice';
import IssuingSlice from './features/Slices/IssuingSlice';
import RecievingSlice from './features/Slices/RecievingSlice';
import ProductSlice from './features/Slices/ProductSlice';
import StockMovmentSlice from './features/Slices/StockMovmentSlice';
import CategorySlice from './features/Slices/CategorySlice';
export const store = configureStore({
    reducer: {
        users: UserSlice,
        logs: LogSlice,
        issuings: IssuingSlice,
        receivings: RecievingSlice,
        products: ProductSlice,
        stockMovments: StockMovmentSlice,
        categories: CategorySlice,
    },
});
