import { DEFAULT_APP_NAME } from "../constants/constants.js"
import { getUserPackageManager } from "../utils/getUserPackageManager.js"
import { logger } from "../utils/logger.js"

// This logs the next steps that the user should take in order to advance the project
export const logNextSteps = async ({
  projectName = DEFAULT_APP_NAME,
  noInstall,
}) => {
  const packageManager = getUserPackageManager()

  logger.info("Next steps:")
  projectName !== "." && logger.info(`  cd ${projectName}`)
  if (noInstall) {
    // To reflect yarn's default behavior of installing packages when no additional args provided
    if (packageManager === "yarn") {
      logger.info(`  ${packageManager}`)
    } else {
      logger.info(`  ${packageManager} install`)
    }
  }

  if (["npm", "bun"].includes(packageManager)) {
    logger.info(`  ${packageManager} run dev`)
  } else {
    logger.info(`  ${packageManager} dev`)
  }
}
