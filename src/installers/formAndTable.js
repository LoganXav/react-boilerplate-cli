import { addPackageDependency } from "../utils/addPackageDependency.js"

export const formAndTableInstaller = ({ projectDir }) => {
  addPackageDependency({
    projectDir,
    dependencies: ["formik", "yup", "@tanstack/react-table"],
    devMode: false,
  })
}
