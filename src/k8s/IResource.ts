import { IDeployment } from './IDeployment';
import { IPod } from './IPod';
import { IService } from './IService';

export type IResource = IDeployment | IPod | IService;
