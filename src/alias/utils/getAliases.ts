import * as jsYaml from 'js-yaml';
import * as fse from 'fs-extra';
import * as path from 'path';
import { getNcliDir } from '../../common';

export const getAliases = (): Promise<Alias.IAlias[]> => {
  const configPath = path.join(getNcliDir(), 'alias.yml');

  return new Promise<Alias.IAlias[]>((resolve, reject) => {
    if (fse.existsSync(configPath)) {
      fse.readFile(configPath, 'utf8').then((config: string) => {
        try {
          const doc: Alias.IAliasesConfig = jsYaml.safeLoad(
            config
          ) as Alias.IAliasesConfig;

          if (!doc) {
            reject(
              'Failed to load yaml config, expected object but got undefined'
            );
            return;
          }

          const invalidAliases = doc.aliases.filter((alias) => {
            return !alias.cmd || !alias.name;
          });

          if (invalidAliases && invalidAliases.length) {
            reject(
              'One or more aliases are missing the required fields "name" and/or "cmd"'
            );
          } else {
            resolve(doc.aliases);
          }
        } catch (e) {
          reject(e);
        }
      });
    } else {
      reject(new Error(`No alias file found at: ${configPath}`));
    }
  });
};
