module.exports = {
    purge: {
        content: ['./src/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    content: [
        './src/**/*.{html,js}',
        './node_modules/tw-elements/dist/js/**/*.js',
    ],
    plugins: [require('tw-elements/dist/plugin')],
};
