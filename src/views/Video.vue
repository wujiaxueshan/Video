<template>
  <div class="video">
    <meta name="referrer" content="no-referrer" />
    <van-nav-bar
      :title="text"
      left-arrow
      @click-left="onClickLeft"
      fixed
      placeholder
    />

    <div class="video-box">
      <video
        class="auto-video"
        :src="Videoshuju.video.content.progressive[0].https_url"
        controls
        autoplay
      ></video>
    </div>
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="(itme, index) in jiashuju" :title="itme" :key="index">
        <div v-if="index == 0">
          <div class="briefIntroduction">
            <div class="kuang-one">{{ Videoshuju.title }}</div>
            <div class="kuang-two">{{ Videoshuju.publish_time }}</div>
            <div class="kuang-three">{{ Videoshuju.content }}</div>
            <div class="kuang-four">
              <div class="text-img">
                <van-icon :name="iconOne" @click="dianzan()" />
              </div>
              <div class="text-img">
                <van-icon :name="iconTwo" @click="shoucang()" />
              </div>
              <div class="text-img">
                <van-icon
                  name="share-o"
                  @click="showShare = true"
                /><van-share-sheet
                  v-model="showShare"
                  title="立即分享给好友"
                  :options="options"
                  @select="onSelect"
                />
              </div>
            </div>
          </div>
          <div class="briefIntroduction-one">
            <div class="briefIntroduction-text">相似视频</div>
            <div class="briefIntroduction-kuang">
              <div
                class="rei"
                v-for="(itme, index) in Video2husju"
                :key="index"
                @click="tiaozhuan(itme.id)"
              >
                <div class="rei-img">
                  <img :src="itme.share_info.image" alt="" />
                </div>
                <div class="rei-text">
                  <div class="text-one">
                    {{ itme.share_info.title }}
                  </div>
                  <div class="text-two">
                    播放量 {{ itme.count.count_view }} &nbsp;&nbsp;喜欢
                    {{ itme.count.count_like }}
                  </div>
                  <div class="text-three">
                    <div class="text-three-img">
                      <img :src="itme.author.userinfo.avatar" alt="" />
                    </div>
                    <div class="text-three-text">
                      {{ itme.author.userinfo.username }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="index == 1">
          <div class="bbb1" v-if="pinlunOne">没有评论</div>
          <div class="bbb2" v-if="pinlunTwo">
            <div class="bbb2-kuan">
              <div
                class="bbb2-kuan-rei"
                v-for="(itme, index) in pinlun"
                :key="index"
              >
                <div class="rei-one">
                  <div class="rei-img">
                    <img :src="itme.imgs" alt="" />
                  </div>
                  <div class="rei-text">{{ itme.name }}</div>
                </div>
                <div class="rei-two">
                  {{ itme.content }}
                </div>
                <div class="rei-three">{{ itme.shiji }}</div>
              </div>
            </div>
          </div>
          <div class="ipt">
            <div class="ipt-kuang">
              <input id="input-one" type="text" name="" />
              <button @click="fason">发送</button>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Video",
  data() {
    return {
      iconOne: "good-job-o",
      iconTwo: "star-o",
      value: "",
      text: "视频",
      active: 0,
      id: "",
      showShare: false,
      jiashuju: ["简介", "评论"],
      Videoshuju: [],
      Video2husju: [],
      pinlun: [],
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
      pinlunOne: false,
      pinlunTwo: false,
      //   jiajilu: [],
      jisyonhu: {
        name: "手机用户3515151",
        content: "",
        shiji: "",
        zan: 0,
        imgs: "https://oss-xpc0.xpccdn.com/passport/avatar/11946305/2021/6/60cc28ad13726.jpeg",
      },
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.Video(this.id);
    // this.Video1();
    this.Video2(this.id);
    // this.Video3();
    this.panduan();
  },
  methods: {
    dianzan() {
      if (this.iconOne == "good-job-o") {
        this.iconOne = "good-job";
        Toast("点赞成功！！");
      } else {
        this.iconOne = "good-job-o";
        Toast("取消点赞！！");
      }
    },
    shoucang() {
      if (this.iconTwo == "star-o") {
        this.iconTwo = "star";
        Toast("收藏成功！！");
      } else {
        this.iconTwo = "star-o";
        Toast("取消收藏！！");
      }
    },
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    tiaozhuan(id) {
      this.iconTwo = "star-o";
      this.iconOne = "good-job-o";
      this.id = id;
      this.Videoshuju = [];
      this.Video2husju = [];
      this.pinlun = [];
      this.Video(this.id);
      // this.Video1();
      this.Video2(this.id);
    },
    fason() {
      let input = document.querySelector("#input-one");
      if (input.value == "") {
        Toast("内容不能为空！！！");
        return;
      }
      let ssss = {
        name: "手机用户3515151",
        content: "",
        shiji: "",
        zan: 0,
        imgs: "https://oss-xpc0.xpccdn.com/passport/avatar/11946305/2021/6/60cc28ad13726.jpeg",
      };
      let myDate = new Date();
      let Year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
      let Month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      let Datetwo = myDate.getDate(); //获取当前日(1-31)
      let mytime = myDate.toLocaleTimeString(); //获取当前时间
      let datadata = Year + "/" + Month + "/" + Datetwo + "    " + mytime;
      ssss.content = input.value;
      ssss.shiji = datadata;
      this.pinlun.unshift(ssss);
      // console.log(this.pinlun);
      this.panduan();
      input.value = "";
    },
    panduan() {
      if (this.pinlun == "") {
        this.pinlunOne = true;
        this.pinlunTwo = false;
      } else {
        this.pinlunOne = false;
        this.pinlunTwo = true;
      }
    },
    Video(id) {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/article/" + id + "?from=pc",
      })
        .then((result) => {
          // console.log("result=1=>", result);
          if (result.data.code == "_200") {
            this.Videoshuju = result.data.data;
          }
        })
        .catch((err) => {
          console.log("444");
        });
    },
    Video1() {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/media/Djlyzw0DzjowB198",
      })
        .then((result) => {
          //   console.log("result=2=>", result);
          if (result.data.message == "OK") {
            this.SearchIdOneShuju = result.data.data;
          }
        })
        .catch((err) => {
          console.log("444");
        });
    },
    Video2(id) {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/article/" + id + "/next",
      })
        .then((result) => {
          // console.log("result=3=>", result);
          if (result.data.code == "_200") {
            this.Video2husju = result.data.data.list;
          }
          // console.log(this.Video2husju);
        })
        .catch((err) => {
          console.log("444");
        });
    },
    Video3() {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/comments?resource_id=11469814&type=article&page=2",
      })
        .then((result) => {
          //   console.log("result=4=>", result);
          //   if (result.data.message == "OK") {
          //     this.SearchIdOneShuju = result.data.data;
          //   }
        })
        .catch((err) => {
          console.log("444");
        });
    },
    onClickLeft() {
      Toast("返回");
      this.$router.go(-1);
    },
    goDetail() {
      this.$router.push({ name: "Search" });
    },
  },
};
</script>
<style lang="less" scoped>
::v-deep .van-tabs__wrap {
  border-bottom: 1px solid rgb(202, 202, 202);
}
.video-box {
  width: 100%;
  margin: 0 auto;
  background-color: #ddd;
}
.auto-video {
  width: 100%;
  display: block;
}
.briefIntroduction {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  padding: 20px;
  border-bottom: 1px solid rgb(245, 245, 245);
  .kuang-one {
    width: 100%;
    height: 50px;
    font-size: 20px;
    font-weight: 700;
    line-height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .kuang-two {
    width: 100%;
    height: 20px;
    color: rgb(197, 197, 197);
    letter-spacing: 1px;
    line-height: 20px;
  }
  .kuang-three {
    width: 100%;
    height: calc(100% - 20px);
    padding: 10px 0;
    letter-spacing: 1px;
  }
  .kuang-four {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .text-img {
      width: 30%;
      height: 60px;
      font-size: 25px;
      line-height: 60px;
      text-align: center;
    }
  }
}
.briefIntroduction-one {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  padding: 20px;
  .briefIntroduction-text {
    width: 100px;
    height: 40px;
    line-height: 40px;
    font-size: 17px;
    font-weight: 550;
  }
  .briefIntroduction-kuang {
    width: 100%;
    height: 100%;
    .rei {
      width: 100%;
      height: 90px;
      padding: 10px 0;
      border-bottom: 1px solid rgb(245, 245, 245);
      .rei-img {
        float: left;
        width: 49%;
        height: 90px;
        border-radius: 10px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
      .rei-text {
        float: right;
        width: 49%;
        height: 90px;
        .text-one {
          width: 100%;
          height: 45px;
          font-size: 17px;
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .text-two {
          width: 100%;
          height: 20px;
          font-size: 12px;
          color: rgb(199, 199, 199);
          line-height: 20px;
        }
        .text-three {
          width: 100%;
          height: 25px;
          line-height: 25px;
          .text-three-img {
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
          .text-three-text {
            float: left;
            width: 75%;
            height: 25px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
.bbb1 {
  width: 100%;
  height: 500px;
  text-align: center;
  font-size: 25px;
  line-height: 500px;
}
.ipt {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: calc(100% - 40px);
  height: 40px;
  padding: 5px 20px;
  background-color: rgb(241, 241, 241);
  .ipt-kuang {
    width: 100%;
    height: 100%;
    position: relative;
    input {
      width: calc(70% - 10px);
      padding-left: 10px;
      height: 38px;
      border: 0;
      border-radius: 40px 0 0 40px;
    }
    button {
      width: 30%;
      height: 40px;
      position: absolute;
      bottom: 0px;
      right: 0px;
      background-color: rgb(209, 255, 251);
      border: 0;
      border-radius: 0 40px 40px 0;
    }
  }
}
.bbb2-kuan {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  padding: 20px;
  .bbb2-kuan-rei {
    width: 100%;
    height: 100%;
    padding: 10px 0;
    border-bottom: 1px solid rgb(240, 240, 240);

    .rei-one {
      width: 100%;
      height: 50px;
      .rei-img {
        float: left;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .rei-text {
        float: left;
        width: calc(70% - 10px);
        padding-left: 10px;
        height: 50px;
        font-size: 19px;
        line-height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .rei-two {
      width: calc(100% - 50px);
      height: calc(100% - 20px);
      padding: 10px 0 10px 50px;
      color: rgb(114, 114, 114);
      word-break: break-all;
      text-overflow: ellipsis;
      font-size: 15px;
    }
    .rei-three {
      width: 100%;
      height: 20px;
      line-height: 20px;
      text-align: right;
      color: rgb(202, 202, 202);
    }
  }
}
</style>