import { resolve } from 'path'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue2'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    // vite for vue 2
    vue(),
    AutoImport({
      imports: [
        'vue',
      ],
    }),
    splitVendorChunkPlugin(),
  ],
  server: {
    port: 3000
  },
  build: {
    target: 'es2015',
    minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
    manifest: false, // 是否产出manifest.json
    sourcemap: false, // 是否产出sourcemap.json
    outDir: 'dist', // 产出目录
  },
  resolve: {
    alias: {
      '@': `${resolve(__dirname, 'src')}`,
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
