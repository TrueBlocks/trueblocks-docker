module.exports = {
    parser: "babel-eslint",
    parserOptions: {
        sourceType:  'module',  // Allows for the use of imports
        ecmaFeatures:  {
            jsx:  true  // Allows for the parsing of JSX
        }
    },
    settings:  {
        react:  {
            version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    "rules": {
    }
};

