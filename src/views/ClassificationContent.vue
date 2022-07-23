<template>
  <div class="classificationContent">
    <meta name="referrer" content="no-referrer" />
    <van-nav-bar
      :title="text"
      left-arrow
      @click-left="onClickLeft"
      fixed
      placeholder
    />
    <div class="Content">
      <div
        class="Content-one"
        v-for="(items, index) in Contentsuju"
        :key="index"
        @click="xiangqing(items.id)"
      >
        <div class="Content-img">
          <img :src="items.share_info.image" alt="" />
        </div>
        <div class="Content-text">
          <div class="Content-text-one">
            {{ items.share_info.title }}
          </div>
          <div class="Content-text-two">
            播放量 {{ items.count.count_view }}&nbsp;&nbsp;喜欢
            {{ items.count.count_like }}
          </div>
          <div class="Content-text-three">
            <div class="Content-text-three-img">
              <img :src="items.author.userinfo.avatar" alt="" />
            </div>
            <div class="Content-text-three-text">
              {{ items.author.userinfo.username }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 加载 -->

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <hr class="clear" />
    </van-list>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "ClassificationContent",
  data() {
    return {
      value: "",
      id: "",
      text: "作品",
      shu: 1,
      loading: false,
      finished: false,
      Contentsuju: [],
      ContentsujuOne: [],
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.ClassificationContentOne(this.id);
  },
  methods: {
    xiangqing(id){
      this.$router.push({ name: "Video", params: { id } });
    },
    onLoad() {
      this.shu++;
      this.axios({
        //请求类型
        method: "get",
        //请求路径
        url: 
          "https://apis.netstart.cn/xpc/articles?category_id=" +
          this.id +
          "&page=" +
          this.shu,
      })
        .then((result) => {
          
          if (result.data.code === "_200") {
            this.ContentsujuOne = result.data.data.list;
            
            
          for (let i = 0; i < this.ContentsujuOne.length; i++) {
            // console.log(i + "==>", this.ContentsujuOne[i]);
            this.Contentsuju.push(this.ContentsujuOne[i]);
          }
            
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成
            let sss = this.Contentsuju.length + 1
            if ( sss < 10 ) {
              this.finished = true;
            }
          }
        })
        .catch((err) => {
          
        });
    },
    onClickLeft() {
      Toast("返回");
      this.$router.go(-1);
    },
    ClassificationContentOne(id) {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/articles?category_id=" + id,
      })
        .then((result) => {
          if (result.data.code == "_200") {
            // console.log("result=1=>", result);
            this.Contentsuju = result.data.data.list;
          }
        })
        .catch((err) => {});
    },
    onClickRight() {
      Toast("按钮");
    },
  },
};
</script>
<style lang="less" scoped>
.Content {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  padding: 20px;
  .Content-one {
    width: 100%;
    height: calc(120px - 30px);
    padding: 15px 0;
    border-bottom: 1px solid rgb(184, 184, 184);
    .Content-img {
      float: left;
      width: 50%;
      height: 100%;
      border-radius: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .Content-text {
      float: left;
      width: calc(50% - 20px);
      height: 100%;
      padding: 0 10px;
      .Content-text-one {
        width: 100%;
        height: 40px;
        font-size: 15px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .Content-text-two {
        width: 100%;
        height: 25px;
        color: rgb(168, 168, 168);
        line-height: 25px;
      }
      .Content-text-three {
        width: 100%;
        height: 25px;
        line-height: 25px;
        .Content-text-three-img {
          float: left;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .Content-text-three-text {
          width: 75%;
          float: left;
          height: 25px;
          line-height: 25px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>