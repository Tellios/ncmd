# ncli

## Commands

### Alias commands (na)
Using alias you can have pre-define terminal commands that will be executed using their name. Arguments can also be supplied to the alias.

To create an alias commands you create a `.ncli/alias.yml` file in your user folder.

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
