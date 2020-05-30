import { getCmdResult } from '../../common';
import { IDockerContainer, parseContainerRows } from '../utils';

export const getContainers = (
  onlyRunning = false
): Promise<IDockerContainer[]> => {
  return getCmdResult('docker', ['ps', onlyRunning ? '' : '-a']).then(
    result => {
      const containers = parseContainerRows(result.split('\n'));

      return Promise.all(
        containers.map(container => {
          return getCmdResult('docker', [
            'inspect',
            container.containerId
          ]).then((containerInfoData: string) => {
            const containerInfo = JSON.parse(containerInfoData)[0];

            return {
              ...container,
              properties: containerInfo
            };
          });
        })
      );
    }
  );
};
