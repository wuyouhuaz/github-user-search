;
'use strict';

function get(url, onSuccess, onFail) {
    sendRequest('get', url, onSuccess, onFail);
}

function post(url, onSuccess, onFail) {
    sendRequest('post', url, onSuccess, onFail);
}

function option(url, onSuccess, onFail) {
    sendRequest('option', url, onSuccess, onFail);
}

function sendRequest(method, url, onSuccess, onFail) {
    var http = new XMLHttpRequest();
    http.open(method, url);
    http.setRequestHeader('Authorization', 'Basic ' + btoa(
        'wuyouhuaz:96eed00bc77e81c8142a993416e042aff56c5c42'));
    http.send();
    http.addEventListener('load', function () {
        onSuccess ? onSuccess(this.responseText) : onFail();
    });
}
module.exports = {
    get,
    post,
    option,
    sendRequest,
};