import { getCmdResult } from '../../common';
import { ResourceType } from './ResourceType';

export const getResourceInfo = async (
  type: ResourceType,
  resourceName: string
): Promise<any> => {
  const data = await getCmdResult('kubectl', [
    'get',
    type,
    '-o',
    'json',
    resourceName
  ]);

  return JSON.parse(data);
};
