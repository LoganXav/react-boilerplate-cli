import { TITLE_TEXT } from "../constants/constants.js"
import { getUserPackageManager } from "./getUserPackageManager.js"

export const logTitle = () => {
  // resolves weird behavior where the ascii is offset
  const packageManager = getUserPackageManager()
  if (packageManager === "yarn" || packageManager === "pnpm") {
    console.log("")
  }
  console.log(TITLE_TEXT)
}
