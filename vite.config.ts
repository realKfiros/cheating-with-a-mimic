import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react({
		jsxImportSource: '@emotion/react',
		babel: {
			plugins: [
				["@babel/plugin-proposal-decorators", {"legacy": true}],
				["@babel/plugin-proposal-class-properties", {"loose": false}]
			],
			assumptions: {
				"setPublicClassFields": false
			}
		}
	})]
});