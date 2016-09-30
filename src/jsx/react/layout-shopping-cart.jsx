/**
 * 购物车
 * type: text/jsx
 */
((shoppingCart, config)=>{
    const _TEXT_ = "盛京网上商城";
    /* 取出字符串中的商品价格 */
    const getPrice = (price)=>{
        return price.match(/([0-9]+(\.[0-9]+){0,1}){1}/)[0];
    };
    /* 结算和总价 */
    const Jiesuan = React.createClass({
        // 全选
        allCheckboxChange: function(event){
            this.props.allCheckboxChange(event.target.checked);
        },
        render: function(){
            return (
                <section className="fixed-jiesuanbox clearfix">
                    <div className="jiesuanbox-label">
                        <input className="checkbox va" type="checkbox" onChange={this.allCheckboxChange} checked={this.props.allChecked} />全选
                    </div>
                    <input className="jiesuanbox-btn changeGoodNum-btn-left" type="button" value={`结算(${this.props.totalLength})`} />
                    <p className="jiesuanbox-text changeGoodNum-btn-right">合计：<var>￥{this.props.totalPrice}</var></p>
                </section>
            );
        }
    });
    /* 购物车列表 */
    // **********************
    // _CHECKED_：是否被选中
    // **********************
    // 表格
    const ListTable = React.createClass({
        editor: false,
        style: [
            {display: "none"},
            {display: "block"}
        ],
        // 是否编辑
        editorFun: function(event){
            this.editor = this.editor === false ? true : false;
            this.setState(this.changeStyle());
        },
        changeStyle: function(){
            return ({
                // 控制信息的style
                infStyle: this.editor === false ? this.style[1] : this.style[0],
                // 改变商品数量的style
                changeGoodStyle: this.editor === false ? this.style[0] : this.style[1]
            });
        },
        // 删除一件商品
        delAGood: function(event){
            const e = event.target;
            if(this.props.delAGood(e.getAttribute("data-index")) === true){
                this.editor = false;
                this.setState(this.changeStyle());
            }
        },
        getInitialState: function(){
            return this.changeStyle();
        },
        render: function(){
            return (
                <table className="list-table" key={this.props.index}>
                    <tr>
                        <td className="list-table-td1" colSpan="3">
                            <span>{_TEXT_}</span>
                            <button className="list-table-editor" data-index={this.props.index} onClick={this.editorFun}>编辑</button>
                            <button className="list-table-editor" data-index={this.props.index} onClick={this.delAGood}>删除</button>
                        </td>
                    </tr>
                    <tr className="list-table-td2">
                        <td className="list-table-lableTd">{ /* input */ }
                            <input className="checkbox" type="checkbox" data-index={this.props.index} onChange={this.props.checkboxChange} checked={this.props.array["_CHECKED_"]} />
                        </td>
                        <td className="list-table-imgTd">{ /* 图片 */ }
                            <a href={this.props.array.href}>
                                <img src={this.props.array.image} />
                            </a>
                        </td>
                        <td className="list-table-infTd">{ /* 相关信息 */ }
                            <section style={this.state.infStyle}>
                                <a className="list-table-title" href={this.props.array.href}>{this.props.array.title}</a>
                                <p className="list-table-text">{this.props.array.text}</p>
                                <p className="list-table-etc">
                                    <em>{this.props.array.price}</em>
                                    <b>×{this.props.array.num}</b>
                                </p>
                            </section>
                            <div className="changeGoodNum" style={this.state.changeGoodStyle}>{ /* 改变商品数量 */ }
                                <button className="changeGoodNum-btn changeGoodNum-btn-left" type="button" data-index={this.props.index} onClick={this.props.goodSub}>-</button>
                                <p className="changeGoodNum-text">{this.props.array.num}</p>
                                <button className="changeGoodNum-btn changeGoodNum-btn-right" type="button" data-index={this.props.index} onClick={this.props.goodAdd}>+</button>
                            </div>
                        </td>
                    </tr>
                </table>
            );
        }
    });
    // 商品
    const List = React.createClass({
        // checkbox的change事件
        checkboxChange: function(event){
            const e = event.target;
            this.props.checkboxChange(e.getAttribute("data-index"), e.checked);
        },
        // 商品数量 +
        goodAdd: function(event){
            const e = event.target;
            const index = e.getAttribute("data-index");
            config["shopping-cart-data"][index].num++;
            this.props.changeGoodNum();
        },
        // 商品数量 -
        goodSub: function(event){
            const e = event.target;
            const index = e.getAttribute("data-index");
            if(config["shopping-cart-data"][index].num <= 1){
                alert("商品数量不能再少了。");
            }else{
                config["shopping-cart-data"][index].num--;
                this.props.changeGoodNum();
            }
        },
        list: function(){
            return this.props.shoppingCartList.map((array, index)=>{
                return (
                    <ListTable
                        array={array}
                        index={index}
                        delAGood={this.props.delAGood}            // 【事件】删除商品
                        checkboxChange={this.checkboxChange}      // 【事件】checkbox的change事件
                        goodAdd={this.goodAdd}                    // 商品 +
                        goodSub={this.goodSub}                    // 商品 -
                    />
                );
            });
        },
        render: function(){
            return (
                <div>{this.list()}</div>
            );
        }
    });
    /* 总结点 */
    const Section = React.createClass({
        /* 判断事件 */
        // 计算选中商品的总价格
        calculateTotalPrice: function(){
            let price = 0;
            config["shopping-cart-data"].map((array, index)=>{
                if(array["_CHECKED_"] === true){
                    price += getPrice(array.price) * array.num;
                }
            });
            return price.toFixed(2);
        },
        // 计算选中商品的总数量
        calculateTotalLength: function(){
            let length = 0;
            config["shopping-cart-data"].map((array, index)=>{
                if(array["_CHECKED_"] === true){
                    length++;
                }
            });
            return length;
        },
        // 判断是否全选
        allChecked: function(){
            let t = false;
            for(let i = config["shopping-cart-data"].length - 1; i >= 0; i--){
                if(config["shopping-cart-data"][i]["_CHECKED_"] !== true){
                    t = true;
                    break;
                }
            }
            return t === true ? false : true;
        },
        /* 交互事件 */
        // 删除一件商品
        delAGood: function(index){
            if(confirm("你确定要删除这件商品吗？")){
                config["shopping-cart-data"].splice(index, 1);
                this.setState({
                    shoppingCartList: config["shopping-cart-data"],
                    totalPrice: this.calculateTotalPrice(),
                    totalLength: this.calculateTotalLength(),
                    allChecked: this.allChecked()
                });
                return true;
            }else{
                return false;
            }
        },
        // checkbox的change事件
        checkboxChange: function(index, checked){
            config["shopping-cart-data"][index]["_CHECKED_"] = checked;
            this.setState({
                totalPrice: this.calculateTotalPrice(),
                totalLength: this.calculateTotalLength(),
                allChecked: this.allChecked()
            });
        },
        // 全选
        allCheckboxChange: function(checked){
            config["shopping-cart-data"].map((array, index)=>{
                array["_CHECKED_"] = checked;
            });
            this.setState({
                shoppingCartList: config["shopping-cart-data"],
                totalPrice: this.calculateTotalPrice(),
                totalLength: this.calculateTotalLength(),
                allChecked: this.allChecked()
            });
        },
        // 商品加减
        changeGoodNum: function(index){
            this.setState({
                shoppingCartList: config["shopping-cart-data"],
                totalPrice: this.calculateTotalPrice()
            });
        },
        getInitialState: function(){
            // 需要渲染的组件
            //*****************************
            // shoppingCartList：商品列表
            // totalPrice：商品总价
            // totalLength：已选商品数量
            // allChecked：全选
            //*****************************
            return ({
                shoppingCartList: config["shopping-cart-data"],
                totalPrice: this.calculateTotalPrice(),
                totalLength: this.calculateTotalLength(),
                allChecked: this.allChecked()
            });
        },
        render: function(){
            return (
                <section>
                    <List
                        shoppingCartList={this.state.shoppingCartList}    // 商品列表
                        checkboxChange={this.checkboxChange}              // 【事件】单选商品change
                        delAGood={this.delAGood}                          // 删除货物
                        changeGoodNum={this.changeGoodNum}                // 改变商品数量
                    />
                    <div className="jiesuan-box">
                        <Jiesuan
                            totalPrice={this.state.totalPrice}         // 结算商品的总价
                            totalLength={this.state.totalLength}       // 结算商品的总数量
                            allChecked={this.state.allChecked}         // 是否全选
                            allCheckboxChange={this.allCheckboxChange} // 【事件】全选商品change
                        />
                    </div>
                </section>
            );
        }
    });
    // 渲染
    ReactDOM.render(<Section />, shoppingCart);
})(document.getElementById("shopping-cart"), window._DATACONFIG_); // window._DATACONFIG_["shopping-cart-data"]