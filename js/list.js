$(function(){
    var changeAddBtn = $('.gps_store'),
        addPlane = $('.m_gps_hide"),
        addPlaneCloseBtn = $('.m_gps_close');
    changeAddBtn.on('click',function(){
        addPlane.show();
    });
    addPlaneCloseBtn.on('click',function(){
        addPlane.hide();
    })
});

$(document).ready(function(){
	//3.2左侧菜单
	$(".s_menu_dl dt").click(function() {
		$(".s_menu_dl dt").removeClass('list_gray');
		$(".s_menu_dl dt").attr('attribute', 'value');
		if($(this).attr("state")=="open"){
			$(this).siblings("dd").hide();
			$(this).attr("state","close");
		}else{
			$(this).siblings("dd").show();
			$(this).attr("state","open");
			$(this).addClass('list_gray');
		}
	});
	//top按钮效果
 	window.onscroll = function(){
            var article_showHeight = $(window).height();
            var t = document.documentElement.scrollTop || document.body.scrollTop;   
            if( t >= article_showHeight) {
                $(".u-btn-top").show();
            }
            if ( t < article_showHeight) {
                $(".u-btn-top").hide();
            }
         };
	$('.u-btn-top').click(function(){
	        window.scrollTo(0,0);
	    });
	//3.10支付订单关闭
	$('#close_btn').click(function() {
		$(this).parents('.m-modal').hide();
		$('.m-opacity-layer').hide();
	});
});
