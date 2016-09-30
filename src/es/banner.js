/**
 * 手机轮播图
 * 段昊辰
 */
(()=>{
    let bannerList = document.getElementById("bannerlist"),
        img = bannerList.getElementsByTagName("a"),
        bannerIndex = document.getElementById("bannerindex").getElementsByTagName("li"),
        bannerBox = document.getElementById("bannerbox");//touch事件容器
    let index = 0, // 当前索引
        maxIndex = img.length - 1, //最大索引
        classname = "thisindex";
    let setmain, // 轮播主体定时器
        setframe, // 连续运动定时器
        time = 4000, // 连续间隔时间
        animationIng = 0; // 判断轮播连续运动定时器是否存在
    // 速度和单位
    const [velocit, metric] = [0.65, "rem"];
    // touch事件相关函数
    let start = {};
    start.x = "";
    start.right = "";
    start.time = "";
    let end = {};
    end.x = "";
    const html = document.getElementsByTagName("html");
    // px to rem
    const px2rem = (px)=>{
        return px / parseFloat(html[0].style.fontSize);
    };
    // touchstart
    const bannerStartFun = (event)=>{
        if(animationIng === 0){
            animationIng = 1;
            clearTimeout(setmain);
            let e = event.touches[0];
            start.x = e.pageX;
            start.right = parseFloat(bannerList.style.right);
            start.time = +new Date;
            document.addEventListener("touchmove", bannerMoveFun, false);
            document.addEventListener("touchend", bannerEndFun, false);
        }
    };
    // touchmove
    const bannerMoveFun = (event)=>{
        event.preventDefault();
        let move = ()=>{
            let e = event.touches[0];
            end.x = e.pageX;
            let cha = px2rem(end.x - start.x);
            bannerList.style.right = start.right - cha + metric;
        };
        requestAnimationFrame(move);
    };
    // touchend
    const bannerEndFun = (event)=>{
        end.time = +new Date;
        if(end.time - start.time >= 50){
            let cha = px2rem(end.x - start.x);
            if(Math.abs(cha) >= 2){
                (cha > 0) ? endFunB() : endFunA();
            }else{
                endFunC();
            }
        }else{
            endFunC();
        }
        document.removeEventListener("touchmove", bannerMoveFun);
        document.removeEventListener("touchend", bannerEndFun);
    };
    // touchend判断并执行相应的函数
    // 加加函数
    const endFunA = ()=>{
        bannerIndex[index].classList.remove(classname);
        (index == maxIndex) ? index = 0 : index++;
        bannerIndex[index].classList.add(classname);
        animation(20, function(){
            enlargeCallBack();
            animationIng = 0;
            setmain = setTimeout(main, time);
        });
    };
    // 减减函数
    const endFunB = ()=>{
        bannerIndex[index].classList.remove(classname);
        (index == 0) ? index = maxIndex : index--;
        bannerIndex[index].classList.add(classname);
        animation(0, function(){
            reduceCallBack();
            animationIng = 0;
            setmain = setTimeout(main, time);
        });
    };
    // index不变的函数
    const endFunC = ()=>{
        animation(10, function(){
            animationIng = 0;
            setmain = setTimeout(main, time);
        });
    };
    // index++回调函数
    const enlargeCallBack = ()=>{
        bannerList.appendChild(img[0]);
        bannerList.style.right = `10${metric}`;
    };
    // index--回调函数
    const reduceCallBack = ()=>{
        bannerList.insertBefore(img[maxIndex], img[0]);
        bannerList.style.right = `10${metric}`;
    };
    // 动画函数
    const animation = (target, callback)=>{
        let v = "";
        let start = parseFloat(bannerList.style.right);
        (start < target) ? v = +velocit : v = -velocit;
        let frame = ()=>{
            let right = parseFloat(bannerList.style.right);
            if(Math.abs(target - right) > velocit){
                bannerList.style.right = v + right + metric;
                setframe = requestAnimationFrame(frame);
            }else{
                bannerList.style.right = target + metric;
                callback ? callback() : "";
            }
        };
        setframe = requestAnimationFrame(frame);
    };
    // 轮播主函数
    const main = ()=>{
        animationIng = 1;
        bannerIndex[index].classList.remove(classname);
        (index == maxIndex) ? index = 0 : index++;
        bannerIndex[index].classList.add(classname);
        animation(20, function(){
            enlargeCallBack();
            animationIng = 0;
            setmain = setTimeout(main, time);
        });
    };
    // 初始化
    const init = ()=>{
        bannerList.insertBefore(img[maxIndex], img[0]);
        bannerList.style.right = `10${metric}`;
        bannerIndex[0].classList.add(classname);
        bannerBox.addEventListener("touchstart", bannerStartFun, false);
        setmain = setTimeout(main, time);
    };
    init();
})();