import { addPackageDependency } from "../utils/addPackageDependency.js"

export const utilitiesInstaller = ({ projectDir }) => {
  addPackageDependency({
    projectDir,
    dependencies: [
      "clsx",
      "crypto-js",
      "currency.js",
      "date-fns",
      "react-number-format",
      "vite-plugin-svgr",
    ],
    devMode: false,
  })
}
