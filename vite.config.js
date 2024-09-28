import { defineConfig } from 'vite';
import packageJson from './package.json';
import { terser } from 'rollup-plugin-terser';

const { entry, output } = packageJson.config.js;

export default defineConfig(({ mode }) => {
  return {
    build: {
      rollupOptions: {
        input: entry,
        output: {
          dir: output,
          entryFileNames: '[name].js',
        },
        treeshake: false,
      },
      sourcemap: mode === 'development',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          unused: false,
        },
        mangle: false,
      },
      esbuild: {
        minifySyntax: true,
        treeShaking: false,
      },
    },
  };
});
