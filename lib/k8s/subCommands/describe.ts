import {
    selectResource,
    getResources,
    describeResource,
    resolveResourceType,
    IResolveResourceTypeParams
} from '../../../src/k8s';
import { ConsoleInterface, Type } from '../../../src/utils';

export interface IDescribeScriptParams {
    type: IResolveResourceTypeParams;
}

export async function describeScript(
    params: IDescribeScriptParams
): Promise<void> {
    const type = await resolveResourceType(params.type);
    const resources = await getResources(type);

    if (resources.length === 0) {
        ConsoleInterface.printLine(
            `No resources of type ${type} was found using current context`,
            Type.warn
        );
        return;
    }

    const resource = await selectResource(resources);
    await describeResource(type, resource.name);
}
