

import * as Git from 'nodegit';
import { parseBranch } from '../../../src/git/utils/parseBranch';

describe('parseBranch', () => {
    const getMockReference = (name: string, isHead?: boolean): Git.Reference => {
        return {
            name() {
                return name;
            },

            isHead() {
                return isHead ? 1 : 0;
            }
        } as any;
    };

    it('can determine if branch is local', () => {
        const reference = getMockReference('refs/heads/master');
        const branch = parseBranch(reference);

        expect(branch.name).toBe('master');
        expect(branch.isRemote).toBe(false);
    });

    it('can determine if branch is remote', () => {
        const reference = getMockReference('refs/remotes/origin/master');
        const branch = parseBranch(reference);

        expect(branch.name).toBe('remotes/origin/master');
        expect(branch.isRemote).toBe(true);
    });

    it('can determine if branch is at HEAD', () => {
        const reference = getMockReference('refs/heads/master', true);
        const branch = parseBranch(reference);

        expect(branch.isCurrent).toBe(true);
    });

    it('can determine if branch is not at HEAD', () => {
        const reference = getMockReference('refs/heads/master', false);
        const branch = parseBranch(reference);

        expect(branch.isCurrent).toBe(false);
    });
});
