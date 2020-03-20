declare namespace NcliNode {
  interface IPackageJson {
    scripts: Scripts;
    dependencies: Dependencies;
    devDependencies: Dependencies;
  }

  interface IPackage {
    dev: boolean;
    name: string;
    version: string;
    label: string;
  }

  type Scripts = Record<string, string>;
  type Dependencies = Record<string, string>;
}
