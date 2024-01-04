export const validateImportAlias = (input) => {
  if (input.startsWith(".") || input.startsWith("/")) {
    return "Import alias can't start with '.' or '/'"
  }
  return
}
