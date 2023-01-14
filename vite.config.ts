import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import packageJson from './package.json'

const getPackageName = () => {
  return packageJson.name
}

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, (char) => char[1].toUpperCase())
  } catch (err) {
    throw new Error('Name property in package.json is missing')
  }
}

const fileName = {
  /*
  es: `${getPackageName()}.mjs`,
  cjs: `${getPackageName()}.cjs`,
  iife: `${getPackageName()}.iife.js`,
  */
}

export default defineConfig({
  build: {
    // outDir: 'build',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'SmartAppBridge', // getPackageNameCamelCase(),
      formats: ['es', 'umd'],
      fileName: 'smartapp-bridge',
      // fileName: (format) => fileName[format],
    },
    rollupOptions: {
      output: {
        sourcemapExcludeSources: true,
      },
    },
    sourcemap: 'inline',
    target: 'es2017',
    minify: false,
  },
  define: {
    'import.meta.env.LIB_VERSION': JSON.stringify(packageJson.version),
  },
  plugins: [
    dts()
  ],
})
