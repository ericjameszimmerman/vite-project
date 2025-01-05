import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src', // Set the root to the src directory
  publicDir: '../public', // Set the public directory relative to root
  build: {
    outDir: '../dist', // Adjust the output directory since the root has changed
    emptyOutDir: true, // Clean the output directory before building
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        newPage: resolve(__dirname, 'src/new-page.html'),
        stacked: resolve(__dirname, 'src/stacked-chart.html'),
      },
    },
  },
});
