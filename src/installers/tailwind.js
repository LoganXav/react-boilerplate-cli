import path from "path"
import fs from "fs-extra"
import { PACKAGE_ROOT } from "../constants/constants.js"
import { addPackageDependency } from "../utils/addPackageDependency.js"

export const tailwindInstaller = ({ projectDir }) => {
  addPackageDependency({
    projectDir,
    dependencies: [
      "tailwindcss",
      "postcss",
      "autoprefixer",
      "prettier",
      "prettier-plugin-tailwindcss",
    ],
    devMode: true,
  })
  const extrasDir = path.join(PACKAGE_ROOT, "template/extras")

  const twCfgSrc = path.join(extrasDir, "config/tailwind.config.js")
  const twCfgDest = path.join(projectDir, "tailwind.config.js")

  const postcssCfgSrc = path.join(extrasDir, "config/postcss.config.js")
  const postcssCfgDest = path.join(projectDir, "postcss.config.js")

  const prettierSrc = path.join(extrasDir, "config/prettier.config.js")
  const prettierDest = path.join(projectDir, "prettier.config.js")

  fs.copySync(twCfgSrc, twCfgDest)
  fs.copySync(postcssCfgSrc, postcssCfgDest)
  fs.copySync(prettierSrc, prettierDest)
}
