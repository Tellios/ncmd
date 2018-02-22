'use strict';

import { commandBase } from '../base/commandBase';
import { push } from '../../src/git/push';

commandBase(() => 
    push()
);
