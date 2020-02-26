import { IDeployment } from './IDeployment';
import { IIngress } from './IIngress';
import { IPod } from './IPod';
import { IService } from './IService';

export type IResource = IDeployment | IIngress | IPod | IService;
