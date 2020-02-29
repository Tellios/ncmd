export function validateScript(script: string): boolean | string {
  if (script.length === 0) {
    return `Script can't be empty`;
  }

  return true;
}
