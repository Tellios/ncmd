export const appendNoVerifyIfEnabled = (
  useNoVerify: boolean,
  args: string[]
): string[] => {
  if (useNoVerify) {
    return [...args, '--no-verify'];
  }

  return args;
};
