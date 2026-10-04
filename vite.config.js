import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command, mode }) => {
  const isLib = mode === 'lib' || process.env.BUILD_LIB === 'true';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: isLib
      ? {
          lib: {
            entry: path.resolve(__dirname, 'src/index.js'),
            name: 'FluveaUI',
            fileName: (format) => (format === 'es' ? 'fluvea-ui.js' : 'fluvea-ui.umd.cjs'),
          },
          rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
              },
            },
          },
          sourcemap: false,
          emptyOutDir: true,
        }
      : {
          outDir: 'dist-demo',
        },
  };
});
