import { envVariablesInstaller } from "./envVars.js"
import { tailwindInstaller } from "./tailwind.js"
import { reactRouterDomInstaller } from "./reactRouterDom.js"
import { axiosInstaller } from "./axios.js"
import { formAndTableInstaller } from "./formAndTable.js"
import { utilitiesInstaller } from "./utilities.js"
import { reduxToolkitInstaller } from "./reduxToolkit.js"
import { muiInstaller } from "./mui.js"
import { notificationsInstaller } from "./notifications.js"
import { iconsInstaller } from "./icons.js"

// Add packages and their installers
export const buildPackageInstaller = (packages) => ({
  styling: {
    inUse: packages.includes("tailwind"),
    installer: tailwindInstaller,
  },
  routing: {
    inUse: packages.includes("react-router-dom"),
    installer: reactRouterDomInstaller,
  },
  http: {
    inUse: packages.includes("axios"),
    installer: axiosInstaller,
  },
  forms: {
    inUse: packages.includes("forms"),
    installer: formAndTableInstaller,
  },
  utilities: {
    inUse: packages.includes("utilities"),
    installer: utilitiesInstaller,
  },
  state: {
    inUse: packages.includes("redux-toolkit"),
    installer: reduxToolkitInstaller,
  },
  components: {
    inUse: packages.includes("mui"),
    installer: muiInstaller,
  },
  notifications: {
    inUse: packages.includes("notifications"),
    installer: notificationsInstaller,
  },
  icons: {
    inUse: packages.includes("icons"),
    installer: iconsInstaller,
  },
  envVariables: {
    inUse: true,
    installer: envVariablesInstaller,
  },
})
