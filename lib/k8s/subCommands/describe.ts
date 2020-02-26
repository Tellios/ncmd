import {
    selectResource,
    getResources,
    describeResource,
    resolveResourceType,
    IResolveResourceTypeParams
} from '../../../src/k8s';

export interface IDescribeScriptParams {
    type: IResolveResourceTypeParams;
}

export async function describeScript(
    params: IDescribeScriptParams
): Promise<void> {
    const type = await resolveResourceType(params.type);
    const resources = await getResources(type);
    const resource = await selectResource(resources);
    await describeResource(type, resource.name);
}
