import path from "path"
import fs from "fs-extra"
import { PACKAGE_ROOT } from "../constants/constants.js"

// Imports an main.jsx based on the user's authentication choice
export const selectMainFile = ({ projectDir, noAuth }) => {
  const mainFileDir = path.join(PACKAGE_ROOT, "template/extras/src/main")

  let mainFile = !noAuth ? "with-auth.js" : "base.js"

  const mainSrc = path.join(mainFileDir, mainFile)
  const mainDest = path.join(projectDir, "src/main.jsx")

  fs.copySync(mainSrc, mainDest)
}
export const selectAppFile = ({ projectDir, noAuth }) => {
  const appFileDir = path.join(PACKAGE_ROOT, "template/extras/src/app")

  let appFile = !noAuth ? "with-auth.js" : "base.js"

  const appSrc = path.join(appFileDir, appFile)
  const appDest = path.join(projectDir, "src/App.jsx")
  // Imports the AppPublic and AppProtected files if the users does't optout of bootstrapping the auth flow
  if (!noAuth) {
    const appPublicSrc = path.join(appFileDir, "with-auth-public.js")
    const appPublicDest = path.join(projectDir, "src/AppPublic.jsx")
    const appProtectedSrc = path.join(appFileDir, "with-auth-protected.js")
    const appProtectedDest = path.join(projectDir, "src/AppProtected.jsx")

    const appProtectedSideNavigationSrc = path.join(
      appFileDir,
      "with-auth-protected-sidenavigation.js"
    )
    const appProtectedSideNavigationDest = path.join(
      projectDir,
      "src/AppProtectedSideNavigation.jsx"
    )
    const appProtectedSideNavigationItemSrc = path.join(
      appFileDir,
      "with-auth-protected-sidenavigation-item.js"
    )
    const appProtectedSideNavigationItemDest = path.join(
      projectDir,
      "src/AppProtectedSideNavigationItem.jsx"
    )

    fs.copySync(appPublicSrc, appPublicDest)
    fs.copySync(appProtectedSrc, appProtectedDest)
    fs.copySync(appProtectedSideNavigationSrc, appProtectedSideNavigationDest)
    fs.copySync(
      appProtectedSideNavigationItemSrc,
      appProtectedSideNavigationItemDest
    )
  }

  fs.copySync(appSrc, appDest)
}

export const selectPages = ({ projectDir, noAuth }) => {
  const pagesFileDir = path.join(PACKAGE_ROOT, "template/extras/src")

  const pagesSrc = path.join(pagesFileDir, "pages")
  const pagesDest = path.join(projectDir, "src/pages")

  !noAuth && fs.copySync(pagesSrc, pagesDest)
}

export const selectHelpers = ({ projectDir }) => {
  const helpersFileDir = path.join(PACKAGE_ROOT, "template/extras/src/helpers")

  const constantsSrc = path.join(helpersFileDir, "constants")
  const constantsDest = path.join(projectDir, "src/constants")
  const hooksSrc = path.join(helpersFileDir, "hooks")
  const hooksDest = path.join(projectDir, "src/hooks")
  const utilsSrc = path.join(helpersFileDir, "utils")
  const utilsDest = path.join(projectDir, "src/utils")

  fs.copySync(constantsSrc, constantsDest)
  fs.copySync(hooksSrc, hooksDest)
  fs.copySync(utilsSrc, utilsDest)
}

export const selectComponents = ({ projectDir }) => {
  const componentsFileDir = path.join(
    PACKAGE_ROOT,
    "template/extras/src/components"
  )

  const commonSrc = path.join(componentsFileDir, "common")
  const commonDest = path.join(projectDir, "src/common")
  const libsSrc = path.join(componentsFileDir, "libs")
  const libsDest = path.join(projectDir, "src/libs")

  fs.copySync(commonSrc, commonDest)
  fs.copySync(libsSrc, libsDest)
}

export const selectConfigs = ({ projectDir, noAuth }) => {
  const configsFileDir = path.join(PACKAGE_ROOT, "template/extras/src")

  const configsSrc = path.join(configsFileDir, "configs")
  const configsDest = path.join(projectDir, "src/configs")

  !noAuth && fs.copySync(configsSrc, configsDest)
}

export const selectApis = ({ projectDir, noAuth }) => {
  const apisFileDir = path.join(PACKAGE_ROOT, "template/extras/src")

  const apisSrc = path.join(apisFileDir, "apis")
  const apisDest = path.join(projectDir, "src/apis")

  !noAuth && fs.copySync(apisSrc, apisDest)
}
