<template>
  <div class="searchone">
    <meta name="referrer" content="no-referrer" />
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @focus="qiehuan"
        @cancel="onCancel"
      />
    </form>
    <van-tabs v-model="active" swipeable>
      <van-tab title="作品">
        <div class="paixu">
          <div class="paixu-right">
            <van-dropdown-menu class="paixu-right-van">
              <van-dropdown-item
                v-model="value1"
                @change="gaibianshuju"
                :options="option1"
              />
              <van-dropdown-item
                v-model="value2"
                @change="gaibianshuju2"
                :options="option2"
              />
            </van-dropdown-menu>
          </div>
        </div>
        <div v-if="SearchIdOneShuju !== ''">
          <div class="works">
            <div class="zonshu">
              共<span class="sonshu-color">{{ SearchIdOneShuju.total }}</span
              >部作品
            </div>
            <div
              class="works-one"
              v-for="(item, index) in SearchIdOneShuju.list"
              :key="index"
              @click="xiangqing(item.id)"
            >
              <div class="works-img">
                <img :src="item.cover" alt="" />
              </div>
              <div class="works-text">
                <div class="works-text-one">
                  {{ item.title }}
                </div>
                <div class="works-text-two">
                  播放量 {{ item.count.count_view }}&nbsp;&nbsp;喜欢
                  {{ item.count.count_like }}
                </div>
                <div class="works-text-three">
                  <div class="works-text-three-img">
                    <img :src="item.author.userinfo.avatar" alt="" />
                  </div>
                  <div class="works-text-three-text">
                    {{ item.author.userinfo.username }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 加载 -->
        <van-list
          v-model="loadingOne"
          :finishedOne="finishedOne"
          finishedOne-text="没有更多了"
          @load="onLoadOne"
        >
          <hr class="clear" />
        </van-list>
      </van-tab>
      <van-tab title="创作人">
        <div v-if="SearchIdTwoShuju !== ''">
          <div class="Creator">
            <div class="zonshu">
              共<span class="sonshu-color">{{ SearchIdTwoShuju.total }}</span
              >位创作人
            </div>
            <div
              class="Creator-one"
              v-for="(item, index) in SearchIdTwoShuju"
              :key="index"
              @click="DetailsPage(item.id)"
            >
              <div class="Creator-img">
                <img :src="item.articles[0].author.userinfo.avatar" alt="" />
              </div>
              <div class="Creator-kuang">
                <div class="Creator-kuang-one">
                  {{ item.articles[0].author.userinfo.username }}
                </div>
                <div class="Creator-kuang-two">
                  {{
                    item.articles[0].author.userinfo.occupation
                  }}&nbsp;&nbsp;粉丝
                  {{ item.articles[0].author.userinfo.count.count_follower }}
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
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "Searchone",
  data() {
    return {
      shu: 1,
      shuOne: 1,
      active: 2,
      value: "",
      loading: false,
      finished: false,
      loadingOne: false,
      finishedOne: false,
      SearchIdOneShuju: [],
      SearchIdTwoShuju: [],
      SearchIdOneShujuOne: [],
      SearchIdTwoShujuTwo: [],
      value1: 0,
      a: "hot",
      b: "0",
      option1: [
        { text: "最热", value: 0, neame: "hot" },
        { text: "默认", value: 1, neame: "default" },
        { text: "最新", value: 2, neame: "addtime" },
      ],
      value2: 0,
      option2: [
        { text: "不可下载", value: 0 },
        { text: "可以下载", value: 1 },
      ],
    };
  },
  created() {
    this.value = this.$route.params.val;
    this.SearchIdOne(this.value);
    this.SearchIdTwo(this.value);
  },
  methods: {
    xiangqing(id) {
      // console.log(id);
      this.$router.push({ name: "Video", params: { id } });
    },
    gaibianshuju() {
      this.SearchIdOneShuju = [];
      this.a = this.option1[this.value1].neame;
      this.SearchIdOne1(this.a);
    },
    gaibianshuju2() {
      this.b = this.value2;
      this.SearchIdOne2(this.b);
    },
    DetailsPage(pid) {
      // console.log(pid);
      this.$router.push({ name: "User", params: { pid } });
    },
    shangchu() {
      this.textshuju = [];
    },
    qiehuan() {
      this.value = "";
      this.SearchIdOneShuju = [];
      this.SearchIdTwoShuju = [];
      this.$router.push({ name: "Search" });
    },
    SearchIdOne(val) {
      this.axios({
        method: "get",
        url:
          "https://apis.netstart.cn/xpc/search?type=article&kw=" +
          val +
          "&page=1&sort=hot&allow_download=0",
      })
        .then((result) => {
          // console.log("result=1=>", result);
          if (result.data.message == "OK") {
            this.SearchIdOneShuju = result.data.data;
          }
        })
        .catch((err) => {
          console.log("444");
        });
    },
    SearchIdTwo(val) {
      this.axios({
        method: "get",
        url:
          "https://apis.netstart.cn/xpc/search?type=creator&kw=" +
          val +
          "&page=1&sort=hot&allow_download=0",
      })
        .then((result) => {
          // console.log("result=2=>", result);
          if (result.data.message == "OK") {
            this.SearchIdTwoShuju = result.data.data.list;
          }
        })
        .catch((err) => {
          console.log("404");
        });
    },
    SearchIdOne1(a) {
      this.axios({
        method: "get",
        url:
          "https://apis.netstart.cn/xpc/search?type=article&kw=" +
          this.value +
          "&page=1&sort=" +
          a +
          "&allow_download=" +
          this.b,
      })
        .then((result) => {
          // console.log("result=1=>", result);
          if (result.data.message == "OK") {
            this.SearchIdOneShuju = result.data.data;
          }
        })
        .catch((err) => {
          console.log("444");
        });
    },
    SearchIdOne2(a) {
      this.axios({
        method: "get",
        url:
          "https://apis.netstart.cn/xpc/search?type=article&kw=" +
          this.value +
          "&page=1&sort=" +
          this.a +
          "&allow_download=" +
          a,
      })
        .then((result) => {
          // console.log("result=1=>", result);
          if (result.data.message == "OK") {
            this.SearchIdOneShuju = result.data.data;
          }
        })
        .catch((err) => {
          console.log("444");
        });
    },
    onCancel() {
      this.$router.push({ name: "Home" });
    },

    onLoad() {
      this.shu++;
      this.axios({
        //请求类型
        method: "get",
        //请求路径
        url:
          "https://apis.netstart.cn/xpc/search?type=creator&kw=" +
          this.value +
          "&page=" +
          this.shu +
          "&sort=" +
          this.a +
          "&allow_download=" +
          this.b,
      })
        .then((result) => {
          if (result.data.message == "OK") {
            this.SearchIdTwoShujuTwo = result.data.data.list;

            for (let i = 0; i < this.SearchIdTwoShujuTwo.length; i++) {
              this.SearchIdTwoShuju.push(this.SearchIdTwoShujuTwo[i]);
            }
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成
            let sss = this.SearchIdTwoShujuTwo.length + 1;
            if (sss < 40 || this.SearchIdTwoShuju < 40) {
              this.finished = true;
            }
          }
        })
        .catch((err) => {});
    },
    onLoadOne() {
      this.shuOne++;
      this.axios({
        //请求类型
        method: "get",
        //请求路径
        url:
          "https://apis.netstart.cn/xpc/search?type=article&kw=" +
          this.value +
          "&page=" +
          this.shuOne +
          "&sort=" +
          this.a +
          "&allow_download=" +
          this.b,
      })
        .then((result) => {
          if (result.data.message == "OK") {
            this.SearchIdOneShujuOne = result.data.data.list;

            for (let i = 0; i < this.SearchIdOneShujuOne.length; i++) {
              this.SearchIdOneShuju.list.push(this.SearchIdOneShujuOne[i]);
            }
            // 加载状态结束
            this.loadingOne = false;
            // 数据全部加载完成
            let sss = this.SearchIdOneShujuOne.length + 1;
            if (sss < 40 || this.SearchIdOneShuju.list < 40) {
              this.finishedOne = true;
            }
          }
        })
        .catch((err) => {});
    },
  },
};
</script>
<style lang="less" scoped>
::v-deep .van-dropdown-menu__bar {
  height: 100%;
  box-shadow: 0 0 0 0;
}
.paixu {
  width: calc(100% - 40px);
  height: 40px;
  padding: 0 20px;
  .paixu-right {
    width: 100%;
    height: 100%;
    .paixu-right-van {
      width: 100%;
      height: 100%;
    }
  }
}
.works {
  width: calc(100% - 40px);
  height: 100%;
  padding: 0 20px;
  .zonshu {
    width: 100%;
    height: 50px;
    color: rgb(167, 167, 167);
    line-height: 50px;
    .sonshu-color {
      color: red;
    }
  }
  .works-one {
    width: 100%;
    height: calc(120px - 30px);
    padding: 15px 0;
    border-bottom: 1px solid rgb(184, 184, 184);
    .works-img {
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
    .works-text {
      float: left;
      width: calc(50% - 20px);
      height: 100%;
      padding: 0 10px;
      .works-text-one {
        width: 100%;
        height: 40px;
        font-size: 15px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .works-text-two {
        width: 100%;
        height: 25px;
        color: rgb(168, 168, 168);
        line-height: 25px;
      }
      .works-text-three {
        width: 100%;
        height: 25px;
        line-height: 25px;
        .works-text-three-img {
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
        .works-text-three-text {
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
.Creator {
  width: calc(100% - 40px);
  height: 100%;
  padding: 0 20px;
  .zonshu {
    width: 100%;
    height: 50px;
    color: rgb(167, 167, 167);
    line-height: 50px;
    .sonshu-color {
      color: red;
    }
  }
  .Creator-one {
    width: 100%;
    height: calc(90px - 20px);
    padding: 10px 0;
    border-bottom: 1px solid rgb(184, 184, 184);
    .Creator-img {
      width: 70px;
      height: 70px;
      float: left;
      border-radius: 50%;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .Creator-kuang {
      width: 75%;
      height: 70px;
      float: left;
      .Creator-kuang-one {
        width: 100%;
        height: 40px;
        font-size: 19px;
        line-height: 40px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .Creator-kuang-two {
        width: 100%;
        height: 30px;
        color: rgb(187, 187, 187);
        line-height: 30px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>