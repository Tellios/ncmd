import { ConsoleInterface, Type } from '../../common';
import { getResources, selectResource, showResourceLogs } from '../utils';

export interface ILogScriptParams {
  follow: boolean;
}

export async function logCommand(params: ILogScriptParams): Promise<void> {
  const resources = await getResources('pod');

  if (resources.length === 0) {
    ConsoleInterface.printLine(`No pods available`, Type.warn);
    return;
  }

  const resource = await selectResource(resources);
  await showResourceLogs(params.follow, resource.name);
}
