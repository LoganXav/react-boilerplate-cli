import path from "path"
import { getUserPackageManager } from "../utils/getUserPackageManager.js"
import { scaffoldProject } from "./scaffoldProject.js"
import { installPackages } from "./installPackages.js"
import {
  selectApis,
  selectMainFile,
  selectAppFile,
  selectPages,
  selectComponents,
  selectConfigs,
  selectHelpers,
} from "./selectBoilerplate.js"

export const createProject = async ({
  projectName,
  scopedAppName,
  packages,
  noInstall,
  noAuth,
}) => {
  const packageManager = getUserPackageManager()
  const projectDir = path.resolve(process.cwd(), projectName)

  // Bootstraps the base React.js application
  await scaffoldProject({
    projectName,
    projectDir,
    packageManager,
    scopedAppName,
    noInstall,
  })

  // Install the selected packages
  installPackages({
    projectName,
    scopedAppName,
    projectDir,
    packageManager,
    packages,
    noInstall,
  })

  // Import Boilerplate files
  selectMainFile({ projectDir, noAuth })
  selectAppFile({ projectDir, noAuth })
  selectPages({ projectDir, noAuth })
  selectHelpers({ projectDir })
  selectComponents({ projectDir })
  selectConfigs({ projectDir, noAuth })
  selectApis({ projectDir, noAuth })

  //   TODO: import auth files

  return projectDir
}
