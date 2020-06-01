import { IDockerContainer } from './IDockerContainer';
import { containerStatusColoring } from './containerStatusColoring';

export const getDockerContainersStatusRows = (
  containers: IDockerContainer[]
): string[] => {
  return containers.map((process) => {
    const color = containerStatusColoring(process);

    const row = [
      process.names,
      process.image,
      process.status,
      process.containerId
    ].join(' - ');

    return color(row);
  });
};
