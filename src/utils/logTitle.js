import gradient from "gradient-string"
import { TITLE_TEXT } from "../constants/constants.js"
import { getUserPackageManager } from "./getUserPackageManager.js"

// colors brought in from vscode poimandres theme
const poimandresTheme = {
  blue: "#add7ff",
  cyan: "#89ddff",
  green: "#5de4c7",
  magenta: "#fae4fc",
  red: "#d0679d",
  yellow: "#fffac2",
}

export const logTitle = () => {
  const textGradient = gradient(Object.values(poimandresTheme))

  // resolves weird behavior where the ascii is offset
  const pkgManager = getUserPackageManager()
  if (pkgManager === "yarn" || pkgManager === "pnpm") {
    console.log("")
  }
  console.log(textGradient.multiline(TITLE_TEXT))
}
