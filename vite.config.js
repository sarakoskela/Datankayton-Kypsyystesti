import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3000, // Optional: Specify the development server port
    },
    build: {
        outDir: 'dist', // Specify output directory
    },
});
