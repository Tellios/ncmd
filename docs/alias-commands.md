# Alias commands (na)
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
  - name: my-command
    cmd: do stuff
    # Aliases also have an optional field to provide some help text which will be displayed when displaying alias help.
    description: This is my description
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

You can display help and all available aliases by running:
```bash
na
```

Or:
```bash
na --print
```

You can also print the command that will be executed without running it:
```bash
na --print dprune --volumes

# Prints
docker system prune --all --volumes
```

## Positional arguments
Commands can also have positional arguments and are defined by a `$` followed by a number. The number indicates the order the arguments will be injected in. Multiple positional arguments can therefore be combined. A positional argument can also be repeated multiple times in the command.

```yaml
aliases:
  - name: my-alias
    cmd: foo $1 --arg --other-arg
```

Positional arguments will be treated as required arguments and must be supplied when invoking the alias:

```bash
# Will create an error
na my-alias

# Will work because we supplied an argument
na my-alias --my-arg
```

Positional arguments can still be combined with ordinary arguments:

```bash
na my-alias --my-positional-arg --my-ordinary-arg
```

## Examples

```yaml
aliases:
  # Run npm wrapped in a docker container using working directory argument
  # Triggerd by running na npm install
  - name: npm
    cmd: docker run --rm -w /opt/workdir -v ${cwd}/:/opt/workdir node:8.9.4-alpine npm
  # Run npm wrapped in a docker container with version as a positional argument
  # Triggerd by running na npm 8.9.4 install
  - name: npm-v
    cmd: docker run --rm -w /opt/workdir -v ${cwd}/:/opt/workdir node:$1-alpine npm
```