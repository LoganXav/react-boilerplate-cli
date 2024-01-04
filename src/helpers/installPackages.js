import chalk from "chalk"
import ora from "ora"
import { logger } from "../utils/logger.js"

// This runs the installer for all the packages that the user has selected
export const installPackages = (options) => {
  const { packages } = options
  logger.info("Adding boilerplate...")

  for (const [name, packageOptions] of Object.entries(packages)) {
    if (packageOptions.inUse) {
      const spinner = ora(`Boilerplating ${name}...`).start()
      packageOptions.installer(options)
      spinner.succeed(
        chalk.green(
          `Successfully setup boilerplate for ${chalk.green.bold(name)}`
        )
      )
    }
  }

  logger.info("")
}
