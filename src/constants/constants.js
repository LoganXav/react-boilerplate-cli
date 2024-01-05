import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const distPath = path.dirname(__filename)
export const PACKAGE_ROOT = path.join(distPath, "../../")

export const TITLE_TEXT = `
____ ___ __  __ ____  _     ___ _______   __
/ ___|_ _|  \/  |  _ \| |   |_ _|  ___\ \ / /
\___ \| || |\/| | |_) | |    | || |_   \ V / 
___) | || |  | |  __/| |___ | ||  _|   | |  
|____/___|_|  |_|_|   |_____|___|_|     |_|  
                                            
`
export const DEFAULT_APP_NAME = "my-app"
export const CREATE_SIMPLIFY_APP = "create-simplify-app"
