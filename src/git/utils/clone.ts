import { runCmdInConsole } from '../../common';

const GIT_URL_SUFFIX = '.git';

function getDirectoryNameFromUrl(url: string) {
  const directoryName = url.substr(url.lastIndexOf('/') + 1);

  return directoryName.endsWith(GIT_URL_SUFFIX)
    ? directoryName.substring(0, directoryName.length - GIT_URL_SUFFIX.length)
    : directoryName;
}

export const clone = (
  cloneUrl: string,
  directoryName?: string
): Promise<string> => {
  let checkoutDir: string;

  if (!directoryName || directoryName.length === 0) {
    checkoutDir = getDirectoryNameFromUrl(cloneUrl);
  } else {
    checkoutDir = directoryName;
  }

  return runCmdInConsole('git', ['clone', cloneUrl, checkoutDir]).then(() => {
    return checkoutDir;
  });
};
