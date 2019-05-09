import AddPageUIUtil from './page_ui'; 

const XcxPage = function(pageObj) {
    /*
    添加一系列生命周期预处理

    let originLoad = pageObj.onLoad;
    pageObj.onLoad = function (options) {
        this.preOnLoadArg = [].slice.call(arguments, 0);
        originLoad && originLoad.apply(this, this.preOnLoadArg)
    }
    */

    //检查页面是否有红包
    const originPageOnShow = pageObj.onShow;
    pageObj.onShow = function (options) {
        typeof originPageOnShow == 'function' && originPageOnShow.call(this, options)
    }

    AddPageUIUtil(pageObj)
    Page(pageObj)
    
    return pageObj
}
export default XcxPage