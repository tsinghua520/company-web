$(function(){
  
  var id = getQueryVariable('id')
  //请求首页banner数据
  $.ajax({
    type: "get",
    url: 'https://wechat.heng-e.com.cn/platform-admin/hy/advgroupitem/infoForFront/' + id,
    data: '',
    dataType: 'JSON',
    success: function(res) {
      console.log(res)
    },
    error: function() {
    }
  });
  
  function initList(list){
    console.log(list)
    var listStr = ''
    for(var i=0;i<list.length;i++) {
      listStr += '<div class="date date2 ov"><div class="date-t">'+list[i].name+'</div><div class="date-list oh">'
      for(var j=0;j<list[i].items.length;j++) {
        listStr = listStr + '<div><img onclick="toDetail(\''+list[i].items[j].id+'\')" src="' + list[i].items[j].pcListImg + '" /></div>'
      }
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