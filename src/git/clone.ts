import { runCmdInConsole } from '../utils/console/runCmdInConsole';

function getDirectoryNameFromUrl(url: string) {
    return url.substr(url.lastIndexOf('/') + 1);
}

export const clone = (
    cloneUrl: string,
    directoryName: string
): Promise<string> => {
    if (!directoryName || directoryName.length === 0) {
        directoryName = getDirectoryNameFromUrl(cloneUrl);
    }

    return runCmdInConsole('git', ['clone', cloneUrl, directoryName]).then(
        () => {
            return directoryName;
        }
    );
};
