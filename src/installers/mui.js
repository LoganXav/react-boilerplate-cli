import { addPackageDependency } from "../utils/addPackageDependency.js"

export const muiInstaller = ({ projectDir }) => {
  addPackageDependency({
    projectDir,
    dependencies: [
      "@mui/lab",
      "@mui/material",
      "@mui/x-date-pickers",
      "@emotion/react",
      "@emotion/styled",
    ],
    devMode: false,
  })
}
