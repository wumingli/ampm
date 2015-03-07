/**
 * Created by Yunkou on 15/3/4.
 * e-mail:koopking@gmail.com
 *
 * 依赖zepto
 *
 */

// 1.list页面列表飞入效果。
/* 已经添加进list.js
 * (function ($) {
    $(function () {
        $('.m_menu_list').css('transform', 'translate(0, 0)');
        $('.m_show_wp').css('transform', 'translate(0, 0)');
    });

}(window.Zepto));*/

// 2.list下拉效果。
/* 已经添加进list.js
(function ($) {
    var $menuWarp = $('.s_menu_dl');
    $menuWarp.on('click', 'dt', function () {
        var $thisMenu = $(this).parent();
        $thisMenu.toggleClass('active');
    });
}(window.Zepto));*/

//3.购物车效果

$(function(){
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
        $mask.remove();
        $this.addClass('off');
        $this.data('status', 'off');
    }

    if (status === 'on') {
        shopCarDown();
    } else {
        console.log('adasdasd');
        shopCarUp();
        $mask.one('click',function(){
            shopCarDown();
        });
    }

});
});


