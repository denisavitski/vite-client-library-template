import { UserConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'
import packageJson from './package.json'
import { sharedConfig } from './vite.shared.config'

export function libConfig() {
  const config: UserConfig = {
    plugins: [
      dtsPlugin({
        include: ['./src/components/packages'],
        copyDtsFiles: true,
        exclude: '**/playground/**',
      }),
    ],
    build: {
      copyPublicDir: false,
      emptyOutDir: true,
      outDir: 'lib',
      target: 'es2016',

      // Client
      lib: {
        name: 'library_name',
        entry: {
          index: './src/components/packages/my-package/index.ts',
        },
        formats: ['es', 'cjs'],
        fileName: (format, entryName) =>
          `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
      },

      rollupOptions: {
        external: Object.keys({
          ...packageJson.peerDependencies,
        }),
      },

      // Server

      // "dev:package": "tsx ./src/components/packages/package/playground/index.ts"

      // ssr: false,
      // rollupOptions: {
      //   input: {
      //     index: './src/components/packages/my-package/index.ts',
      //   },
      // },
    },
    ...sharedConfig(),
  }

  return config
}
