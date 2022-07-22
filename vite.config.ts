import { resolve } from 'path'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import ScriptSetup from 'unplugin-vue2-script-setup/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    // vite for vue 2
    createVuePlugin({ jsx: true }),
    ScriptSetup(),
    AutoImport({
      imports: [
        '@vue/composition-api',
      ],
    }),
    splitVendorChunkPlugin(),
  ],
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
