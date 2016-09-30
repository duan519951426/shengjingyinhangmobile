/**
 * 选项卡构造函数
 */

class Tab{
    tabClick(event){
        // 选项卡点击事件
        const e = event.target;
        const thisindex = e.getAttribute("data-index");
        if(this.index != thisindex){
            // 去掉旧的样式
            this.click[this.index].classList.remove(this.classname);
            this.box[this.index].style.display = "none";
            this.index = thisindex;
            // 添加新的样式
            this.click[this.index].classList.add(this.classname);
            this.box[this.index].style.display = "block";
        }
    }
    init(){
        // 初始化
        const touch = "ontouchstart" in document ? "touchend": "click";
        for(let i = this.click.length - 1; i >= 0; i--){
            this.click[i].setAttribute("data-index", i);
            this.click[i].addEventListener(touch, this.tabClick.bind(this), false);
            if(i === this.index){
                this.click[i].classList.add(this.classname);
                this.box[i].style.display = "block";
            }else{
                this.box[i].style.display = "none";
            }
        }
    }
    constructor(click, box, classname, index = 0){
        // 初始化参数
        this.click = click;          // <array> 点击的选项卡的数组
        this.box = box;              // <array> 点击对应的盒子的数组
        this.classname = classname; // 被点击的选项卡添加的样式
        this.index = index;          // 当前的index
        // 初始化
        this.init();
    }
}
