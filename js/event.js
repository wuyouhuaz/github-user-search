;
'use strict';
var el = require('./element'),
    search = require('./search'),
    history = require('./history'),
    paging = require('./pagination'),
    maxPageBtn,
    currentPage = 1,
    limit,
    keyword, totalPage;
var historyList = history.reloadHistoryList();
/*监听搜索表单提交事件*/
if (window.screen.width > 720) {
    limit = 30;
    maxPageBtn = 11;
} else if (window.screen.width < 415) {
    limit = 15;
    maxPageBtn = 5;
}

function getValueSubmit() {
    el.form.addEventListener('submit', function (e) {
        e.preventDefault();
        /*获取搜索关键词（获取input元素的值）*/
        keyword = el.input.value;
        if (!keyword) {
            alert('搜索词不能为空');
        } else {
            el.tabBar.hidden = true;
            resetPage();
            el.clearUserList();
            search.searchUsers(keyword, currentPage, limit, onSuccess, onFail);
            el.clearPagination();
            history.appendHistory(keyword);
        }
    });
    el.form.addEventListener('keyup', function (e) {
        e.preventDefault();
        /*获取搜索关键词（获取input元素的值）*/
        keyword = el.input.value;
        if (e.enterKey) {
            if (!keyword) {
                alert('搜索词不能为空');
            } else {
                el.tabBar.hidden = true;
                resetPage();
                el.clearUserList();
                search.searchUsers(keyword, currentPage, limit, onSuccess, onFail);
                el.clearPagination();
                history.appendHistory(keyword);
            }
        }
    });
}
//重置页码为1
function resetPage() {
    currentPage = 1;
}

//返回用户点击的页面显示数据
function backToPage() {
    //返回首页
    el.firstPage.addEventListener('click', function () {
        currentPage = 1;
        search.searchUsers(keyword, currentPage, limit, onSuccess, onFail);
    });
    //返回尾页
    el.lastPage.addEventListener('click', function () {
        currentPage = totalPage;
        search.searchUsers(keyword, currentPage, limit, onSuccess, onFail);
    });
    //点击上一页
    el.prePage.addEventListener('click', function () {
        currentPage = currentPage - 1;
        search.searchUsers(keyword, currentPage, limit, onSuccess, onFail);
    });
    //点击下一页
    el.nextPage.addEventListener('click', function () {
        currentPage = currentPage + 1;
        search.searchUsers(keyword, currentPage, limit, onSuccess, onFail);
    });
}
//生成页码button
function clickPagination() {
    el.clearPagination();
    el.tabBar.hidden = false;
    let startEnd = paging.setPagingBtn(currentPage, totalPage, maxPageBtn);
    el.pageAmount.innerHTML = `共有${totalPage}页`;
    el.pageNum.innerHTML = `第${currentPage}页`;

    /*通过指定开始和结束动态的追加翻页按钮*/
    for (let i = startEnd.start; i <= startEnd.end; i++) {
        var btn = document.createElement('button');
        btn.innerText = i;
        btn.dataset.page = i;
        btn.classList.add('pager');
        if (i == currentPage)
            btn.classList.add('active');
        el.pagination.appendChild(btn);
        btn.addEventListener('click', function (e) {
            currentPage = parseInt(e.currentTarget.dataset.page);
            search.searchUsers(keyword, currentPage, limit, onSuccess, onFail);
        });
    }
}
//历史记录框显示
function onInputClicked() {
    el.input.addEventListener('click', function () {
        el.historyBox.hidden = false;
        historyList = history.reloadHistoryList();
        clickHistoryList();
    });
}
//历史记录框隐藏
function onInputBlur() {
    document
        .documentElement
        .addEventListener('click', function (e) {
            var target = e.target;
            var inSearchInput = target.closest('#searchInput'),
                inhistoryList = target.closest('#historyBox');
            if (inSearchInput || inhistoryList)
                return;
            el.historyBox.hidden = true;
        });
}
//历史记录
function clickHistoryList() {
    el.historyBox.innerHTML = '';
    historyList.forEach(function (item) {
        let elHistory = document.createElement('div');
        elHistory.classList.add('history');
        elHistory.dataset.history = item;
        elHistory.innerHTML =
            `<div class="text">${item}</div>
                        <div class="tool">
                        <span class="delete">删除</span>
                        </div>`;
        el.historyBox.appendChild(elHistory);
        let elDelete = elHistory.querySelector('.delete');
        elHistory.addEventListener('click', function (e) {
            if (e.target == elDelete) {
                return;
            } else {
                keyword = el.input.value = this.dataset.history;
                resetPage();
                search.searchUsers(keyword, currentPage, limit, onSuccess, onFail);
                el.historyBox.hidden = true;
            }
        });
        elDelete.addEventListener('click', function () {
            let temp = this.closest('.history'),
                kwd = temp.dataset.history;
            if (!history.findDelete(historyList, kwd)) {
                return;
            } else {
                history.updatehistoryList(historyList);
                setTimeout(function () {
                    clickHistoryList();
                }, 0);
            }
            if (!historyList.length) {
                el.historyBox.hidden = true;
            } else {
                el.historyBox.hidden = false;
            }
        });
    });
}
//数据返回操作
function onSuccess(data) {
    window.scrollTo(0, 0);
    document.querySelector('.container').style.padding = '0';
    el.totleCurrentPage.hidden = false;
    el.listAmount.hidden = false;
    el.loading.hidden = true;
    let res = JSON.parse(data);
    let amount = res.total_count;
    el.renderUserList(res.items);
    totalPage = paging.getTatolPage(amount, limit);
    el.btnDisabled(currentPage, totalPage);
    clickPagination();
}
//数据未返回
function onFail() {
    el.loading.hidden = true;
    alert('服务器错误访问失败！请稍后再试······');
}
/*批量添加所有初始事件*/
function addEvents() {
    clickHistoryList();
    onInputClicked();
    onInputBlur();
    getValueSubmit();
    backToPage();
}

module.exports = {
    addEvents,
};