import { ContainerStatus } from './ContainerStatus';

export interface IDockerContainer {
    containerId: string;
    names: string;
    image: string;
    command: string;
    created: string;
    status: string;
    ports: string | null;
    properties: {
        Id: string;
        Created: string;
        Path: string;
        Args: string[];
        State: IDockerContainerState;
    };
}

export interface IDockerContainerState {
    Status: ContainerStatus;
    Running: boolean;
    Paused: boolean;
    Restarting: boolean;
    OOMKilled: boolean;
    Dead: boolean;
    Pid: number;
    ExitCode: number;
    Error: string;
    StartedAt: string;
    FinishedAt: string;
}
