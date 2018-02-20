'use strict';

const commandBase = require('../base/commandBase');
const pull = require('../../src/git/pull');

commandBase(() => 
    pull()
);
