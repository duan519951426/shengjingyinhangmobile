/**
 * 网站商品列表页
 * type: text/jsx
 */
((goodsListBox, config)=>{
    const http = new XMLHttpRequest();
    const href = config.moreClickHref;
    // 商品列表
    const GoodsList = React.createClass({
        baoyou: function(freeshipping){
            if(freeshipping === true){
                return (<span className="goods-list-baoyou">包邮</span>);
            }
        },
        goodsList: function(){
            return this.props.goodsList.map((array, index)=>{
                return (
                    <li key={index}>
                        <a className="goods-list-image" href={array.href}>
                            <img src={array.image} />
                        </a>
                        <h4 className="goods-list-title">
                            <a href={array.href}>{array.title}</a>
                        </h4>
                        <div className="goods-list-etc clearfix">
                            {this.baoyou(array.freeshipping)} { /* 判断是否包邮 */ }
                            <span className="goods-list-city">{array.city}</span>
                        </div>
                        <div className="goods-list-money">
                            <em>{array.price}</em>
                            <b>{array.transactions}人付款</b>
                        </div>
                    </li>
                );
            });
        },
        render: function(){
            return (
                <ul className="goods-list clearfix">
                    {this.goodsList()}
                </ul>
            );
        }
    });
    // 点击加载更多
    const ClickMoreGoods = React.createClass({
        render: function(){
            return (
                <a className="click-more-goods" onClick={this.props.onClick}>{this.props.text}</a>
            );
        }
    });
    // 节点
    const Section = React.createClass({
        clickMoreGoodsText: {
            default: "点击加载更多",
            ajaxing: "加载中..."
        },
        componentDidMount: function(){
            const self = this;
            // ajax完成事件
            const httpAjax = ()=>{
                if(http.readyState==4 && http.status==200){
                    let result = http.responseText;
                    console.log(result);
                    /*
                     // config.goodslist                             // 商品数组
                     // config.goodslist.concat(JSON.parse(result)); // 数据合并数组
                    */
                    // 重新渲染下列组件
                    self.setState({
                        category: config.goodslist,
                        clickMoreGoodsText: self.clickMoreGoodsText.default,
                        getMoreGoodsClick: self.getMoreGoods
                    });
                }
            };
            http.addEventListener("readystatechange", httpAjax, false);
        },
        ajax: function(){
            // 点击加载更多的ajax事件
            http.open("GET", href, true);
            http.send();
        },
        getMoreGoods: function(event){
            // 点击加载更多事件
            this.setState({
                clickMoreGoodsText: this.clickMoreGoodsText.ajaxing,
                getMoreGoodsClick: null
            });
            setTimeout(this.ajax, 300);
        },
        getInitialState: function(){
            // 需要渲染的组件
            //*********************************************************
            // goodsList：商品列表
            // clickMoreGoodsText：改变点击加载更多的文字
            // getMoreGoodsClick：点击加载更多事件（防止多次重复点击）
            //*********************************************************
            return ({
                goodsList: config.goodslist,
                clickMoreGoodsText: this.clickMoreGoodsText.default,
                getMoreGoodsClick: this.getMoreGoods
            });
        },
        render: function(){
            return (
                <section>
                    <GoodsList goodsList={this.state.goodsList} />
                    <ClickMoreGoods text={this.state.clickMoreGoodsText} onClick={this.state.getMoreGoodsClick} />
                </section>
            );
        }
    });
    ReactDOM.render(<Section />, goodsListBox);
})(document.getElementById("goods-list-box"), window._DATACONFIG_);