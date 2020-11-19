$(function(){
  // 首页轮播图
  var swiper = new Swiper('.banner .swiper-container', {
    pagination: '.header .swiper-pagination',
    paginationClickable: true,
    nextButton: '.header .swiper-button-next',
    prevButton: '.header .swiper-button-prev',
    autoplay: 0,
    loop: true
  });
  // 锚点滚动
  $('a[href*=#],area[href*=#]').click(function() {  
    console.log(this.pathname)  
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {  
        var $target = $(this.hash);  
        $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');  
        if ($target.length) {  
          var targetOffset = $target.offset().top-50;  
          $('html,body').animate({ scrollTop: targetOffset}, 1000);  
          return false;  
        }  
    }  
  });
  //请求数据
  $.ajax({
    type: "get",
    url: 'https://wechat.heng-e.com.cn/platform-admin/hy/index/info/0',
    data: '',
    dataType: 'JSON',
    success: function(res) {
      console.log(res)
    },
    error: function() {
        ClosetoastLoading();
        errorTip();
    }
  });
})