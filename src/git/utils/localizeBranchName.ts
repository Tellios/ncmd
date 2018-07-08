const remoteText = 'remotes/origin/';

export const localizeBranchName = (branchName: string): string => {
    if (branchName.startsWith(remoteText)) {
        return branchName.substr(remoteText.length);
    }

    return branchName;
};
