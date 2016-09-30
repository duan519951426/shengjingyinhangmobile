/**
 * 省市三级联动
 */
((cityJson)=>{
    const [provincial, city, counties] =
        [
            document.getElementById("select-city3-provincial"),
            document.getElementById("select-city3-city"),
            document.getElementById("select-city3-counties")
        ];
    const optionDefault = [
        `<option data-index="-1">省份</option>`,
        `<option data-index="-1">地级市</option>`,
        `<option data-index="-1">区、县、县级市</option>`
    ];
    // 节点内插入html
    const cityHtml = (index)=>{
        let txt = "";
        if(index >= 0){
            const c = cityJson[index].city;
            for(let i = c.length - 1; i >= 0; i--){
                txt =  `<option>${c[i].name}</option>${txt}`;
            }
        }
        city.innerHTML = `${optionDefault[1]}${txt}`;
    };
    const countiesHtml = (pIndex, cIndex)=>{
        let txt = "";
        if(cIndex >= 0){
            const c = cityJson[pIndex].city[cIndex].area;
            for(let i = c.length - 1; i >= 0; i--){
                txt =  `<option>${c[i]}</option>${txt}`;
            }
        }
        counties.innerHTML = `${optionDefault[2]}${txt}`;
    };
    // change事件 // provincial.selectedIndex - 1
    function  provincialChange(event){
        cityHtml(provincial.selectedIndex - 1);
        countiesHtml(-1, -1);
    }
    function  cityChange(event){
        countiesHtml(provincial.selectedIndex - 1, city.selectedIndex - 1);
    }
    // 初始化
    const provincialSelectInit = ()=>{
        let txt = "";
        for(let i = cityJson.length - 1; i >= 0; i--){
            txt =  `<option>${cityJson[i].name}</option>${txt}`;
        }
        provincial.innerHTML = `${optionDefault[0]}${txt}`;
    };
    const init = ()=>{
        provincialSelectInit();
        city.innerHTML = optionDefault[1];
        counties.innerHTML = optionDefault[2];
        provincial.addEventListener("change", provincialChange, false);
        city.addEventListener("change", cityChange, false);
    };
    init();
})(window._CITY_);
