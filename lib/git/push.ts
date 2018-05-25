'use strict';

import { commandBase } from '../base';
import { push } from '../../src/git';

commandBase((workingDirectory) => push(workingDirectory));
