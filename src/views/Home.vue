<template>
  <div class="home">
    <meta name="referrer" content="no-referrer" />
    <div class="gekai"></div>
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="(item, index) in jiashuju" :title="item" :key="index">
        <!-- <div v-if="index == 0">0</div> -->
        <div class="recommend" v-if="index == 0">
          <van-swipe @change="onChange" :autoplay="3000" class="tupian">
            <van-swipe-item
              v-for="(item, index) in HomeTwotupian.children"
              :key="index"
            >
              <img :src="item.model.cover" alt="" />
            </van-swipe-item>
            <template #indicator>
              <div class="custom-indicator">
                {{ current + 1 }}/{{ currentone }}
              </div>
            </template>
          </van-swipe>
          <div class="recommend-kuang">
            <div
              class="recommend-kuang-one"
              :class="[index % 2 == 0 ? 'left' : 'right']"
              v-for="(items, index) in HomeTwoshuju"
              :key="index"
              @click="xiangqing(items.children[0].model.resource.id)"
            >
              <div class="recommend-kuang-img">
                <img
                  :src="items.children[0].model.resource.share_info.image"
                  alt=""
                />
              </div>
              <div class="recommend-kuang-text">
                {{ items.children[0].model.resource.share_info.title }}
              </div>
              <div class="recommend-kuang-text-two">
                <div class="recommend-kuang-text-left">
                  {{
                    items.children[0].model.resource.author.userinfo.username
                  }}
                </div>
                <div class="recommend-kuang-text-right">
                  <van-icon name="ellipsis" />
                </div>
              </div>
            </div>
            <div class="clear"></div>
          </div>

          <!-- 加载 -->
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="clearone"></div>
          </van-list>
        </div>
        <div class="RecommendedToday" v-if="index == 1">
          <div class="RecommendedToday-text">今日精选</div>
          <div
            class="RecommendedToday-kuang"
            v-for="(itme, index) in HomeOneshuju"
            :key="index"
          >
            <div class="RecommendedToday-kuang-one" @click="xiangqing(itme.children[0].model.resource.id)">
              <div class="RecommendedToday-kuang-one-img">
                <img
                  :src="itme.children[0].model.resource.author.userinfo.avatar"
                  alt=""
                />
              </div>
              <div class="RecommendedToday-kuang-one-text">
                {{ itme.children[0].model.resource.author.userinfo.username }}
              </div>
            </div>
            <div class="RecommendedToday-kuang-two">
              {{ itme.children[0].model.resource.share_info.title }}
            </div>
            <div class="RecommendedToday-kuang-three" @click="xiangqing(itme.children[0].model.resource.id)">
              <img
                :src="itme.children[0].model.resource.share_info.image"
                alt=""
              />
            </div>
            <div class="RecommendedToday-kuang-four">
              <div class="kuangge"  @click="xiangqing(itme.children[0].model.resource.id)">
                <div class="ge-one">
                  <van-icon name="chat-o" class="ge-one-van-icon" />
                </div>
                <div class="ge-two">
                  <!-- {{ itme.children[0].model.resource.count.count_comment }} -->
                </div>
              </div>
              <div class="kuangge" @click="qiehuan(index)">
                <div class="ge-one">
                  <van-icon name="good-job-o" class="ge-one-van-icon" />
                </div>
                <div class="ge-two">
                  {{ itme.children[0].model.resource.count.count_like }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="gekai"></div>
      </van-tab>
    </van-tabs>
    <van-search
      v-model="value"
      shape="round"
      background="#fff"
      placeholder="请输入搜索关键词"
      @click="goDetail"
      class="ding"
    ></van-search>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Home",
  data() {
    return {
      value: "",
      active: 0,
      jiashuju: ["精选推荐", "今日推荐"],
      HomeOneshuju: [],
      shuzhu: [],
      current: 0,
      currentone: 0,
      HomeTwotupian: [],
      HomeTwoshuju: [],
      shu: 2,
      loading: false,
      finished: false,
    };
  },
  created() {
    // this.Home();
    this.HomeOne();
    this.HomeTwo();
    // this.HomeFour();
  },
  methods: {
    xiangqing(id){
      this.$router.push({ name: "Video", params: { id } });
    },
    DetailsPage(pid) {
      this.$router.push({ name: "User" , params: { pid } });
    },
    //加载获取数据
    onLoad() {
      this.shu++;
      this.axios({
        //请求类型
        method: "get",
        //请求路径
        url:
          "https://apis.netstart.cn/xpc/home/recommend?page=" +
          this.shu +
          "&pageSize=28",
      })
        .then((result) => {
          // console.log("result===>", result);
          let smt = result.data.data.children;
          for (let i = 0; i < smt.length; i++) {
            if (smt[i].type == "uiMiddleCard") {
              this.HomeTwoshuju.push(smt[i]);
            }
          }
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          let sss = smt.length + 1;
          if (sss == 1) {
            this.finished = true;
          }
        })
        .catch((err) => {});
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
    },
    onChange(index) {
      this.current = index;
    },
    qiehuan(i) {
      for (let j = 0; j < this.shuzhu.length; j++) {
        if (this.shuzhu[j] == i) {
          this.shuzhu.splice(j, 1);
          this.HomeOneshuju[i].children[0].model.resource.count.count_like--;
          Toast({ type: "primary", message: "取消成功 ！！" });
          return;
        }
      }
      this.shuzhu.push(i);
      this.HomeOneshuju[i].children[0].model.resource.count.count_like++;
      Toast({ type: "primary", message: "点赞成功 ！！" });
    },
    Home() {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/home/config",
      })
        .then((result) => {
          // console.log("result=Tab选项=1=>", result);
          this.jiashuju = result.data.data.tab;
          this.Homeshuju.push(this.jiashuju[0]);
          this.Homeshuju.push(this.jiashuju[2]);
          this.Homeshuju.push(this.jiashuju[3]);
        })
        .catch((err) => {
          console.log("444");
        });
    },
    HomeOne() {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/home/selection",
      })
        .then((result) => {
          // console.log("result=每日精选=2=>", result);
          let smp = result.data.data.children;
          for (let i = 1; i < smp.length; i++) {
            this.HomeOneshuju.push(smp[i]);
          }
        })
        .catch((err) => {
          console.log("444");
        });
    },
    HomeTwo() {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/home/recommend",
      })
        .then((result) => {
          // console.log("result=推荐列表=3=>", result.data.data.children);
          let smt = result.data.data.children;
          for (let i = 0; i < smt.length; i++) {
            if (smt[i].type == "uiBanner") {
              this.HomeTwotupian = smt[i];
            }
            if (smt[i].type == "uiMiddleCard") {
              this.HomeTwoshuju.push(smt[i]);
            }
          }
          // console.log(this.HomeTwoshuju);
          this.currentone = this.HomeTwotupian.children.length;
        })
        .catch((err) => {
          console.log("444");
        });
    },
    HomeFour() {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/home/mustSee",
      })
        .then((result) => {
          console.log("result=入场必看=4=>", result);
        })
        .catch((err) => {
          console.log("444");
        });
    },
    goDetail() {
      this.$router.push({ name: "Search" });
    },
  },
};
</script>
<style lang="less" scoped>
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  color: white;
}
.left {
  float: left;
}
.right {
  float: right;
}
.clearone {
  width: 100%;
  height: 2px;
  clear: both;
}
.tupian {
  width: 100%;
  height: 200px;
  border-radius: 10px;
  margin-bottom: 10px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}
