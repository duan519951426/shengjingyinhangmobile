/**
 * 网站帮助页条目显示隐藏
 */
(()=>{
    let ddArray = [];
    // 点击事件
    function titleClick(event){
        const index = this.getAttribute("data-index");
        if(ddArray[index].style.display === "none"){
            ddArray[index].style.display = "block";
        }else{
            ddArray[index].style.display = "none";
        }
    }
    // 初始化
    const init = ()=>{
        const touch = "ontouchstart" in document ? "touchend" : "click";
        const helpbox = document.getElementById("helpbox").getElementsByTagName("dl");
        for(let i = 0, j = helpbox.length, k = 0, dt, dd; i < j; i++){
            dt = helpbox[i].getElementsByTagName("dt");
            dd = helpbox[i].getElementsByTagName("dd");
            if(dd.length > 0){
                dt[0].setAttribute("data-index", k++);
                dt[0].addEventListener(touch, titleClick, false);
                dd[0].style.display = "none";
                ddArray.push(dd[0]);
            }
        }
    };
    init();
})();