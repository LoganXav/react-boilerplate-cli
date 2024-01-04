import path from "path"
import fs from "fs-extra"
import { PACKAGE_ROOT } from "../constants/constants.js"

export const envVariablesInstaller = ({ projectDir }) => {
  const extrasDir = path.join(PACKAGE_ROOT, "template/extras")

  const envSrc = path.join(extrasDir, "src/env/.env")
  const envDest = path.join(projectDir, ".env")

  fs.copySync(envSrc, envDest)
}
