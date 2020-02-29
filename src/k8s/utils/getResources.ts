import { EOL } from 'os';
import { getCmdResult, parseCliTable } from '../../common';
import { ResourceType } from './ResourceType';
import { IResource } from './IResource';

const resourceTypeCommands: Record<ResourceType, string[]> = {
  deployment: ['get', 'deployments'],
  pod: ['get', 'pods'],
  service: ['get', 'services'],
  ingress: ['get', 'ingresses']
};

export const getResources = async <T = IResource>(
  type: ResourceType
): Promise<T[]> => {
  const res = await getCmdResult('kubectl', resourceTypeCommands[type]);
  const rows = res.split(EOL);

  return parseCliTable<T>(rows);
};
