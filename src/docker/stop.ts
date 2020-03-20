import {
  yargsWrapper,
  selectItems,
  ConsoleInterface,
  Type,
  commandBase
} from '../common';
import { getProcesses, stopProcess, containerStatusColoring } from './utils';

const args = yargsWrapper().argv;

commandBase(async () => {
  let processes = await getProcesses();
  processes = processes.filter(
    process =>
      process.properties.State.Running ||
      process.properties.State.Restarting ||
      process.properties.State.Paused
  );

  if (processes.length === 0) {
    ConsoleInterface.printLine(
      'No containers with the states [Running], [Restarting] or [Paused] found',
      Type.warn
    );
    return;
  }

  const rows = processes.map(process => {
    const color = containerStatusColoring(process);

    const row = [
      process.names,
      process.image,
      process.status,
      process.containerId
    ].join(' - ');

    return color(row);
  });

  const selectedIndexes = await selectItems({
    items: rows,
    message: 'Select container to stop'
  });
  const processesToStop = selectedIndexes.map(index => processes[index]);

  for (const process of processesToStop) {
    await stopProcess(process.containerId);
  }
});
