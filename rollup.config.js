import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
// CSS
import postcss from 'rollup-plugin-postcss';
import atImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';

const postcssConfig = postcss({
  extract: true,
  sourceMap: true,
  plugins: [
    atImport,
    postcssPresetEnv({
      features: { 'custom-media-queries': true, 'nesting-rules': true },
    }),
    process.env.NODE_ENV === 'production' && cssnano({ preset: 'default' }),
  ],
});

const plugins = [
  commonjs(),
  nodeResolve(),
  babel({ exclude: 'node_modules/**', babelHelpers: 'bundled' }),
  replace({
    ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
    preventAssignment: true,
  }),
  process.env.NODE_ENV === 'production' && terser(),
];

export default [
  {
    input: 'src/js/app/index.js',
    output: {
      file: 'assets/built/app.js',
      format: 'iife',
      sourcemap: true,
    },
    plugins: [...plugins, postcssConfig],
  },
  {
    input: 'src/js/post/index.js',
    output: {
      file: 'assets/built/post.js',
      format: 'iife',
      sourcemap: true,
    },
    plugins,
  },
];
