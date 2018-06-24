;
'use strict';
var historyList = reloadHistoryList() || [];
//把当前搜索词添加到内存
function appendHistory(usedWord) {
    if (!usedWord)
        return;
    findDelete(historyList, usedWord);
    historyList.unshift(usedWord);
    updatehistoryList(historyList);
}
//查询当前的搜索词是否存在
function findDelete(arr, element) {
    let index = arr.indexOf(element);
    if (index == -1) {
        return false;
    } else {
        arr.splice(index, 1);
        return true;
    }
}
//更新历史记录
function updatehistoryList(historyList) {
    setStorageList('key', historyList);
}
//读取内存里的历史记录
function reloadHistoryList() {
    return getStorageList('key') || [];
}

//设置本地历史记录(localStorage长期存储)(sessionStorage临时存储)
function setStorageList(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
}
//获取本地历史纪录(localStorage长期存储)(sessionStorage临时存储)
function getStorageList(key) {
    return JSON.parse(localStorage.getItem(key));
}
module.exports = {
    reloadHistoryList,
    setStorageList,
    getStorageList,
    updatehistoryList,
    findDelete,
    appendHistory,
};