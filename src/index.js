#!/usr/bin/env node
import path from "path"
import fs from "fs-extra"
import { logTitle } from "./utils/logTitle.js"
import { getUserPackageManager } from "./utils/getUserPackageManager.js"
import { runCli } from "./cli/index.js"
import { buildPackageInstaller } from "./installers/index.js"
import { parseNameAndPath } from "./utils/parseNameAndPath.js"
import { createProject } from "./helpers/createProject.js"
import { setImportAlias } from "./helpers/setImportAlias.js"
import { installDependencies } from "./helpers/installDependencies.js"
import { logNextSteps } from "./helpers/logNextSteps.js"
import { logger } from "./utils/logger.js"

const main = async () => {
  // const npmVersion = await getNpmVersion();
  const packageManager = getUserPackageManager()
  logTitle()

  const {
    appName,
    packages,
    flags: { importAlias, noInstall, noAuth },
  } = await runCli()

  const usePackages = buildPackageInstaller(packages)

  // e.g. dir/@mono/app returns ["@mono/app", "dir/app"]
  const [scopedAppName, appDir] = parseNameAndPath(appName)

  const projectDir = await createProject({
    projectName: appDir,
    scopedAppName,
    packages: usePackages,
    importAlias,
    noInstall,
    noAuth,
  })

  // Write name to package.json
  const pkgJson = fs.readJSONSync(path.join(projectDir, "package.json"))
  pkgJson.name = scopedAppName
  fs.writeJSONSync(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2,
  })

  // update import alias in any generated files if not using the default
  if (importAlias !== "@/") {
    setImportAlias(projectDir, importAlias)
  }

  // run npm install
  if (!noInstall) {
    await installDependencies({ projectDir })
  }

  await logNextSteps({
    projectName: appDir,
    noInstall,
  })

  process.exit(0)
}

main().catch((err) => {
  logger.error("Aborting installation...")
  if (err instanceof Error) {
    logger.error(err)
  } else {
    logger.error(
      "An unknown error has occurred. Please escalate the message below to your team lead"
    )
    console.log(err)
  }
  process.exit(1)
})
