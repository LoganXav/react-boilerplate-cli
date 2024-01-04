import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const distPath = path.dirname(__filename)
export const PACKAGE_ROOT = path.join(distPath, "../../")

export const TITLE_TEXT = `Simplify New App!`
export const DEFAULT_APP_NAME = "my-app"
export const CREATE_SIMPLIFY_APP = "create-simplify-app"
