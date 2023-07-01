import {
    resolve,
} from 'path';
import {
    defineConfig,
} from 'vite';

import vue from '@vitejs/plugin-vue';

// const socketAgent = new SocksProxyAgent('socks5://127.0.0.1:1090');

// https://vitejs.dev/config/
export default defineConfig((env) => ({
    plugins: [vue(),],
    base: '/',
    define: {
        ENV: JSON.stringify(env.mode),
    },
    // build: {
    //     outDir: 'lib',
    //     lib: {
    //         entry: resolve(__dirname, 'src', 'replayer', 'index.vue'),
    //         name: 'toolTester',
    //         fileName: 'tool-tester',
    //         formats: ['es'],
    //     },
    //     // rollupOptions: {
    //     //     external: ['react', 'react-dom', 'zrender'],
    //     // },
    // },
    server: {
        port: 3001,
        host: '0.0.0.0',
        proxy: {
            '/pass_through': {
                // target: 'http://10.4.196.61/',
                //   target: "http://10.155.132.35:30080/",
                // target: 'http://10.151.144.22:8881',
                // target: 'http://10.155.132.28/',
                // target: 'http://10.4.196.18/api',
                // target: 'http://10.165.61.97:30081/',
                // agent: socketAgent,
                target: 'http://10.155.132.36:30080',
                changeOrigin: true,
                secure: false,
                // rewrite: (path) => path.replace(/^\/api/, '/v1'),
            },
            '/map': {
                target: 'http://hybridmap.senseauto.com',
                changeOrigin: true,
                secure: false,
            },
            '/osg_resource': {
                // target: 'http://10.165.61.97:30081/',
                // agent: socketAgent,
                target: 'http://10.155.132.36:30080',
                changeOrigin: true,
                secure: false,
            },
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                additionalData: '@root-entry-name: default;',
            },
        },
    },
}));
