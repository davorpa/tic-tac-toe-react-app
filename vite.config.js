import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default ({ command, mode }) => {
  const root = process.cwd()
  const folderName = path.basename(root)
  // append folder name to base path if using GitHub/GitLab repo pages
  const usingRepoPages = !process.env.VITE_ROOT_PAGES
  const base = mode === 'production' && usingRepoPages ? `/${folderName}/` : '/'

  console.log('Configuring with...', {
    command,
    mode,
    usingRepoPages,
    root,
    folderName,
    base
  })

  return defineConfig({
    root,
    base,
    mode,
    plugins: [react()],
    build: {
      outDir: 'dist',
      emptyOutDir: true
    }
  })
}
