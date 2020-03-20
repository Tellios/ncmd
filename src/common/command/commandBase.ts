import * as process from 'process';
import * as path from 'path';
import { ConsoleInterface, Type, CmdError } from '../console';
import {
  getSettings,
  getAggregatedCommandSettings,
  NcliCommand,
  ISettingsFor
} from '../settings';

export interface IExecutorParams<T extends NcliCommand> {
  workingDirectory: string;
  settings: ISettingsFor<T>;
}

export type Executor<T extends NcliCommand> = (
  params: IExecutorParams<T>
) => Promise<void>;

export async function commandBase<T extends NcliCommand = any>(
  executor: Executor<T>
) {
  const workingDirectory = process.cwd();
  const commandExecuted = path.parse(process.argv[1]).name;

  try {
    const settings = await getSettings();
    const commandSettings = await getAggregatedCommandSettings(
      commandExecuted as NcliCommand,
      settings
    );

    await executor({
      workingDirectory,
      settings: commandSettings as ISettingsFor<T>
    });
  } catch (err) {
    if (err instanceof CmdError) {
      ConsoleInterface.printLine(err.processMessage, Type.error);
    } else {
      ConsoleInterface.printLine(err.toString(), Type.error);
    }

    process.exit(1);
  }
}
