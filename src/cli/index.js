import { Command } from "commander"
import {
  CREATE_SIMPLIFY_APP,
  DEFAULT_APP_NAME,
} from "../constants/constants.js"
import * as p from "@clack/prompts"
import chalk from "chalk"
import { getUserPackageManager } from "../utils/getUserPackageManager.js"
import { validateAppName } from "../utils/validateAppName.js"
import { validateImportAlias } from "../utils/validateImportAlias.js"
import { logger } from "../utils/logger.js"
import { IsTTYError } from "../utils/isTTYError.js"

const defaultOptions = {
  appName: DEFAULT_APP_NAME,
  packages: [
    "tailwind",
    "react-router-dom",
    "axios",
    "forms",
    "utilities",
    "redux-toolkit",
    "mui",
    "notifications",
    "icons",
  ],
  flags: {
    default: false,
    noAuth: false,
    noInstall: false,
    tailwind: false,
    importAlias: "@/",
  },
}

export const runCli = async () => {
  const cliResults = defaultOptions

  const program = new Command()
    .name(CREATE_SIMPLIFY_APP)
    .description("A CLI for generating boilerplate code for react")
    .argument(
      "[dir]",
      "The name of the application, as well as the name of the directory to create"
    )
    .option(
      "--noInstall",
      "Explicitly tell the CLI to not run the package manager's install command",
      false
    )
    .option(
      "-y, --default",
      "Bypass the CLI and use all default options to bootstrap a new simplify-app",
      false
    )
    .addHelpText(
      "afterAll",
      `\n The Simplify New App was inspired by ${chalk
        .hex("#E8DCFF")
        .bold(
          "Segun Sogbesan"
        )} and has been used to build awesome react applications like ${chalk
        .hex("#E24A8D")
        .underline("https://steex.vercel.app")} \n`
    )
    .parse(process.argv)

  const cliProvidedName = program.args[0]
  if (cliProvidedName) {
    cliResults.appName = cliProvidedName
  }

  try {
    if (process.env.TERM_PROGRAM?.toLowerCase().includes("mintty")) {
      logger.warn(`  WARNING: It looks like you are using MinTTY, which is non-interactive. This is most likely because you are 
  using Git Bash. If that's that case, please use Git Bash from another terminal, such as Windows Terminal. Alternatively, you 
  can provide the arguments from the CLI directly: https://create.t3.gg/en/installation#experimental-usage to skip the prompts.`)

      throw new IsTTYError("Non-interactive environment")
    }
    const packageManager = getUserPackageManager()

    const project = await p.group(
      {
        ...(!cliProvidedName && {
          name: () =>
            p.text({
              message: "What is the project name?",
              defaultValue: cliProvidedName,
              validate: validateAppName,
            }),
        }),
        ...(!cliResults.flags.noAuth && {
          authentication: () => {
            return p.confirm({
              message: "Do you want the CLI to setup authentication for you?",
              initialValue: !defaultOptions.flags.noAuth,
            })
          },
        }),
        ...(!cliResults.flags.noInstall && {
          install: () => {
            return p.confirm({
              message: `Should the CLI run '${packageManager} ${
                packageManager === "yarn" ? "?" : "install"
              }' for you?`,
              initialValue: !defaultOptions.flags.noInstall,
            })
          },
        }),
        importAlias: () => {
          return p.text({
            message: "What import alias would you like to use?",
            defaultValue: defaultOptions.flags.importAlias,
            placeholder: defaultOptions.flags.importAlias,
            validate: validateImportAlias,
          })
        },
      },
      {
        onCancel() {
          process.exit(1)
        },
      }
    )

    // Add Packages
    const packages = []
    packages.push("tailwind")
    packages.push("react-router-dom")
    packages.push("axios")
    packages.push("forms")
    packages.push("utilities")
    packages.push("redux-toolkit")
    packages.push("mui")
    packages.push("notifications")
    packages.push("icons")

    return {
      appName: project.name ?? cliResults.appName,
      packages,
      flags: {
        ...cliResults.flags,
        noAuth: !project.authentication ?? cliResults.flags.noAuth,
        noInstall: !project.install ?? cliResults.flags.noInstall,
        importAlias: project.importAlias ?? cliResults.flags.importAlias,
      },
    }
  } catch {
    // If the user is not calling create-t3-app from an interactive terminal, inquirer will throw an IsTTYError
    // If this happens, we catch the error, tell the user what has happened, and then continue to run the program with a default t3 app
    if (err instanceof IsTTYError) {
      logger.warn(`
  ${CREATE_SIMPLIFY_APP} needs an interactive terminal to provide options`)

      const shouldContinue = await p.confirm({
        message: `Continue scaffolding a default Simplify app?`,
        initialValue: true,
      })

      if (!shouldContinue) {
        logger.info("Exiting...")
        process.exit(0)
      }

      logger.info(
        `Bootstrapping a default Simplify app in ./${cliResults.appName}`
      )
    } else {
      throw err
    }
  }

  return cliResults
}
