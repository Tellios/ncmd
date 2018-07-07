import { selectItem } from '../utils';

export async function selectScript(
    availableScripts: NcliNode.Scripts
): Promise<string> {
    const scriptNames = Object.keys(availableScripts);
    const selectedIndex = await selectItem(scriptNames, 'Select script');
    return scriptNames[selectedIndex];
}
