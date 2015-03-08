//放公共js使用

$(document).ready(function() {
    //定位到当前位置
    $('.get_position').on('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                alert(position)
            }, function() {
                console.log('error');
            });
        }
    });
    //3.2位置定位 弹出
    $('.gps_store').click(function() {
        $(this).siblings('.m_gps_hide').show();
    });
    //3.2位置定位 关闭
    $('.m_gps_close').click(function() {
        $(this).parent('.m_gps_hide').hide();
    });
    //3.2左侧菜单--------[已经去除::Yun.kou]
    //top按钮效果
    window.onscroll = function() {
        var article_showHeight = $(window).height();
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        if (t >= article_showHeight) {
            $(".u-btn-top").show();
        }
        if (t < article_showHeight) {
            $(".u-btn-top").hide();
        }
    };
    $('.u-btn-top').click(function() {
        window.scrollTo(0, 0);
    });
    //3.10支付订单关闭
    $('#close_btn').click(function() {
        $(this).parents('.m-modal').hide();
        $('.m-opacity-layer').hide();
    });

    //获取地理位置
    $('.get_gps_yes').on('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                alert(position);
            }, function() {
                showError('获取地理位置信息失败');
            });
        } else {
            showError('不支持获取地理位置');
        }
    });
    //关闭获取地理位置
    $('.get_gps_no').on('click', function() {
        location.href = 'src/list.html';
    });
});