# Docker commands

## ndps
Prints docker containers.

| Argument  | Alias | Description |
| --------- | ----- | ----------- |
| running   | r     | Optional. Only display running containers |
| raw       |       | Optional. No coloring or styles applied to output |

```bash
ndps -r --raw
```

## ndrm
Removes a docker container. Prints a selectable list of all containers.

| Argument  | Alias | Description |
| --------- | ----- | ----------- |
| running   | r     | Optional. Only display running containers |
| force     | f     | Optional. Remove container even if it is running |

```bash
ndrm -f -r my-container-id
```

## ndstart
Starts a stopped docker container.

```bash
ndstart
```

## ndstop
Stops a running docker container.

```bash
ndstop
```