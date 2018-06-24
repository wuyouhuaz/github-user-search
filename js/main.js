;
'use strict';
var e = require('./event');
var tools = require('./tools');

init();
//入口函数
function init() {
    e.addEvents();
    tools.backToTop();
}