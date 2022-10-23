import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './src/main.ts',
  output: [
    {
      format: 'esm',
      file: 'build.js'
    },
  ],
  plugins: [
    resolve({preferBuiltins: false}),
    typescript(),
    commonjs()
  ]
};