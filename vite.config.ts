import tsconfigPaths from 'vite-tsconfig-paths';

export default {
  base: './',
  build: {
    minify: false,
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
  plugins: [tsconfigPaths()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  resolve: {},
};
