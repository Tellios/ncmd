import { ConsoleInterface } from '../../common';
import { getContainers, containerStatusColoring } from '../utils';

export interface IListCommandParams {
  onlyShowRunning: boolean;
}

export const listCommand = async ({
  onlyShowRunning
}: IListCommandParams): Promise<void> => {
  const processes = await getContainers(onlyShowRunning);

  const rows: string[][] = processes.map((process) => {
    const color = containerStatusColoring(process);

    const row = [
      process.names,
      process.image,
      process.status,
      process.ports || '',
      process.containerId
    ];

    return row.map((text) => color(text) as string);
  });

  ConsoleInterface.printTable(
    ['Name', 'Image', 'Status', 'Ports', 'Container Id'],
    rows
  );
};
