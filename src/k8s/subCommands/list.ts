import { ConsoleInterface } from '../../common';
import {
  getResources,
  resolveResourceType,
  IResolveResourceTypeParams
} from '../utils';

export interface IListScriptParams {
  type: IResolveResourceTypeParams;
}

export async function listScript(params: IListScriptParams): Promise<void> {
  const type = await resolveResourceType(params.type);
  const resources = await getResources(type);

  if (resources.length === 0) {
    ConsoleInterface.printLine(
      `No ${type} resources available in current context`
    );
    return;
  }

  const columns = Object.keys(resources[0]);
  const rows = resources.map(r => Object.entries(r).map(([_, value]) => value));

  ConsoleInterface.printTable(columns, rows);
}
