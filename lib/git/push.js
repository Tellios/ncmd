'use strict';

const commandBase = require('../base/commandBase');
const push = require('../../src/git/push');

commandBase(() => 
    push()
);
