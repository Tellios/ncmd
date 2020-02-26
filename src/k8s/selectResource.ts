import { IResource } from './IResource';
import { selectItem } from '../utils';

export const selectResource = async (
    resources: IResource[]
): Promise<IResource> => {
    const index = await selectItem(resources.map(r => r.name));
    return resources[index];
};