.ding {
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
}
.gekai {
  width: 100%;
  height: 50px;
}
.recommend {
  padding: 5px 15px;
  width: calc(100% - 30px);
  height: calc(100% - 10px);
  background-color: rgb(245, 245, 245);
  .recommend-kuang {
    width: 100%;
    height: 100%;
    .clear {
      width: 100%;
      height: 2px;
      clear: both;
    }
    .recommend-kuang-one {
      width: 48%;
      height: 165px;
      border-radius: 10px;
      background-color: white;
      margin-bottom: 10px;
      .recommend-kuang-img {
        width: 100%;
        height: 95px;
        border-radius: 10px 10px 0 0;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px 10px 0 0;
        }
      }
      .recommend-kuang-text {
        width: calc(100% - 20px);
        height: calc(40px - 10px);
        padding: 5px 10px;
        font-size: 13px;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .recommend-kuang-text-two {
        width: calc(100% - 20px);
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        .recommend-kuang-text-left {
          width: 70%;
          height: 100%;
          color: rgb(153, 153, 153);
          float: left;
        }
        .recommend-kuang-text-right {
          text-align: center;
          width: 30px;
          color: rgb(153, 153, 153);
          height: 100%;
          float: right;
        }
      }
    }
  }
}
.RecommendedToday {
  padding: 10px 20px;
  width: calc(100% - 40px);
  height: calc(100% - 20px);
  background-color: rgb(240, 240, 240);
  .RecommendedToday-text {
    width: 100%;
    height: 40px;
    font-size: 18px;
    line-height: 40px;
  }
  .RecommendedToday-kuang {
    width: 100%;
    height: 300px;
    margin-bottom: 15px;
    border-radius: 10px;
    background-color: white;
    .RecommendedToday-kuang-one {
      width: calc(100% - 30px);
      height: 40px;
      padding: 5px 15px;
      .RecommendedToday-kuang-one-img {
        float: left;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .RecommendedToday-kuang-one-text {
        float: left;
        width: calc(70% - 20px);
        height: 40px;
        padding: 0 10px;
        line-height: 40px;
        font-size: 16px;
        overflow: hidden;
        color: rgb(160, 160, 160);
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
    .RecommendedToday-kuang-two {
      width: calc(100% - 30px);
      height: 30px;
      padding: 0 15px;
      line-height: 30px;
      font-size: 17px;
      font-weight: 800;
    }
    .RecommendedToday-kuang-three {
      width: 100%;
      height: 180px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .RecommendedToday-kuang-four {
      width: 100%;
      height: 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      .kuangge {
        width: 50%;
        height: 40px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        .ge-one {
          .ge-one-van-icon {
            font-size: 15px;
          }
        }
      }
    }
  }
}
</style>