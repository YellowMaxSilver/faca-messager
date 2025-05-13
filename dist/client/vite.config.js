"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const path_1 = __importDefault(require("path"));
exports.default = (0, vite_1.defineConfig)({
    root: path_1.default.resolve(__dirname),
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
    server: {
        port: 5173,
        proxy: {
            '/api': 'http://localhost:5000',
        },
    },
    resolve: {
        alias: {
            '@': path_1.default.resolve(__dirname, 'src'),
        }
    }
});
