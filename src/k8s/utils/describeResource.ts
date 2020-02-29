import { runCmdInConsole } from '../../common';
import { ResourceType } from './ResourceType';

const resourceTypeCommands: Record<ResourceType, string[]> = {
  deployment: ['describe', 'deployment'],
  pod: ['describe', 'pod'],
  service: ['describe', 'service'],
  ingress: ['describe', 'ingress']
};

export const describeResource = async (
  type: ResourceType,
  resourceName: string
): Promise<void> => {
  await runCmdInConsole('kubectl', [
    ...resourceTypeCommands[type],
    resourceName
  ]);
};
