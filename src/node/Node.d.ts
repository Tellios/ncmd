declare namespace NcliNode {
    interface PackageJson {
        scripts: Scripts;
    }

    type Scripts = Record<string, string>;
}
