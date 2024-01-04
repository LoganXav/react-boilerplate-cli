import { addPackageDependency } from "../utils/addPackageDependency.js"

export const axiosInstaller = ({ projectDir }) => {
  addPackageDependency({
    projectDir,
    dependencies: ["axios"],
    devMode: false,
  })
}
