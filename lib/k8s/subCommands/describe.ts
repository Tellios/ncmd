import { selectItem, parseCliTable } from '../../../src/utils';
import { getResources } from '../../../src/k8s';

export interface IDescribeScriptParams {
    deployment?: boolean;
    pod?: boolean;
    service?: boolean;
}

const selectableTypes: (keyof IDescribeScriptParams)[] = [
    'deployment',
    'pod',
    'service'
];

interface IDeployment {
    foo: string;
}

interface IPod {
    name: string;
    ready: string;
    status: string;
    restarts: string;
    age: string;
}

interface IService {
    foo: string;
}

export async function describeScript({
    deployment,
    pod,
    service
}: IDescribeScriptParams): Promise<void> {
    if (deployment) {
        const resources = await getResources('deployment');
        const deployments = parseCliTable<IDeployment>(resources);
        console.log(deployments);
    } else if (pod) {
        const resources = await getResources('pod');
        const pods = parseCliTable<IPod>(resources);
        console.log(pods);
    } else if (service) {
        const resources = await getResources('service');
        const services = parseCliTable<IService>(resources);
        console.log(services);
    } else {
        const index = await selectItem(
            selectableTypes,
            'Select resource type to describe'
        );

        if (index >= 0) {
            await describeScript({ [selectableTypes[index]]: true });
        }
    }
}
