/**
 * 商品详情页js
 */

// 一级选项卡
new Tab(
    [
        document.getElementById("jibenxinxi-ck"),
        document.getElementById("shangpinxiangqing-ck")
    ],
    [
        document.getElementById("jibenxinxi-bx"),
        document.getElementById("shangpinxiangqing-bx")
    ],
    "tabIndex",
    0
);

// 二级选项卡
new Tab(
    [
        document.getElementById("information-tuwen-ck"),
        document.getElementById("information-chanpin-ck"),
        document.getElementById("information-baozhuang-ck")
    ],
    [
        document.getElementById("information-tuwen-bx"),
        document.getElementById("information-chanpin-bx"),
        document.getElementById("information-baozhuang-bx")
    ],
    "tabIndex2",
    0
);

// 弹出层
(()=>{
    const dialog = document.getElementById("choiceInf-dialog");
    const openDialog = (event)=>{
        event.preventDefault();
        dialog.style.display = "block";
    };
    const closeDialog = (event)=>{
        event.preventDefault();
        dialog.style.display = "none";
    };
    const init = ()=>{
        const touch = "ontouchstart" in document ? "touchend" : "click";
        document.getElementById("choiceInf-dialog-open").addEventListener(touch, openDialog, false);
        document.getElementById("choiceInf-dialog-close").addEventListener(touch, closeDialog, false);
    };
    init();
})();