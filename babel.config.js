module.exports = function (api) {
  const isEs = process.env.BABEL_ENV === "es";
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        modules: isEs ? false : "auto",
        targets: {
          ie: "9",
        },
      },
    ],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ];

  const plugins = [
    "@babel/plugin-proposal-optional-chaining",
    ["@babel/plugin-proposal-class-properties"],
    "@babel/plugin-transform-runtime",
    "add-module-exports",
    // [
    //   "babel-plugin-import",
    //   { libraryName: "antd", libraryDirectory: "es", style: "css" }, 'antd'
    // ],
    // [
    //   "babel-plugin-import",
    //   { libraryName: "@alifd/next", libraryDirectory: "es", style: "css" },
    // ],
  ];

  return {
    presets,
    plugins,
  };
};
