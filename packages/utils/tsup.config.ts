import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'], // CommonJS aur ES Module dono output
  dts: true, // TypeScript declaration files generate karo
  sourcemap: true, // Source maps banao
  clean: true, // Purana dist folder clean karo har build pe
  minify: false, // Minify nahi karna abhi
  external: ['react', 'react-dom'], // Peer dependencies exclude karo
});
