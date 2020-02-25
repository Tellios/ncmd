import { selectItem } from '../../../src/utils';
import { getResources } from '../../../src/k8s';

export interface IDescribeScriptParams {
    pod?: boolean;
    service?: boolean;
}

const selectableTypes: (keyof IDescribeScriptParams)[] = ['pod', 'service'];

export async function describeScript({
    pod,
    service
}: IDescribeScriptParams): Promise<void> {
    if (pod) {
        const resources = await getResources('pod');
        console.log(resources);
    } else if (service) {
        const resources = await getResources('service');
        console.log(resources);
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
