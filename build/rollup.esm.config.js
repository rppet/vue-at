import basicConfig from './rollup.config'
export default {
  ...basicConfig,
  output: {
    name:'file',
    file: 'dist/index.js',
    format: 'es'
  }
}