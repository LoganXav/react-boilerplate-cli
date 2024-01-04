import { addPackageDependency } from "../utils/addPackageDependency.js"

export const reduxToolkitInstaller = ({ projectDir }) => {
  addPackageDependency({
    projectDir,
    dependencies: ["@reduxjs/toolkit", "react-redux"],
    devMode: false,
  })
}
