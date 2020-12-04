var left = 0
// 获取整个img-list width
// 每屏幕需要滑动的 width
var bw = 0
var iw = 0
$(function(){
    
  var id = getQueryVariable('id')
  //请求首页banner数据
  $.ajax({
    type: "get",
    url: 'https://www.heng-e.com.cn/platform-admin/hy/advgroupitem/infoForFront/' + id,
    data: '',
    dataType: 'JSON',
    success: function(res) {
      if (res.code == 0) {
        $('#detailDate').html(res.advgroupitem.pcHeadName.split("\n").join("<br>"))
        $('#pcHeadImg').attr('src',res.advgroupitem.pcHeadImg)
        $('#pcName1').text(res.advgroupitem.pcName1)
        $('#pcName2').text(res.advgroupitem.pcName2)
        $('#pcName3').text(res.advgroupitem.pcName3)
        $('#pcDesc').text(res.advgroupitem.pcDesc)
        initList(res.advgroupitem.fileList)
      }
    },
    error: function() {
    }
  });

  function initList(list){
    var listStr = ''
    for(var i=0;i<list.length;i++) {
      listStr += '<div><img src="'+list[i].url+'" alt=""></div>'
    }
    $('#iw').html(listStr)
    // let的值 要再0 - -iw-bw之间
    $(window).resize(function() {
      history.go(0)
    })
    // 获取img的最大高度 设置图片
    setTimeout(function() {
      bw = $('#bw').width()
      iw = $('#iw').width()
      var max = 0
      var imgs = $("#iw img").each(function(i, v) {
        if (v.height > max) max = v.height
      })
      $("#bw").css({height: max + 'px'})
    }, 500)
  }
  function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] == variable){return pair[1];}
    }
    return(false);
  }
})
function toDetail(id) {
  location.href="./detail.html?id=" + id
}
function changeLeft(flag) {
  if (bw > iw) return;
  left = left + bw * flag
  if (left > 0) left = 0
  if (left < bw - iw) left = bw - iw
  $('#iw').css({left: left + 'px'})
}
