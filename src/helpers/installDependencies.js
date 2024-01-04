import chalk from "chalk"
import { execa } from "execa"
import ora from "ora"
import { getUserPackageManager } from "../utils/getUserPackageManager.js"
import { logger } from "../utils/logger.js"

const execWithSpinner = async (projectDir, pkgManager, options) => {
  const { onDataHandle, args = ["install"], stdout = "pipe" } = options

  const spinner = ora(`Running ${pkgManager} install...`).start()
  const subprocess = execa(pkgManager, args, { cwd: projectDir, stdout })

  await new Promise((res, rej) => {
    if (onDataHandle) {
      subprocess.stdout?.on("data", onDataHandle(spinner))
    }

    void subprocess.on("error", (e) => rej(e))
    void subprocess.on("close", () => res())
  })

  return spinner
}

const runInstallCommand = async (packageManager, projectDir) => {
  switch (packageManager) {
    // When using npm, inherit the stderr stream so that the progress bar is shown
    case "npm":
      await execa(packageManager, ["install", "--legacy-peer-deps"], {
        cwd: projectDir,
        stderr: "inherit",
      })

      return null
    // When using yarn or pnpm, use the stdout stream and or a spinner to show the progress
    case "pnpm":
      return execWithSpinner(projectDir, packageManager, {
        onDataHandle: (spinner) => (data) => {
          const text = data.toString()

          if (text.includes("Progress")) {
            spinner.text = text.includes("|")
              ? text.split(" | ")[1] ?? ""
              : text
          }
        },
      })
    case "yarn":
      return execWithSpinner(projectDir, packageManager, {
        onDataHandle: (spinner) => (data) => {
          spinner.text = data.toString()
        },
      })
    // When using bun, the stdout stream is ignored and the spinner is shown
    case "bun":
      return execWithSpinner(projectDir, packageManager, { stdout: "ignore" })
  }
}

export const installDependencies = async ({ projectDir }) => {
  logger.info("Installing dependencies...")
  const packageManager = getUserPackageManager()

  const installSpinner = await runInstallCommand(packageManager, projectDir)

  // If the spinner was used to show the progress, use succeed method on it
  // If not, use the succeed on a new spinner
  ;(installSpinner ?? ora()).succeed(
    chalk.green("Successfully installed dependencies!\n")
  )
}
