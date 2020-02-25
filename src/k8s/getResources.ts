import { ResourceType } from './ResourceType';
import { getCmdResult } from '../utils';

const resourceTypeCommands: Record<ResourceType, string[]> = {
    pod: ['get', 'pods'],
    service: ['get', 'services']
};

export const getResources = async (type: ResourceType) => {
    const res = await getCmdResult('kubectl', resourceTypeCommands[type]);
    console.log(res);
};
