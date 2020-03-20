import {
  yargsWrapper,
  selectItems,
  ConsoleInterface,
  Type,
  commandBase
} from '../common';
import { getProcesses, removeProcess, containerStatusColoring } from './utils';

const args = yargsWrapper()
  .option('running', {
    alias: 'r',
    describe: 'Only display running containers',
    type: 'boolean',
    default: false
  })
  .option('force', {
    alias: 'f',
    describe: 'Remove container even if it is running',
    type: 'boolean',
    default: false
  }).argv;

commandBase(async () => {
  const processes = await getProcesses(args.running);

  if (processes.length === 0) {
    ConsoleInterface.printLine('No containers found', Type.warn);
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
    message: 'Select containers to remove'
  });

  const processesToRemove = selectedIndexes.map(index => processes[index]);

  for (const process of processesToRemove) {
    await removeProcess(args.force, process.containerId);
  }
});
