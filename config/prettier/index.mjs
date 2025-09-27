/** @typedef {import("prettier").Config} Config */

/** @type {Config} */
export const config = {
    plugins: ["prettier-plugin-tailwindcss"],
    printWidth: 80,
    tabsWidth: 2,
    useTabs: false,
    semi: false,
    singleQuote: true,
    quoteProps: "as-needed",
    jsxSingleQuote: false,
    trailingComma: "es5",
    bracketSpacing: true,
    arrowParens: "always",
    endOfLine: "auto",
    bracketSameLine: false,
};

export default config;