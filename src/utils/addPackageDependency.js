import path from "path"
import fs from "fs-extra"
import sortPackageJson from "sort-package-json"

import { dependencyVersionMap } from "../installers/dependencyVersionMap.js"

export const addPackageDependency = (options) => {
  const { dependencies, devMode, projectDir } = options

  const packageJson = fs.readJSONSync(path.join(projectDir, "package.json"))

  dependencies.forEach((packageName) => {
    const version = dependencyVersionMap[packageName]

    if (devMode && packageJson.devDependencies) {
      packageJson.devDependencies[packageName] = version
    } else if (packageJson.dependencies) {
      packageJson.dependencies[packageName] = version
    }
  })
  const sortedPackageJson = sortPackageJson(packageJson)

  fs.writeJSONSync(path.join(projectDir, "package.json"), sortedPackageJson, {
    spaces: 2,
  })
}
