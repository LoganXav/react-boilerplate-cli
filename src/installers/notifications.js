import { addPackageDependency } from "../utils/addPackageDependency.js"

export const notificationsInstaller = ({ projectDir }) => {
  addPackageDependency({
    projectDir,
    dependencies: ["notistack"],
    devMode: false,
  })
}
