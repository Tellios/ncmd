import { selectItem } from '../../common';
import { IResource } from './IResource';

export const selectResource = async (
  resources: IResource[]
): Promise<IResource> => {
  const index = await selectItem(resources.map(r => r.name));
  return resources[index];
};
