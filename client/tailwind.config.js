/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/DefaultTheme");
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Noto Sans", ...fontFamily.sans],
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
