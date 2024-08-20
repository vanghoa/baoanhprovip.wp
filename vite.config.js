import { defineConfig } from 'vite';
import packageJson from './package.json';

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
      minify: mode === 'production',
      esbuild: {
        minifySyntax: true, // Enables syntax minification
        treeShaking: false, // Disables tree shaking (unused code removal)
      },
    },
  };
});
