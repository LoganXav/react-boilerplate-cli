# React-boilerplate-cli

React-boilerplate-cli is a command-line interface (CLI) tool designed to streamline the process of bootstrapping React applications with predefined boilerplate code. The CLI provides an interactive environment, guiding users through various prompts to customize their project, from selecting packages to configuring project structure.

## Tech Stack

The CLI tool for bootstrapping this React boilerplate is built using the following libraries:

- __[Commander.js](https://github.com/tj/commander.js):__ A powerful command-line framework for Node.js that makes it easy to build CLI tools.

- __[@clack/prompts](https://github.com/clack-cli/prompts):__ A user-friendly library for creating interactive command-line prompts.

- __[Execa](https://github.com/sindresorhus/execa):__ A JavaScript library for running local shell commands outside the terminal.

- __[fs-extra](https://github.com/jprichardson/node-fs-extra):__ An extension of the built-in Node.js file system module with additional features and utilities.

- __[Ora](https://github.com/sindresorhus/ora):__ An elegant and colorful terminal spinner to indicate that tasks are in progress.

- __[Chalk](https://github.com/chalk/chalk):__ A library for styling CLI text with color.

- __[gradient-string](https://github.com/bokub/gradient-string):__ A library to produce beautiful color gradients in terminal output.

- __[Sort-package-json](https://github.com/keithamus/sort-package-json):__ A utility to sort the package.json file in a consistent and readable manner.


## Usage

### Installation

Ensure you have Node.js and npm installed on your machine. Then, run the following to scaffold a new react project:

```bash
  npm start [project-directory]
```

After creating the project, navigate to the project directory and run the development server:

```bash
 cd [project-directory]
 npm run dev
```

## Code Structure

### `runCli` Function Overview:

The core functionality of the React-boilerplate-cli is driven by the `runCli` function. This function orchestrates the entire CLI process, guiding users through prompts to customize the React boilerplate generation.

```javascript
const {
  appName,
  packages,
  flags: {
    noInstall,
    noAuth,
  },
} = await runCli()
```

1. **Default Options Setup:** Initializes default options such as the app name, selected packages, and flags.

```javascript
  const cliResults = defaultOptions;
```

2. **Commander.js Configuration:** Configures the `Commander.js` instance, defining commands, options, and providing help text.

```javascript
  import { Command } from "commander"

  export const runCli = async () => {
  const program = new Command()
   .name(CREATE_SIMPLIFY_APP)
   .description("A CLI for generating boilerplate code for react")
   .argument(
      "[dir]",
      "The name of the application, as well as the name of the directory to create"
    )
  // ... other configurations ...
  .parse(process.argv);
  }
```

3. **Interactive Prompts:** Utilizes `@clack/prompts` for interactive prompts to gather user input for the project name, authentication setup, installation preference, and import alias.

```javascript
  import * as p from "@clack/prompts"

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
  // ... other prompts ...
  });
```

4. **Cli Results:** Returns the CLI results, including the selected app name, packages, and configuration flags.

```javascript
  return {
    appName: project.name ?? cliResults.appName,
    packages,
    flags: {
        ...cliResults.flags,
        noAuth: !project.authentication ?? cliResults.flags.noAuth,
        noInstall: !project.install ?? cliResults.flags.noInstall,
        importAlias: project.importAlias ?? cliResults.flags.importAlias,
      },
  };
```
    
## Adding Package Dependencies

The React-boilerplate-cli dynamically adds selected packages to your project by manipulating the `package.json` file during the project creation process. The core logic for this functionality is encapsulated in the `addPackageDependency` method.

### `addPackageDependency` Function Overview:
The function reads the existing `package.json` file from the specified project directory, adds the selected dependencies with their corresponding versions, and then writes the updated `package.json` back to the project directory.
it takes the following parameters:

- `options`: An object containing information about the project and the selected dependencies.
  - `dependencies`: An array of package names to be added to the project.
  - `devMode`: A boolean flag indicating whether the packages should be added as devDependencies.
  - `projectDir`: The directory path where the project is being created.

```javascript
  import path from "path"
  import fs from "fs-extra"
  import sortPackageJson from "sort-package-json"

  import { dependencyVersionMap } from "../installers/dependencyVersionMap.js"

  export const addPackageDependency = (options) => {
    const { dependencies, devMode, projectDir } = options

    // Read existing package.json
    const packageJson = fs.readJSONSync(path.join(projectDir, "package.json"))

    // Add selected dependencies to the appropriate section (dependencies or devDependencies)
    dependencies.forEach((packageName) => {
      const version = dependencyVersionMap[packageName]

      if (devMode && packageJson.devDependencies) {
       packageJson.devDependencies[packageName] = version
      } else if (packageJson.dependencies) {
        packageJson.dependencies[packageName] = version
      }
    })

    // Sort the package.json and write it back to the project directory
    const sortedPackageJson = sortPackageJson(packageJson)
    fs.writeJSONSync(path.join(projectDir, "package.json"), sortedPackageJson, {
      spaces: 2,
    })
  };
```

**Example Dependency Version Map:**

```javascript
  export const dependencyVersionMap = {

    "axios": "^0.21.1",
    "react-redux": "^7.2.5",
    // ... add other dependencies with their corresponding versions
  };
```

    
## Importing Template Files

During the React boilerplate generation, the React-boilerplate-cli imports specific files into the project structure based on user selections. The following functions, such as selectMainFile, selectAppFile, selectPages, and others, utilize the `path` and `fs` modules to copy template files from predefined directories to the project directory.

```javascript
  import path from "path";
  import fs from "fs-extra";

  export const selectApis = ({ projectDir, noAuth }) => {
    const apisFileDir = path.join(PACKAGE_ROOT, "template/extras/src")

    const apisSrc = path.join(apisFileDir, "apis")
    const apisDest = path.join(projectDir, "src/apis")

    !noAuth && fs.copySync(apisSrc, apisDest)
  };
```


### Install Dependencies

The `runInstallCommand` function manages the installation of project dependencies based on the selected package manager. It optionally handles different package managers using the `execa` to run the installation scripts and displays installation progress accordingly.

```javascript
  import chalk from "chalk"
  import { execa } from "execa"
  import ora from "ora"  

  const runInstallCommand = async (packageManager, projectDir) => {
    switch (packageManager) {
      // npm: Show progress bar
      case "npm":
        await execa(packageManager, ["install", "--legacy-peer-deps"], {
          cwd: projectDir,
          stderr: "inherit",
        });
        return null;

      // yarn: Show progress with spinner
      case "yarn":
        return execWithSpinner(projectDir, packageManager, {
          onDataHandle: (spinner) => (data) => {
            spinner.text = data.toString();
          },
        });
      // ... Add more package managers
    }
  };
```

## Final Steps and Usage

After running the React-boilerplate-cli to generate your project, follow these steps to advance and use your newly created project.

### Logging Next Steps

The `logNextSteps` function provides guidance on the next actions you should take:

```javascript
import { DEFAULT_APP_NAME } from "../constants/constants.js"
import { getUserPackageManager } from "../utils/getUserPackageManager.js"
import { logger } from "../utils/logger.js"

export const logNextSteps = async ({ projectName = DEFAULT_APP_NAME, noInstall }) => {
  const packageManager = getUserPackageManager()

  logger.info("Next steps:")
  projectName !== "." && logger.info(`cd ${projectName}`)
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