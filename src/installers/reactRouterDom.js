import { addPackageDependency } from "../utils/addPackageDependency.js"

export const reactRouterDomInstaller = ({ projectDir }) => {
  addPackageDependency({
    projectDir,
    dependencies: ["react-router-dom"],
    devMode: false,
  })
}
