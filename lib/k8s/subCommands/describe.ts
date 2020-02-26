import { selectItem } from '../../../src/utils';
import {
    ResourceType,
    selectResource,
    getResources,
    describeResource
} from '../../../src/k8s';

export interface IDescribeScriptParams {
    deployment?: boolean;
    pod?: boolean;
    service?: boolean;
}

const mapParamToType: Record<keyof IDescribeScriptParams, ResourceType> = {
    deployment: 'deployment',
    pod: 'pod',
    service: 'service'
};

const selectableTypes = Object.keys(mapParamToType);

export async function describeScript(
    params: IDescribeScriptParams
): Promise<void> {
    const type = Object.entries(params)
        .filter(([_, value]) => value === true)
        .map(([key]) => key)[0] as ResourceType | undefined;

    if (type === undefined) {
        const index = await selectItem(
            selectableTypes,
            'Select resource type to describe'
        );

        return await describeScript({ [selectableTypes[index]]: true });
    }

    const resources = await getResources(type);
    const resource = await selectResource(resources);
    await describeResource(type, resource.name);
}
