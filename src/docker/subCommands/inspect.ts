import { selectItem } from '../../common';
import {
  getContainers,
  getDockerContainersStatusRows,
  inspectResource
} from '../utils';

export interface IInspectCommandParams {
  onlyShowRunning: boolean;
}

export const inspectCommand = async ({
  onlyShowRunning
}: IInspectCommandParams): Promise<void> => {
  const containers = await getContainers(onlyShowRunning);
  const rows: string[] = getDockerContainersStatusRows(containers);

  const selectedIndex = await selectItem(rows, 'Select container to inspect');
  const selectedContainer = containers[selectedIndex];

  await inspectResource(selectedContainer.containerId);
};
