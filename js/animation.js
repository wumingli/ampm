/**
 * Created by Yunkou on 15/3/4.
 * e-mail:koopking@gmail.com
 *
 * 依赖zepto
 * 1.list页面列表飞入效果。
 *
 */

// 1.list页面列表飞入效果。
(function ($) {
    $(function () {
        $('.m_menu_list').css('transform', 'translate(0, 0)');
        $('.m_show_wp').css('transform', 'translate(0, 0)');
    });

}(window.Zepto));

// 2.list下拉效果。
(function ($) {
    var $menuWarp = $('.s_menu_dl');
    $menuWarp.on('click', 'dt', function () {
        var $thisMenu = $(this).parent();
        $thisMenu.toggleClass('active');
    });
}(window.Zepto));