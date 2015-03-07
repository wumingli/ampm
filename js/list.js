$(function(){
    var changeAddBtn = $('.gps_store'),
        addPlane = $('.m_gps_hide'),
        addPlaneCloseBtn = $('.m_gps_close'),
        menu = $(".m_menu_list"),
        section = $('section.m_list_wp'),
        promotionBtn = $('#promotion-btn'),
        promotionArea = $('#promotion-list'),
        promotionListTpl = baidu.template('promotionListTpl'),
        taskoutArea = $('#takeout-list'),
        takeoutListTpl = baidu.template('takeoutListTpl'),
        toTop = $(".u-btn-top");

    setTimeout(function(){
        menu.css('transform', 'translate(0, 0)');
        promotionArea.css('transform', 'translate(0, 0)');
    },10);

    changeAddBtn.on('click',function(){
        addPlane.show();
    });

    addPlaneCloseBtn.on('click',function(){
        addPlane.hide();
    });

	menu.on('click', 'dt', function(e) {
        var self = $(this),
            dd = self.siblings("dd"),
            cur = menu.find(".on");
        self.parent().toggleClass('active');
		/*if(self.attr("state")=="open"){
			self.attr("state","close");
		}else{
            self.attr("state","open");
            if(cur.length == 0 || cur[0] != dd.children()[0]) {
                menu.find(".on").removeClass("on");
                dd.children().first().addClass("on").trigger('click');
            }
		}*/
	}).on('click', 'dd a', function(e) {
        var self = $(this),
            href = self.attr("href");
            dd = self.parent(),
            target = dd.attr("data-list");
            cur = menu.find(".on");
        e.stopPropagation();
        e.preventDefault();
        if (cur[0] == this) {
            return;
        }
        //临时部分，之后删除start
        var temp = {
            "./getList?list=1":"../data/3.3-zao.json",
            "./getList?list=2":"../data/3.3-wu.json",
            "./getList?list=3":"../data/3.3-wan.json"
        };
        href = temp[href];
        //临时部分，之后删除end
        $.ajax({
            url:href,
            dataType:"json",
            success:function(data){
                if (data && data.status == 'ok') {
                    taskoutArea.children().first().html(takeoutListTpl(data));
                    menu.find(".on").removeClass("on");
                    self.addClass("on")
                    if (cur.parent()[0] != dd[0]) {
                        menu.find("dt").removeClass('list_gray');
                        dd.siblings("dt").addClass('list_gray');
                        section.find("article.cur").removeClass('cur');
                        $("#" + target).addClass('cur');
                    }
                } else {
                    alert("数据有误，请重试");
                    return false;
                }
            }
        });
    });
    promotionBtn.on('click', function(e) {
        var self = $(this),
            href = self.attr("href");
            dt = self.parent(),
            target = self.attr("data-list");
            cur = menu.find(".on");
        e.preventDefault();
        e.preventDefault();
        if(menu.find("dt.list_gray a")[0] == this){
            return;
        }
        $.ajax({
            url:href,
            dataType:"json",
            success:function(data){
                if (data && data.status == 'ok') {
                    promotionArea.find('.pic_list').html(promotionListTpl(data));
                    menu.find(".on").removeClass('on');
                    menu.find("dt").removeClass('list_gray');
                    dt.addClass('list_gray');
                    section.find("article.cur").removeClass('cur');
                    $("#" + target).addClass('cur');
                } else {
                    alert("数据有误，请重试");
                    return false;
                }
            }
        });
    }).trigger('click');
	//top按钮效果
    $(window).on('scroll',function(e){
        var article_showHeight = window.screen.height,
            t = document.documentElement.scrollTop || document.body.scrollTop;   
        if( t >= article_showHeight) {
            toTop.show();
        }else{
            toTop.hide();
        }
    });
	toTop.click(function(){
        window.scrollTo(0,0);
    });
	//3.10支付订单关闭
	$('#close_btn').click(function() {
		$(this).parents('.m-modal').hide();
		$('.m-opacity-layer').hide();
	}); 
    taskoutArea.on('click', '.u-icon-reduce', function(e){
        e.preventDefault();
        var self = $(this);
        self.siblings('span').html(curSet.rm(self));
    }).on('click', '.u-icon-add', function(e){
        e.preventDefault();
        var self = $(this);
        self.siblings('span').html(curSet.add(self));
    }).on('click', '.u-btn-order-submit', function(e){
        var input = $(this).parent().find('.u-typeNum'),
            num = parseInt(input.val());
        if (!(!!num && num > 0)) {
            num = 1;
            input.val(num);
        }
        shoppingCart.add(curSet.get(num));
    });
    
    var shoppingCart = {
        goods: [],
        num: 0,
        add: function(data){
            var index = this.find(data);
            if(index === false){
                this.goods.push(data);
                //TODO 添加记录
            }else {
                this.goods[index].num = this.goods[index].num + data.num;
                //TODO 更新记录
                this.refresh(index);
            }
        },
        rm: function(index){
            if(index<0||index>=this.goods.length){
                console.warn('未在购物车里找到指定商品');
            } else {
                this.goods.splice(index,1);
                //TODO 删除记录
            }
        },
        plus: function(index){
            if(index===false){
                console.warn('未在购物车里找到指定商品');
            } else {
                this.goods[index].num = this.goods[index].num + 1;
                //TODO 更新记录
                this.refresh(index);
            }
        },
        less: function(index){
            if(index<0||index>=this.goods.length){
                console.warn('未在购物车里找到指定商品');
            } else {
                this.goods[index].num = this.goods[index].num - 1;
                if(this.goods[index].num <= 0){
                    this.rm(index);
                    return;
                }
                //TODO 更新记录
                this.refresh(index);
            }
        },
        refresh: function(index){
            var good = this.goods[index];
            good.totalPrice = (good.unitPrice*good.num).toFixed(2).toString();
        },
        find: function(data){
            var index = false,
                id = data.id.sort().join(',');
            this.goods.forEach(function(v,i){
                if(v.id.sort().join(',') == id){
                    if(data.isSet){
                        if(v.riceNum == data.riceNum)){
                            index = i;
                        }
                    }else{
                        index = i;
                    }
                }
            });
            return index;
        },
        sum: function(){
            var price = 0;
            this.goods.forEach(function(v,i){
                price = price + parseFloat(v.totalPrice,10);
            });
            return price;
        }
    };
    var curSet = {
        set: [],
        rice: {
            'id': '',
            'title': '米饭',
            'remaining': 0,
            'price': 2,
            'num': 1
        },
        num: 0,
        get: function(num){
            var set = this.set,
                id = [],
                title = [],
                price = [],
                sum = 0;
            if(this.num < 2){
                showError('请至少选两个做拼餐，菠菜哥谢谢你。');
                return false;
            }
            $.each(set,function(i,v){
                for (var i = 0,l = v.num; i<l; i++) {
                    id.push(v.id);
                    title.push(v.title);
                    price.push(v.price);
                }
            });
            title.push(this.rice.title + (this.rice.num > 1 ? ('*' + this.rice.num) : ''));
            price.push(this.rice.price * this.rice.num);
            $.each(price,function(i,v){
                sum = sum + parseFloat(v,10);
            });
            return {
                "id":id,
                "title":title,
                "unitPrice":sum.toFixed(2),
                "totalPrice":(sum*num).toFixed(2).toString(),
                "num":num,
                "riceNum":this.rice.num,
                "isSet":true
            };
        },
        find: function(id){
            var index = false;
            this.set.every(function(v,i){
                if(v.id == id){
                    index = i;
                }
                return v.id != id;
            });
            return index;
        },
        add: function(node){
            var dd,
                id,
                price,
                title,
                remaining,
                set = this.set,
                index;
            if (set.length == 0) {
                dd = node.closest('dd');
                id = dd.data('id');
                price = dd.data('price');
                title = dd.data('title');
                remaining = dd.data('remaining');
                set.push({
                    'id': id,
                    'title': title,
                    'remaining': remaining,
                    'price': price,
                    'num': 1
                });
                return this.num = 1;
            } else {
                dd = node.closest('dd');
                id = dd.data('id');
                index = this.find(id);
                if (index === false) {
                    if(this.num < 3){
                        price = dd.data('price');
                        title = dd.data('title');
                        remaining = dd.data('remaining');
                        set.push({
                            'id': id,
                            'title': title,
                            'remaining': remaining,
                            'price': price,
                            'num': 1
                        });
                        this.num = this.num + 1;
                        return 1;
                    }else{
                        showError("最多只能三拼");
                        return 0;
                    }
                } else {
                    if(this.num < 3){
                        set[index].num = set[index].num + 1;
                        this.num = this.num + 1;
                        return set[index].num;
                    }else{
                        showError("最多只能三拼");
                        return set[index].num;
                    }
                }
            }
        },
        rm: function(node){
            var dd,
                id,
                set = this.set,
                index;
            if (set.length == 0) {
                showError("未添加拼餐");
                return 0;
            } else {
                dd = node.closest('dd');
                id = dd.data('id');
                index = this.find(id);
                if (index === false) {
                    return 0;
                } else if(this.num == 1){
                    set = [];
                    this.num = 0;
                    return 0;
                } else if(set[index].num == 1){
                    set.splice(index,1);
                    this.num = this.num - 1;
                    return 0;
                } else {
                    set[index].num = set[index].num - 1;
                    this.num = this.num - 1;
                    return set[index].num;
                }
            }
        }
    }
    var render = {
        
    }

});

/**
 * 购物车弹出效果
 * 当购物车的商品为零的时候不弹出。
 * 目前先加到 data-num 上了，以显示购物车商品数量
 */

$('.m_shopCar').on('click', function () {
    var $this = $(this),
        $container = $('.m-container'),
        num = parseInt($this.data('num')),
        status = $this.data('status');

    if (num === 0) {
        return false;
    }

    var $mask = '<div style="position: fixed; top: 0; left: 0; width:100%; height: 100%; background: rgba(0,0,0,.4); z-index: 990"></div>';
    $mask = $($mask);

    function shopCarUp() {
        $container.addClass('go-back');
        $mask.appendTo('body');
        $this.addClass('on');
        $this.data('status', 'on');
    }

    function shopCarDown() {
        $container.removeClass('go-back');
        console.log($mask);
        $mask.remove();
        $this.addClass('off');
        $this.data('status', 'off');
    }

    if (status === 'on') {
        shopCarDown();
    } else {
        shopCarUp();
        $mask.one('click',function(){
            shopCarDown();
        });
    }

});
