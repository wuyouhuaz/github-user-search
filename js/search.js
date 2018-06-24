;
'use strict';
var send = require('./ajax'),
    el = require('./element');

function searchUsers(keyword, page, limit, onSuccess, onFail) {
    let url = 'https://api.github.com/search/users?q=' + keyword + '&page=' + page + '&per_page=' + limit;
    send.get(url, onSuccess, onFail);
    el.loading.hidden = false;
    el.listAmount.hidden = true;
}

module.exports = {
    searchUsers
};