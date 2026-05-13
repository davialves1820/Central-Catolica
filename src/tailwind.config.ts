const config = {
    theme: {
        extend: {
            colors: {
                violet: "hsl(var(--violet) / <alpha-value>)",
                "violet-light": "hsl(var(--violet-light) / <alpha-value>)",
                emerald: "hsl(var(--emerald) / <alpha-value>)",
                "emerald-light": "hsl(var(--emerald-light) / <alpha-value>)",
                saint: "hsl(var(--saint) / <alpha-value>)",
                "saint-light": "hsl(var(--saint-light) / <alpha-value>)",
            },
            content: ["src/**/*.{js,ts,jsx,tsx,md,mdx}"],
        },
    },
};

export default config;