class WaterFall {
    constructor(options) {
        this.el = options.el;
        this.imgList = options.imgList || []; 
        this.template = options.template || '';
        this.colCount = options.colCount || 3; // 默认每行3个
        this.gap = options.gap || 20;
        this._elUl = document.createElement("ul");
        this._lastImgIndex = 0;
        this._imgKey = options.imgKey || 'img';
        this._colLefts = []; //每列的左边距离
        this._colHeights = []; //每列的高度
        this.events = {};
        
        this.appendStyle();
        this.init()
    }

    appendStyle() {
        //load css
        let styles = document.createElement('style');
        styles.innerHTML = `
            .j-waterfall ul {
                list-style: none;
                padding: 0;
                position: relative;
            }
            .j-waterfall ul li{
                width: position: absolute;
            }
            .j-waterfall ul li img{
                width: 100%;
                display: block;
            }
        `
        document.querySelector("head").appendChild(styles)
    }

    init() {
        const el = document.querySelector(this.el),
            colCount = this.colCount,
            innerWidth = el.offsetWidth - (this.gap * (colCount - 1)),
            itemWidth = innerWidth / colCount;
        let colLefts = [],
            colHeights = [];

        for(let i = 0; i < colCount; i++) {
            colLefts[i] = itemWidth * i + i * this.gap;
            colHeights[i] = 0;
        }

        this._colHeights = colHeights;
        this._colLefts = colLefts;
        this._itemWidth = itemWidth;
        el.classList.add('j-waterfall');
        el.appendChild(this._elUl);
        this.addEvent();

        if(this.imgList.length > 0) {
            this.loadImage()
        }
    }

    addEvent() {
        const height = window.innerHeight;
        let stop = false;
        window.onscroll = (e) => {
            if(document.documentElement.scrollTop + height >= document.body.scrollHeight - 40 && !stop) {
                stop = true;
                const reachBottom = this.events.reachBottom || [];
                reachBottom.forEach(handle => {
                    handle(next.bind(this))
                })
            }
        }

        this._elUl.addEventListener('click', (e) => {
            const el = this._closest(e.target, 'j-waterfall-item')
            if(el) {
                const item = this.imgList[el.getAttribute('data-index')]
                const itemClick = this.events.itemClick || [];
                itemClick.forEach((handle) => {
                    handle(item)
                })
            }
        })

        function next() {
            stop = false;   
        }
    }

    loadImage() {
        const imgList = this.imgList,   
            leng = imgList.length;
        
        if(this._lastImgIndex < leng) {
            //存在未插入的图片
            for(let i = this._lastImgIndex; i < leng; i++) {
                let img = new Image();
                img.onload = e => {
                    this.insertElement.call(this, imgList[i], i)
                }
                if(typeof imgList[i] == 'string') {
                    img.src = imgList[i];
                }
                else{
                    img.src = imgList[i][this._imgKey]
                }
                this._lastImgIndex = i;
            }
        }
    }

    findMinColIndex() {
        const list = this._colHeights;
        return list.indexOf(Math.min.apply(null, list))
    }

    findMaxColIndex() {
        const list = this._colHeights;
        return list.indexOf(Math.max.apply(null, list))
    }

    insertElement(src, index) {
        let li = document.createElement('li');
        li.classList.add("j-waterfall-item");
        li.setAttribute('data-index', index)
        li.style.position = 'absolute'
        const minColIndex = this.findMinColIndex();
        if(this.template != '') {
            li.innerHTML = this.getLiHtml(this.imgList[index])
        }
        else{
            li.innerHTML = `<img src="${src}" width="100%"/>`
        }
        li.style = `position: absolute; width: ${this._itemWidth}px; top: ${this._colHeights[minColIndex]}px; left: ${this._colLefts[minColIndex]}px`;
        this._elUl.appendChild(li)
        this._colHeights[minColIndex] += li.offsetHeight + this.gap;
        document.querySelector(this.el).style.height = this._colHeights[this.findMaxColIndex()] + 'px'
    }

    getLiHtml(data) {
        let re = /{{(.+?)}}/g;
        let match = null;
        let tpl = this.template;
        while((match = re.exec(tpl))!==null) {
            if(match[1]){
                tpl = tpl.replace(match[0], data[match[1]])
            }else{
                tpl = tpl.replace(match[0], '')
            }    
        }
        return tpl;
    }

    push(list) {
        this.imgList = this.imgList.concat(list)
        this.loadImage()
    }

    addEventListener(type, handle) {
        if(!this.events[type]) {
            this.events[type] = [];
        }
        this.events[type].push(handle.bind(this))
    }

    _closest(el, className) {
        if(el === document.body) {
            return undefined
        }
        if(el.classList.contains(className)) {
            return el;
        }
        else{
            return this._closest(el.parentNode, className)
        }

    }
}