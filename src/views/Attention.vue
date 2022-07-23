<template>
  <div class="attention">
    <meta name="referrer" content="no-referrer" />
    <van-nav-bar
      title="TA的关注"
      left-arrow
      color="#000"
      @click-left="onClickLeft"
      fixed
      placeholder
    />
    <div
      class="Attention-kuang"
      v-for="(item, index) in AttentionData"
      :key="index"
    >
      <!-- @click="AttentionOne(item.userinfo.id)" -->
      <div class="Attention-imges">
        <img :src="item.userinfo.avatar" alt="" />
      </div>
      <div class="Attention-text">
        <div class="Attention-text-one">{{ item.userinfo.username }}</div>
        <div class="Attention-text-two">
          {{ item.userinfo.occupation }}・粉丝
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
  name: "Attention",
  data() {
    return {
      id: "",
      AttentionData: [],
      AttentionDataOne: [],
      AttentionDizhi: [],
      shu: 1,
      loading: false,
      finished: false,
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.AttentionRequest(this.id);
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
          "/followees?page=" +
          this.shu,
      })
        .then((result) => {
          if (result.data.code == "_200") {
            this.AttentionDataOne = result.data.data.list;
          }
          for (let i = 0; i < this.AttentionDataOne.length; i++) {
            this.AttentionData.push(this.AttentionDataOne[i]);
          }
          // 加载状态结束
          this.loading = false;
          //   数据全部加载完成
          let sss = this.AttentionDataOne.length + 1;
          if (sss == 1) {
            this.finished = true;
          }
          this.AttentionDataOne = [];
        })
        .catch((err) => {});
        // console.log(this.loading);
    },
    onClickLeft() {
      Toast("返回");
      this.$router.go(-1);
    },
    AttentionRequest(id) {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/user/" + id + "/followees?page=1",
      })
        .then((result) => {
          if (result.data.code == "_200") {
            this.AttentionData = result.data.data.list;
          }
          // console.log("this.AttentionData==>", this.AttentionData);
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
.Attention-kuang {
  width: calc(100% - 40px);
  height: calc(90px - 20px);
  padding: 10px 20px;
  border-bottom: 1px solid rgb(245, 245, 245);
  .Attention-imges {
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
  .Attention-text {
    float: left;
    width: calc(79% - 30px);
    height: calc(70px - 20px);
    padding: 10px 15px;
    .Attention-text-one {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 13.5px;
    }
    .Attention-text-two {
      width: 100%;
      height: 20px;
      line-height: 20px;
      color: rgb(167, 167, 167);
    }
  }
}
</style>