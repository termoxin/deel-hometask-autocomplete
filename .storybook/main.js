const path = require("path");

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-scss",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/pages": path.resolve(__dirname, "../pages"),
      "@/components": path.resolve(__dirname, "../components"),
      "@/styles": path.resolve(__dirname, "../styles"),
      "@/utils": path.resolve(__dirname, "../utils"),
      "@": path.resolve(__dirname, "../"),
    };

    return config;
  },
};
