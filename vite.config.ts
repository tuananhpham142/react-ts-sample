// import react from '@vitejs/plugin-react-swc'
import path from 'path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        build: {
            outDir: path.join(__dirname, 'build'),
        },
        plugins: [tailwindcss()],
        optimizeDeps: {
            exclude: ['js-big-decimal'],
        },
    };
});
