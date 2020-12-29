import babel from '@rollup/plugin-babel';

const config = {
  input: 'src/index.js',
  output: {
    format: 'esm',
    file: 'dist/stats.esm.js',
  },
  plugins: [babel({ babelHelpers: 'runtime' })],
  external: [/@babel\/runtime/, 'uuid', '@alexbainter/indexed-db'],
};

export default config;
