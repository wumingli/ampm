//弹出框
$(function() {
    function startCount() {
        var count = 10,
            $this = $(this),
            interval = null,
            mobile = $('[data-mobile]').val();
            if($.trim(mobile) === '' || !/^1[358]\d{9}/.test(mobile)) {
                $('p.error').addClass('show');
                setTimeout(function () {
                    $('p.error').removeClass('show');
                }, 2000);
                return;
            }
        $(this).addClass('a_has_sent');
        interval && clearInterval(interval);
        $(this).off('click');
        interval = setInterval(function() {
            console.log(count)
            $this.html((--count) + '秒后重发');
            if (count === 0) {
                $this.blur();
                $this.removeClass('a_has_sent')
                    .text('发送验证码');
                $this.on('click', startCount);
                clearInterval(interval);
                return;
            }
        }, 1000);
    }
    $('.a_sencode').on('click', startCount);
});