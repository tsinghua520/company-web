$(function(){
  
  // 锚点滚动
  $('a[href*=#],area[href*=#]').click(function() {  
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
    url: 'https://www.heng-e.com.cn/platform-admin/hy/index/info/0',
    data: '',
    dataType: 'JSON',
    success: function(res) {
      if (res.code == 0) {
        var ims = res.index
        initSwiper(ims.fileList)
        $('#space').attr('src', ims.spaceImg)
        $('#graphic').attr('src', ims.graphicImg)
        $('#branding').attr('src', ims.brandingImg)
        $('#clientsImg').attr('src', ims.pcBrandImg)
        var mao = location.href.indexOf('#')
        if (mao > -1) {
          var maoUrl = location.href.substring(mao)
          setTimeout(function() {
            location.href = maoUrl
          }, 300)
        }
      }
    },
    error: function() {
        ClosetoastLoading();
        errorTip();
    }
  });

  function initSwiper(fileList) {
    var swiperStr = ''
    for(var i=0; i<fileList.length; i++) {
      swiperStr += '<div class="swiper-slide"><a><img src="' + fileList[i].url + '" /></a></div>'
    }
    $("#swiper").html(swiperStr)
    // 首页轮播图
    var swiper = new Swiper('.banner .swiper-container', {
      pagination: '.banner .swiper-pagination',
      paginationClickable: true,
      nextButton: '.header .swiper-button-next',
      prevButton: '.header .swiper-button-prev',
      autoplay: 5000,
      loop: true
    });
  }

})