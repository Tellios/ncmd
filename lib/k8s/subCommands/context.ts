import { getAvailableContexts, useContext } from '../../../src/k8s';
import { ConsoleInterface, selectItem } from '../../../src/utils';

export async function contextScript(): Promise<void> {
    const contexts = await getAvailableContexts();
    const contextNames = contexts.map(c => c.name);

    const index = await selectItem(contextNames, 'Select context to use');
    const selectedContext = contexts[index];

    await useContext(selectedContext.name);
}
