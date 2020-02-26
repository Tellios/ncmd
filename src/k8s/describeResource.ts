import { ResourceType } from './ResourceType';
import { runCmdInConsole } from '../utils';

const resourceTypeCommands: Record<ResourceType, string[]> = {
    deployment: ['describe', 'deployment'],
    pod: ['describe', 'pod'],
    service: ['describe', 'service']
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
