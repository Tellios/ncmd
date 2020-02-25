import { EOL } from 'os';
import { ResourceType } from './ResourceType';
import { getCmdResult } from '../utils';

const resourceTypeCommands: Record<ResourceType, string[]> = {
    deployment: ['get', 'deployments'],
    pod: ['get', 'pods'],
    service: ['get', 'services']
};

export const getResources = async (type: ResourceType): Promise<string[]> => {
    const res = await getCmdResult('kubectl', resourceTypeCommands[type]);
    return res.split(EOL);
};
