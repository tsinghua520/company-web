var vm = new Vue({
  el: '#vue_det',
  data: {
    imgs: {},
    url: './image/banner1.png',
    dataList: []
  },
  created() {
    this.getData()
  },
  methods: {
    getData: function() {
      const that = this
      //请求数据
      $.ajax({
        type: "get",
        url: 'https://wechat.heng-e.com.cn/platform-admin/hy/index/info/0',
        data: '',
        dataType: 'JSON',
        success: function(res) {
          if (res.code == 0) {
            that.imgs = res.index
            console.log(that.imgs.brandingDetailImg)
            that.$nextTick(function() {
              var swiper = new Swiper('.banner .swiper-container', {
                pagination: '.header .swiper-pagination',
                paginationClickable: true,
                nextButton: '.header .swiper-button-next',
                prevButton: '.header .swiper-button-prev',
                autoplay: 0,
                loop: true
              });
            })
          }
        },
        error: function() {
       
        }
      });
    },
    details: function() {
        return  this.site + " - 学的不仅是技术，更是梦想！";
    }
  }
})