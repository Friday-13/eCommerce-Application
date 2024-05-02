export default {
  base: "./",
  build: {
    minify: false,
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  resolve: {},
};
