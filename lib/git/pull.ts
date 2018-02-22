'use strict';

import { commandBase } from '../base/commandBase';
import { pull } from '../../src/git/pull';

commandBase(() => 
    pull()
);
