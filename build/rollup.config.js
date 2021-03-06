import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from "rollup-plugin-terser";
export default {
  input: 'src/index.js',
  // output: {
  //   file: 'dist/index.js',
  //   format: 'es'
  // },
  plugins: [
    terser(),
    nodeResolve(),
    vue(),
    css({ output: 'bundle.css' }),
    commonjs()
  ],
  external: ['vue','element-plus']
}