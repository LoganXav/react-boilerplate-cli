import { addPackageDependency } from "../utils/addPackageDependency.js"

export const iconsInstaller = ({ projectDir }) => {
  addPackageDependency({
    projectDir,
    dependencies: ["react-iconly"],
    devMode: false,
  })
}
