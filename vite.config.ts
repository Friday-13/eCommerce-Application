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
    plugins: ['vite-plugin-environment'],
  },
  plugins: [tsconfigPaths()],
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[local]',
    },
  },
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
    },
  },
};
