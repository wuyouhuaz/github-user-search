;
'use strict';
/*选中页面中要用到的元素*/
var userList = document.getElementById('userList'),
    form = document.getElementById('searchForm'),
    input = document.getElementById('searchInput'),
    pagination = document.getElementById('pagination'), //分页
    prePage = document.getElementById('previousPage'), //上一页
    nextPage = document.getElementById('nextPage'), //下一页
    firstPage = document.getElementById('firstPage'), //首页
    lastPage = document.getElementById('lastPage'), //尾页
    tabBar = document.getElementById('tabBar'), //分页栏
    pageNum = document.getElementById('pageNum'), //当前页码，显示为第？页
    historyBox = document.getElementById('historyBox'),
    loading = document.getElementById('loading'),
    pageAmount = document.getElementById('totalPage'),
    totleCurrentPage = document.querySelector('.totleCurrentPage'),
    listAmount = document.getElementById('amount');
//渲染用户列表
function renderUserList(data) {
    var html = '';
    data.forEach(function (user) {
        html = html + `
            <div class="user">
                <a class="avatar" target="_blank" href="${user.html_url}">
                    <img src="${user.avatar_url}">
                </a>
                <div class="info">
                    <div class="username">
                        <i class="fa fa-user-circle"></i> ${user.login}</div>
                    <div class='gitlink'>
                        <a target="_blank" href="${user.html_url}">
                            <i class="fa fa-github"></i> ${user.html_url}</a>
                    </div>
                </div>
            </div>`;
        userList.innerHTML = html;
    });
}
//首页，上一页，下一页，尾页按钮是否有效
function btnDisabled(currentPage, totalPage) {
    if (totalPage == 1) {
        firstPage.disabled = true;
        lastPage.disabled = true;
        prePage.disabled = true;
        nextPage.disabled = true;
    }
    if (totalPage > 1) {
        if (currentPage == 1) {
            firstPage.disabled = true;
            lastPage.disabled = false;
            prePage.disabled = true;
            nextPage.disabled = false;
        } else if (currentPage > 1 && currentPage < totalPage) {
            firstPage.disabled = false;
            lastPage.disabled = false;
            prePage.disabled = false;
            nextPage.disabled = false;
        } else if (currentPage == totalPage) {
            firstPage.disabled = false;
            lastPage.disabled = true;
            prePage.disabled = false;
            nextPage.disabled = true;
        }
    }
}

//清屏（生成的搜索信息）
function clearUserList() {
    userList.innerHTML = '';
}
//清屏（生成的button）
function clearPagination() {
    pagination.innerHTML = '';
}
module.exports = {
    form,
    input,
    pagination,
    firstPage,
    prePage,
    nextPage,
    lastPage,
    tabBar,
    loading,
    pageNum,
    pageAmount,
    listAmount,
    historyBox,
    totleCurrentPage,
    renderUserList,
    clearUserList,
    clearPagination,
    btnDisabled,
};