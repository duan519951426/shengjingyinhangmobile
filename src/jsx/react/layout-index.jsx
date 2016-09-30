/**
 * 网站首页，热门市场和产品
 * type: text/jsx
 */
((category, config)=>{
    const http = new XMLHttpRequest();
    const href = config.moreClickHref;
    // 热门商品
    const HotGoods = React.createClass({
        goodslist: function(){
            return this.props.hotgoods.goodsdata.map((array, index)=>{
                return (
                    <li key={index}>
                        <a className="hotgoods-list-h4" href={array.href}>{array.title}</a>
                        <b className="hotgoods-list-b">{array.text}</b>
                        <a className="hotgoods-list-img" href={array.href}>
                            <img src={array.image} />
                        </a>
                    </li>
                );
            });
        },
        render: function(){
            return (
                <div className="hotgoods">
                    { /* 标题 */ }
                    <h2 className="hotgoods-title">
                        <img src={this.props.hotgoods.icon} /> { /* 图标 */ }
                        <a href={this.props.hotgoods.href}>{this.props.hotgoods.title}</a> { /* 标题 */ }
                    </h2>
                    { /* 商品列表 */ }
                    <ul className="hotgoods-list clearfix">
                        {this.goodslist()}
                    </ul>
                </div>
            );
        }
    });
    // 商品楼层
    const FloorGoodsList = React.createClass({
        goods: function(){
            return this.props.goodsdata.map((array, index)=>{
                return (
                    <li key={index} className="clearfix">
                        <a className="category-image f-l" href={array.href}>
                            <img src={array.image} />
                        </a>
                        <div className="category-box f-l">
                            <div className="clearfix">
                                <a className="category-title f-l" href={array.href}>{array.title}</a>
                                <span className="category-transactions">成交{array.transactions}笔</span>
                            </div>
                            <p className="category-text">{array.text}</p>
                            <em className="category-price">{array.price}/{array.speed}</em>
                        </div>
                    </li>
                );
            });
        },
        render: function(){
            return (
                <ul className="category-list">
                    {this.goods()}
                </ul>
            );
        }
    });
    const Floor = React.createClass({
        floor: function(){
            return this.props.category.map((array, index)=>{
                return (
                    <section key={index} className="category">
                        <h2 className="category-title">
                            <img src={array.icon} />
                            <a href={array.href}>{array.title}</a>
                            <span>{array.englishtitle}</span>
                        </h2>
                        <FloorGoodsList goodsdata={array.goodsdata} />
                    </section>
                );
            });
        },
        render: function(){
            return (
                <div>{this.floor()}</div>
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
    // 拼节点
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
                        // config.category // 商品数组
                        // config.category.concat(JSON.parse(result)); // 数据合并数组
                        //   or
                        // config.category.push(JSON.parse(result));   // 数据添加到数组
                    */
                    // 重新渲染下列组件
                    self.setState({
                        category: config.category,
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
            // category：楼层的货物
            // clickMoreGoodsText：改变点击加载更多的文字
            // getMoreGoodsClick：点击加载更多事件（防止多次重复点击）
            //*********************************************************
            return ({
                category: config.category,
                clickMoreGoodsText: this.clickMoreGoodsText.default,
                getMoreGoodsClick: this.getMoreGoods
            });
        },
        render: function(){
            return (
                <section>
                    <HotGoods hotgoods={config.hotgoods} />  {/* 热门商品 */}
                    <Floor category={this.state.category} /> {/* 商品楼层 */}
                    <ClickMoreGoods text={this.state.clickMoreGoodsText} onClick={this.state.getMoreGoodsClick} />
                </section>
            );
        }
    });
    // 渲染节点
    ReactDOM.render(<Section />, category);
})(document.getElementById("category"), window._DATACONFIG_);