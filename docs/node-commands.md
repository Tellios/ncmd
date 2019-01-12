# Node commands

## nr
Executes and manages NPM package.json scripts.

| Argument  | Alias | Description |
| --------- | ----- | ----------- |
| list      | l     | Lists the available NPM scripts |
| add       | a     | Add a new NPM script |
| async     |       | Select multiple NPM scripts to run concurrently |
| edit      | e     | Edit an existing NPM script |
| delete    | d     | Delete an existing NPM script |

Run a package.json script:

```bash
nr [script]
```

Run multiple package.json scripts concurrently:

```bash
nr [script1] [script2]
```

Select a package.json script from a list to run:

```bash
nr
```

Select multiple package.json scripts from a list to run concurrently:

```bash
nr --async
```

## nt
Executes test scripts located in an NPM package.json file. If multiple test tasks matches `nt`s internal filters you will be able
to select the script to use.

| Argument  | Alias | Description |
| --------- | ----- | ----------- |
| watch     | w     | Run test scripts that rely on watchers instead |

Run tests in a package.json file:

```bash
nt
```

Run test scripts that rely on watchers:

```bash
nt -w
```
