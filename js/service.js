$(function(){
  
  var type = getQueryVariable('type')
  //请求首页banner数据
  $.ajax({
    type: "get",
    url: 'https://www.heng-e.com.cn/platform-admin/hy/index/info/0',
    data: '',
    dataType: 'JSON',
    success: function(res) {
      if (res.code == 0) {
        var ims = res.index
        var bannerUrl = ''
        if (type==2) {
          bannerUrl = ims.graphicDetailImg
        } else if (type == 3) {
          bannerUrl = ims.brandingDetailImg
        } else {
          bannerUrl = ims.spaceDetailImg
        }
        $('#bannerUrl').attr('src', bannerUrl)
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
        if (type==2) {
          initList(res.data.GRAPHIC)
        } else if (type == 3) {
          initList(res.data.BRANDING)
        } else {
          initList(res.data.SPACE)
        }
      }
    },
    error: function() {
    }
  });
  function initList(list){
    var listStr = ''
    for(var i=0;i<list.length;i++) {
      listStr += '<div class="date date2 ov"><div class="date-t">'+list[i].name+'</div><div class="date-list oh">'
      var temp = parseInt(list[i].items.length / 3)
      if (list[i].items.length % 3 > 0) {
        temp++
      }
      for(var j=0; j<temp; j++) {
        var tempStr = ''
        for (var z=3;z>0;z--){
          if (j*3 + z  <=list[i].items.length){
            var idx = j*3 + z - 1
            tempStr += '<div><img onclick="toDetail(\''+list[i].items[idx].id+'\')" src="' + list[i].items[idx].pcListImg + '" /></div>'
          }
        }
        listStr += tempStr
      }
      // for(var j=0;j<list[i].items.length;j++) {
      //   listStr = listStr + '<div><img onclick="toDetail(\''+list[i].items[j].id+'\')" src="' + list[i].items[j].pcListImg + '" /></div>'
      // }
      listStr += '</div></div>'
    }
    $('#dataList').html(listStr)
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