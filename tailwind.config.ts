const config = {
    darkMode: 'class',
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/@softcom/ui/**/*.{js,jsx,ts,tsx}',
        './node_modules/@softcom/ui/build/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            keyframes: {
                'fade-down': {
                    '0%': {opacity: '0', transform: 'translateY(-10px)'},
                    '100%': {opacity: '1', transform: 'translateY(0)'},
                },
                'fade-right': {
                    '0%': {opacity: '0', transform: 'translateX(-20px)'},
                    '100%': {opacity: '1', transform: 'translateX(0)'},
                },
                'fade-left': {
                    '0%': {opacity: '0', transform: 'translateX(20px)'},
                    '100%': {opacity: '1', transform: 'translateX(0)'},
                },
            },
            animation: {
                'fade-right': 'fade-right 0.3s ease-out forwards',
                'fade-left': 'fade-left 0.3s ease-out forwards',
                'fade-down': 'fade-down 0.3s ease-out',
            },
        },
    }
};
export default config;
