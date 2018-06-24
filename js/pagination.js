;
'use strict';
const MAXLIST = 1000; //服务器限制list数量

/*获取页面总数*/
function getTatolPage(amount, limit) {
    let totalPage;
    //总人数除以每页的数量(后台服务器限制搜索条目为1000)
    if (amount < MAXLIST) {
        totalPage = Math.ceil(amount / limit);
        document
            .getElementById('amount')
            .innerHTML = `共有${amount}条结果`;
    } else {
        totalPage = Math.ceil(1000 / limit);
        document
            .getElementById('amount')
            .innerHTML = `共有1000条结果`;
    }
    return totalPage;
}

function setPagingBtn(currentPage, totalPage, maxPageBtn) {
    let start, end, middle = Math.ceil(maxPageBtn / 2),
        reachingLeft = currentPage <= middle,
        reachingRight = currentPage >= totalPage - middle;
    if (reachingLeft) {
        start = 1;
        /*设结束为可视按钮最大值*/
        end = maxPageBtn;
    } else if (reachingRight) {
        start = totalPage - maxPageBtn;
        /*设按钮结束为总页数*/
        end = totalPage;
    } else {
        /*设按钮开始为当前页减去可视按钮最大值的一半*/
        start = currentPage - middle + 1;
        /*设按钮结束为当前页加上可视按钮最大值的一半*/
        end = currentPage + middle - 1;
    }
    /*如果出于任何诡异的原因导致开始按钮小于1就将其复位为1*/
    if (start < 1) {
        start = 1;
    }
    /*如果出于任何诡异的原因导致结束按钮大于页面总数就将其复位为总数*/
    if (end > totalPage) {
        end = totalPage;
    }
    return {start, end};
}

module.exports = {
    getTatolPage,
    setPagingBtn,
};