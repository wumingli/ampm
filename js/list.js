$(function(){
    var changeAddBtn = $('.gps_store'),
        addPlane = $('.m_gps_hide'),
        addPlaneCloseBtn = $('.m_gps_close'),
        menu = $(".m_menu_list"),
        section = $('section.m_list_wp'),
        promotionBtn = $('#promotion-btn'),
        toTop = $(".u-btn-top");

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
		if(self.attr("state")=="open"){
			dd.hide();
			self.attr("state","close");
		}else{
			dd.show();
            self.attr("state","open");
            /*if(cur.length == 0 || cur[0] != dd.children()[0]) {
                menu.find(".on").removeClass("on");
                dd.children().first().addClass("on").trigger('click');
            }*/
		}
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
        if (cur.parent()[0] != dd[0]) {
            menu.find("dt").removeClass('list_gray');
            dd.siblings("dt").addClass('list_gray');
            section.find("article.cur").removeClass('cur');
            $("#" + target).addClass('cur');
        }
        //异步操作,请求href
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
        menu.find(".on").removeClass('on');
        menu.find("dt").removeClass('list_gray');
        dt.addClass('list_gray');
        section.find("article.cur").removeClass('cur');
        $("#" + target).addClass('cur');
        //异步操作,请求href
    })
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
});

$(document).ready(function(){
});
