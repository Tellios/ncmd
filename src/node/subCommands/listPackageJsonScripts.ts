import { ConsoleInterface, colorizeCommand } from '../../common';

export function listPackageJsonScripts(
  availableScripts: NcliNode.Scripts
): void {
  const scriptsTable = Object.keys(availableScripts).map((script) => [
    script,
    colorizeCommand(availableScripts[script])
  ]);

  ConsoleInterface.printTable(['Script', 'Command'], scriptsTable);
}
