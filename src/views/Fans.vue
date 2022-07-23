<template>
  <div class="fans">
    <meta name="referrer" content="no-referrer" />
    <van-nav-bar
      title="TA的粉丝"
      left-arrow
      color="#000"
      @click-left="onClickLeft"
      fixed
      placeholder
    />
    <div class="Fans-kuang" v-for="(item, index) in FansData" :key="index" >
      <!-- @click="AttentionOne(item.userinfo.id)" -->
      <div class="Fans-imges">
        <img :src="item.userinfo.avatar" alt="" />
      </div>
      <div class="Fans-text">
        <div class="Fans-text-one">{{ item.userinfo.username }}</div>
        <div class="Fans-text-two">
          粉丝
          {{ item.userinfo.count.count_follower }}
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
  name: "Fans",
  data() {
    return {
      id: "",
      FansData: [],
      FansDataOne: [],
      shu: 1,
      loading: false,
      finished: false,
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.FansRequest(this.id);
  },
  methods: {
    AttentionOne(pid) {
      this.$router.push({ name: "User" , params: { pid } });
    },
    onLoad() {
      this.shu++;
      this.axios({
        method: "get",
        url:
          "https://apis.netstart.cn/xpc/user/" +
          this.id +
          "/followers?page=" +
          this.shu,
      })
        .then((result) => {
          if (result.data.code == "_200") {
            this.FansDataOne = result.data.data.list;
            // console.log("this.FansDataOne==>", this.FansDataOne);
          }
          for (let i = 0; i < this.FansDataOne.length; i++) {
            console.log(i);
            this.FansData.push(this.FansDataOne[i]);
          }
          // 加载状态结束
          this.loading = false;
          //   数据全部加载完成
          let sss = this.FansDataOne.length + 1;
          if (sss == 1) {
            this.finished = true;
          }
          this.FansDataOne = [];
        })
        .catch((err) => {});
    },
    onClickLeft() {
      Toast("返回");
      this.$router.go(-1);
    },
    FansRequest(id) {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/user/" + id + "/followers?page=1",
      })
        .then((result) => {
          console.log(result);
          if (result.data.code == "_200") {
            this.FansData = result.data.data.list;
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep .van-nav-bar .van-icon {
  color: black;
}
.Fans-kuang {
  width: calc(100% - 40px);
  height: calc(90px - 20px);
  padding: 10px 20px;
  border-bottom: 1px solid rgb(245, 245, 245);
  .Fans-imges {
    float: left;
    width: calc(70px - 4px);
    height: calc(70px - 4px);
    border-radius: 70px;
    padding: 2px;
    background-color: rgb(199, 199, 199);
    img {
      width: 66px;
      border-radius: 70px;
    }
  }
  .Fans-text {
    float: left;
    width: calc(79% - 30px);
    height: calc(70px - 20px);
    padding: 10px 15px;
    .Fans-text-one {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 13.5px;
    }
    .Fans-text-two {
      width: 100%;
      height: 20px;
      line-height: 20px;
      color: rgb(167, 167, 167);
    }
  }
}
</style>