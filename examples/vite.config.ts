import { resolve } from 'path'
import { defineConfig } from 'vite'
// import { readdirSync, statSync } from 'fs'

// const alias = []
// const paths = readdirSync('./src')
// for (const path of paths) {
//   if (statSync(resolve('./src', path)).isDirectory()) {
//     alias.push({
//       find: `@engine/${path}`,
//       replacement: resolve(__dirname, `../src/${path}`)
//     })
//   }
// }

export default defineConfig({
  server: {
    open: true,
    port: 8083,
    host: '0.0.0.0',
  },
  publicDir: './public/',
  base: './',
  root: './examples',
  resolve: {
    alias: [
      // ...alias,
      { find: '@engine', replacement: resolve(__dirname, '../src') }
    ]
  },
})
