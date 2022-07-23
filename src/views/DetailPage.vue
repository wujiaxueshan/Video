<template>
  <div class="detailPage">
    <meta name="referrer" content="no-referrer" />
    <div class="gekai"></div>
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="(item, index) in jiashuju" :title="item" :key="index">
        <div v-if="index == 0">
          <div class="detailPage-One">
            <van-swipe @change="onChange" class="tupian">
              <van-swipe-item
                v-for="(imgs, index) in DetailPagetupian.children"
                :title="item"
                :key="index"
              >
                <img :src="imgs.model.cover" alt="" />
              </van-swipe-item>
              <template #indicator>
                <div class="custom-indicator">
                  {{ current + 1 }}/{{ currentone }}
                </div>
              </template>
            </van-swipe>
            <div class="share">
              <div
                class="share-kuang"
                v-for="(item, index) in DetailPageshuju"
                :key="index"
              >
                <div class="share-text"
                @click="xiangqing(item.children[0].model.resource.id)">
                  {{ item.children[0].model.resource.title }}
                </div>
                <div class="share-imgs" @click="xiangqing(item.children[0].model.resource.id)">
                  <img
                    :src="item.children[0].model.resource.share_info.image"
                    alt=""
                  />
                </div>
                <div class="share-kuang-one">
                  <div class="kuangge" @click="xiangqing(item.children[0].model.resource.id)">
                    <div class="ge-one">
                      <van-icon name="chat-o" class="ge-one-van-icon" />
                    </div>
                    <div class="ge-two">
                      <!-- {{ item.children[0].model.resource.count.count_comment }} -->
                    </div>
                  </div>
                  <div class="kuangge" @click="qiehuan(index)">
                    <div class="ge-one">
                      <van-icon name="good-job-o" class="ge-one-van-icon" />
                    </div>
                    <div class="ge-two">
                      {{ item.children[0].model.resource.count.count_like }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-font">
              没有数据了！！！
            </div>
          </div>
        </div>
        <div v-if="index == 1">
          <div class="detailPage-Two">
            <div class="share">
              <div
                class="share-kuang"
                v-for="(item, index) in DetailPageOneshuju"
                :key="index"
              >
                <div class="share-text"
                @click="xiangqing(item.children[0].model.resource.id)">
                  {{ item.children[0].model.resource.title }}
                </div>
                <div class="share-imgs" @click="xiangqing(item.children[0].model.resource.id)">
                  <img
                    :src="item.children[0].model.resource.share_info.image"
                    alt=""
                  />
                </div>
                <div class="share-kuang-one">
                  <div class="kuangge" @click="xiangqing(item.children[0].model.resource.id)">
                    <div class="ge-one">
                      <van-icon name="chat-o" class="ge-one-van-icon" />
                    </div>
                    <div class="ge-two">
                      <!-- {{ item.children[0].model.resource.count.count_comment }} -->
                    </div>
                  </div>
                  <div class="kuangge" @click="qiehuanOne(index)">
                    <div class="ge-one">
                      <van-icon name="good-job-o" class="ge-one-van-icon" />
                    </div>
                    <div class="ge-two">
                      {{ item.children[0].model.resource.count.count_like }}
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
              <div class="clearone"></div>
            </van-list>
          </div>
        </div>
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
  name: "DetailPage",
  data() {
    return {
      active: 0,
      value: "",
      current: 0,
      shuzhu: [],
      currentone: 0,
      DetailPagetupian: [],
      DetailPageshuju: [],
      DetailPageOneshuju: [],
      jiashuju: ["热门推荐", "场库精选"],
      shu: 1,
      loading: false,
      finished: false,
    };
  },

  created() {
    this.DetailPage();
    this.DetailPageOne();
  },
  methods: {
    xiangqing(id){
      this.$router.push({ name: "Video", params: { id } });
    },
    //加载获取数据
    onLoadOne() {
      setTimeout(() => {
        Toast('没有数据了！！');
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onLoad() {
      this.shu++;
      let a = this.shu * 20;
      this.axios({
        //请求类型
        method: "get",
        //请求路径
        url:
          "https://apis.netstart.cn/xpc/home/vmovier?offset=" + a + "&pageSize=20",
      })
        .then((result) => {
          // console.log("result===>", result);
          let smt = result.data.data.children;
          for (let i = 0; i < smt.length; i++) {
            if (smt[i].type == "uiBigCard") {
              this.DetailPageOneshuju.push(smt[i]);
            }
          }
          // console.log(this.DetailPageOneshuju);
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          let sss = smt.length + 1;
          // console.log(sss);
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
    qiehuan(i) {
      for (let j = 0; j < this.shuzhu.length; j++) {
        if (this.shuzhu[j] == i) {
          this.shuzhu.splice(j, 1);
          this.DetailPageshuju[i].children[0].model.resource.count.count_like--;
          Toast({ type: "primary", message: "取消成功 ！！" });
          return;
        }
      }
      this.shuzhu.push(i);
      this.DetailPageshuju[i].children[0].model.resource.count.count_like++;
      Toast({ type: "primary", message: "点赞成功 ！！" });
    },
    qiehuanOne(i) {
      for (let j = 0; j < this.shuzhu.length; j++) {
        if (this.shuzhu[j] == i) {
          this.shuzhu.splice(j, 1);
          this.DetailPageOneshuju[i].children[0].model.resource.count
            .count_like--;
          Toast({ type: "primary", message: "取消成功 ！！" });
          return;
        }
      }
      this.shuzhu.push(i);
      this.DetailPageOneshuju[i].children[0].model.resource.count.count_like++;
      Toast({ type: "primary", message: "点赞成功 ！！" });
    },
    goDetail() {
      this.$router.push({ name: "Search" });
    },
    onChange(index) {
      this.current = index;
    },
    DetailPage() {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/home/hot",
      })
        .then((result) => {
          // console.log("result=热门-首页=1=>", result);
          let smt = result.data.data.children;
          for (let i = 0; i < smt.length; i++) {
            if (smt[i].type == "uiBanner") {
              this.DetailPagetupian = smt[i];
            }
            if (smt[i].type == "uiBigCard") {
              this.DetailPageshuju.push(smt[i]);
            }
          }
          this.currentone = this.DetailPagetupian.children.length;
          // console.log('this.DetailPageshuju==>',this.DetailPageshuju);
        })
        .catch((err) => {
          console.log("444");
        });
    },
    DetailPageOne() {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/home/vmovier",
      })
        .then((result) => {
          // console.log("result=热门-首页=2=>", result);
          this.DetailPageOneshuju = result.data.data.children;
          // console.log("this.DetailPageOneshuju==>",this.DetailPageOneshuju);
        })
        .catch((err) => {
          console.log("444");
        });
    },
  },
};
</script>
<style lang="less" scoped>
.ding {
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
}
.text-font{
  width: 100%;
  height: 70px;
  text-align: center;
}
.clearone {
  width: 100%;
  height: 10px;
  clear: both;
}
.gekai {
  width: 100%;
  height: 50px;
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
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  color: white;
}
.detailPage-One {
  padding: 10px 20px;
  width: calc(100% - 40px);
  height: calc(100% - 20px);
  background-color: rgb(240, 240, 240);
}
.detailPage-Two {
  padding: 10px 20px;
  width: calc(100% - 40px);
  height: calc(100% - 20px);
  background-color: rgb(240, 240, 240);
}
.share {
  width: 100%;
  height: 100%;
  .share-kuang {
    width: 100%;
    height: 280px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    .share-text {
      width: calc(100% - 30px);
      padding: 0 15px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 600;
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .share-imgs {
      width: 100%;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .share-kuang-one {
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