import { runCmdInConsole } from '../utils/console/runCmdInConsole';

function getDirectoryNameFromUrl(url: string) {
    return url.substr(url.lastIndexOf('/') + 1);
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
