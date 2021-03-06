$(function(){
  
  // 动态设置首屏
  var ih = window.innerHeight
  $('#mobile').css({'padding-top': ih + 'px'})
  $('#banner').css({'height': ih + 'px'})

  //请求首页banner数据
  $.ajax({
    type: "get",
    url: 'https://www.heng-e.com.cn/platform-admin/hy/index/info/0',
    data: '',
    dataType: 'JSON',
    success: function(res) {
      if (res.code == 0) {
        var ims = res.index
        $('#mobileBanner').attr('src', ims.mobileBanner)
        $('#mobileIndex').attr('src', ims.mobileIndex)
        $('#mobileBrandImg').attr('src', ims.mobileBrandImg)
      }
    },
    error: function() {
    }
  });
  // 请求首页明细轮播数据
  $.ajax({
    type: "get",
    url: 'https://www.heng-e.com.cn/platform-admin/hy/advgroup/queryAllFront',
    data: '',
    dataType: 'JSON',
    success: function(res) {
      if (res.code == 0) {
        initSwiper(res.data.SPACE, 'space')
        initSwiper(res.data.GRAPHIC, 'graphic')
        initSwiper(res.data.BRANDING, 'branding')
      }
    },
    error: function() {
    }
  });
  function initSwiper(dataList, str) {
    var swiperStr = ''
    var fileList = []
    for(var j = 0;j < dataList.length;j++){
      for(var i=0; i<dataList[j].items.length; i++) {
        fileList.push(dataList[j].items[i])
      }
    }
    for(var i=0;i<fileList.length;i ++) {
      var temp = fileList[i]
      swiperStr += '<div class="swiper-slide"><div class="con-detail"><img src="' +temp.mobileImg+ '" /><div class="con-line">'
      for (var j=0;j<fileList.length; j++) {
        if (i==j) {
          swiperStr += '<div class="active"></div>'
        } else {
          swiperStr += '<div></div>'
        }
      }
      swiperStr += '</div><h2>' +temp.mobileName+ '</h2><h3>' +temp.mobileSubName+ '</h3>'
      swiperStr += '<p>' +temp.mobileDesc+ '</p>'
      swiperStr += '</div></div>'
    }
    $("#" + str).html(swiperStr)
    // 首页轮播图
    var swiper = new Swiper('.mobile .swiper-container-' + str, {
      // pagination: '.banner .swiper-pagination',
      paginationClickable: true,
      autoplay: 0,
      loop: true
    });
  }

})