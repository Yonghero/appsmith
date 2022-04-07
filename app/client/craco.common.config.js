const CracoAlias = require("craco-alias");

debugger;
module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  externals: {
    // 下面的这些externals 有助于fabric 在服务器中正常启动：
    // canvas: "undefined",
    // "jsdom /lib/jsdom/utils": JSON.stringify({ Canvas: null }),
    // "jsdom/lib/jsdom/living/generated/utils": JSON.stringify({
    //   implForWrapper: null,
    // }),
    jsdom: "jsdom",
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: "./src",
        // tsConfigPath should point to the file where "baseUrl" and "paths" are specified
        tsConfigPath: "./tsconfig.path.json",
      },
    },
    {
      plugin: "prismjs",
      options: {
        languages: ["javascript"],
        plugins: [],
        theme: "twilight",
        css: false,
      },
    },
  ],
};
