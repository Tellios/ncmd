# ncli commands

## Alias commands (na)
Using alias you can have pre-define terminal commands that will be executed using their name. Arguments can also be supplied to the alias.

To create alias commands you create a `.ncli/alias.yml` file in your user folder.

```yaml
aliases:
  - name: dprune # Name to use when invoking the command
    cmd: docker system prune --all # the command
    # You can have multiple alias commands
  - name: ls
    cmd: ls -la
  - name: foo
    # Working directory can also be injected into the command
    cmd: bar ${cwd}
```

With the file above you can then invoke aliases like this:
```bash
na dprune
```

Arguments can also be appended to the alias:
```bash
na dprune --volumes
```

This is equal to running:
```bash
docker system prune --all --volumes
```

## Git commands

### nclone
Performs a `git clone`.

| Argument  | Alias | Description |
| --------- | ----- | ----------- |
| url       | u     | Repository url to clone |
| directory | d     | Optional name for the checkout directory |
| code      | c     | Open Visual Studio Code for the repository |

```bash
nclone -u https://git-server/repo.git -d Foo -c
```

### ncommit
Stages all un-staged files, commits the changes, and optionally pushes them to the remote.

| Argument  | Alias | Description |
| --------- | ----- | ----------- |
| message   | m     | Commit message |
| push      | p     | Optional. Push to the remote after commit |

```bash
ncommit -m "I made some changes" -p
```

### ncb
Creates a git branch.

| Argument  | Alias | Description |
| --------- | ----- | ----------- |
| branch    | b     | Branch name |
| push      | p     | Optional. Push the branch to the remote |

```bash
ncb -b feature/my-branch -p
```

### ngcb
Prints the current git branch.

```bash
ngcb
```

### ngb
Prints available git branches.
- Green: current branch
- Blue: local branch
- Cyan: Remote branch

| Argument  | Alias | Description |
| --------- | ----- | ----------- |
| remote    | r     | Optional. Include remote branches |

```bash
ngb -r
```

### nmf
Merge from another branch into this branch using `--no-ff`. Will print a list of all available branches and will allow easy select between them.

| Argument  | Alias | Description |
| --------- | ----- | ----------- |
| branch    | b     | Optional. Name of the branch to merge from |

```bash
nmf -b feature/other-branch
```

### nmt
Merge to another branch from the current branch using `--no-ff`. Will print a list of all available branches and will allow easy select between them.

| Argument  | Alias | Description |
| --------- | ----- | ----------- |
| branch    | b     | Optional. Name of the branch to merge to |

```bash
nmt -b feature/other-branch
```

### nrb
Deletes a branch. Will print a list of all available branches and will allow easy select between them.

| Argument  | Alias | Description |
| --------- | ----- | ----------- |
| branch    | b     | Optional. Specifies the branch to delete |
| push      | p     | Optional. Also delete branch on the remote |

```bash
nrb -b feature/branch-to-delete -p
```

### nstatus
Prints the git status.
- Green: added file
- Yellow: modified file
- Red: deleted file

| Argument  | Alias | Description |
| --------- | ----- | ----------- |
| new       | n     | Optional. Only show new files |
| modified  | m     | Optional. Only show modified files |
| deleted   | d     | Optional. Only show deleted files |

```bash
nstatus
```

### nsb
Checkout/switch branch. Prints all available branches and allows easy selection between them.

| Argument  | Alias | Description |
| --------- | ----- | ----------- |
| branch    | b     | Optional. Name of the branch |
| remote    | r     | Optional. Include remote branches when selecting branches |

```bash
nsb -r

nsb -b feature/other-branch
```

### npull
Performs a `git pull`.

```bash
npull
```

### npush
Performs a `git push`. 

```bash
npush
```

### nupstream
Pushes current branch to the remote. 

```bash
nupstream
```

## Docker commands

### ndps
Prints docker containers.

| Argument  | Alias | Description |
| --------- | ----- | ----------- |
| running   | r     | Optional. Only display running containers |
| raw       |       | Optional. No coloring or styles applied to output |

```bash
ndps -r --raw
```

### ndrm
Removes a docker container. Prints a selectable list of all containers.

| Argument  | Alias | Description |
| --------- | ----- | ----------- |
| running   | r     | Optional. Only display running containers |
| force     | f     | Optional. Remove container even if it is running |

```bash
ndrm -f -r my-container-id
```

### ndstart
Starts a stopped docker container.

```bash
ndstart
```

### ndstop
Stops a running docker container.

```bash
ndstop
```