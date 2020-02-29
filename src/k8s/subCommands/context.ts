import { ConsoleInterface, selectItem, Type } from '../../common';
import { getAvailableContexts, useContext } from '../utils';

export async function contextScript(): Promise<void> {
  const contexts = await getAvailableContexts();
  const contextNames = contexts.map(c => c.name);

  if (contexts.length === 0) {
    ConsoleInterface.printLine(
      `No contexts available, add some contexts to the kubectl config to use this command`,
      Type.warn
    );
    return;
  }

  const index = await selectItem(contextNames, 'Select context to use');
  const selectedContext = contexts[index];

  await useContext(selectedContext.name);
}
