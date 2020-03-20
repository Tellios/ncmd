import * as chalk from 'chalk';
import { IPersistedSetting } from '../../common';

export const getPrintableSettings = (
  settings: IPersistedSetting[]
): string[] => {
  return settings.map(({ key, value, workingDirectory }) => {
    const keyToPrint = chalk.cyanBright(key);
    const valueToPrint = chalk.greenBright(value);

    return `${keyToPrint} (${workingDirectory ?? 'Global'}): ${valueToPrint}`;
  });
};
