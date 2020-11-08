import * as jsYaml from 'js-yaml';
import { getCmdResult } from '../../common';
import { IContext } from './IContext';

export const getAvailableContexts = async (): Promise<IContext[]> => {
  const yaml = await getCmdResult('kubectl', ['config', 'view']);
  const config: any = jsYaml.safeLoad(yaml);

  return config.contexts ?? [];
};
