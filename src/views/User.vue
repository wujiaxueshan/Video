<template>
  <div class="user">
    <meta name="referrer" content="no-referrer" />
    <div class="user-one">
      <img
        :src="[
          Usershuju.app_background === '' ? imges : Usershuju.app_background,
        ]"
        alt=""
      />
      <div class="user-two">
        <div class="user-kuang">
          <div class="text-img-one" @click="onCancel">
            <van-icon name="arrow-left" color="#fff" />
          </div>
          <div class="text-img-two" @click="showShare = true">
            <van-icon name="ellipsis" color="#fff" />
          </div>
          <van-share-sheet
            v-model="showShare"
            title="立即分享给好友"
            :options="options"
            @select="onSelect"
          />
        </div>
        <div class="imges-one">
          <div class="imges">
            <img :src="Usershuju.avatar" alt="" />
          </div>
        </div>
        <div class="text-one">{{ Usershuju.username }}</div>
        <div class="text-two">
          <!-- {{ Usershuju.occupation == "" ? "" : Usershuju.occupation }} ・
          {{
            Usershuju.location.province.name == ""
              ? ""
              : Usershuju.location.province.name
          }} -->
        </div>
        <div class="text-three">
          <!-- {{
            Usershuju.verify_description == ""
              ? ""
              : Usershuju.verify_description
          }} -->
        </div>
        <div class="user-kuang-one">
          <div class="user-kuang-two">
            <div class="kuang1" @click="UserIdOne(id)">
              <div class="kuang-text">{{ Usershuju.count.count_followee }}</div>
              <div class="kuang-text">关注</div>
            </div>
            <div class="kuang1" @click="UserIdTwo(id)">
              <div class="kuang-text">{{ Usershuju.count.count_follower }}</div>
              <div class="kuang-text">粉丝</div>
            </div>
            <div class="kuang1">
              <div class="kuang-text" @click="tishi">
                {{ Usershuju.count.count_popularity }}
              </div>
              <div class="kuang-text">人气</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <van-tabs v-model="active" swipeable animated>
        <van-tab
          v-for="(item, index) in homepage"
          :key="index"
          :title="item.usename"
        >
          <div class="fenlei" :style="item.styleObject">
            {{ item.text }}
            <div v-show="item.isHas">
              <div class="gekai"></div>
              <div v-if="item.name === 'works'">
                <div
                  class="works"
                  v-for="(item, index) in homepage[0].shuju.list"
                  :key="index"
                >
                  <div
                    class="works-One"
                    @click.capture="yanshi(item.resource.id)"
                  >
                    <img :src="item.resource.share_info.image" alt="" />
                  </div>
                  <div class="works-Two">
                    <div
                      class="works-text-One"
                      @click.capture="yanshi(item.resource.id)"
                    >
                      {{ item.resource.share_info.title }}
                    </div>
                    <div class="works-text-Two">
                      <div
                        class="text-One"
                        @click.capture="yanshi(item.resource.id)"
                      >
                        {{ homepage[0].shijianshuju[index] }}
                      </div>
                      <div class="text-Two">
                        {{ item.resource.count.count_like }}
                        喜欢 ・
                        {{ item.resource.count.count_view }}
                        观看
                        <van-icon
                          class="right"
                          name="weapp-nav"
                          @click="showShare = true"
                        />
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
                  <div class="gekai-one"></div>
                </van-list>
              </div>
              <div v-if="item.name === 'album'">
                <div
                  class="album"
                  v-for="(item, index) in homepage[1].shuju.list"
                  :key="index"
                >
                  <div class="gekai"></div>
                  <div class="album-kuang">
                    <div class="album-kuang-img">
                      <img :src="item.cover_url" alt="" />
                    </div>
                    <div class="album-kuang-text">
                      <div class="album-kuang-text-one">
                        {{ item.title }}
                      </div>
                      <div class="album-kuang-text-two">
                        作品 {{ item.count.count_article }} ・ 浏览
                        {{ item.count.count_liked }} ・ 赞
                        {{ item.count.count_viewed }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="item.name === 'like'">
                <div
                  class="like"
                  v-for="(item, index) in homepage[2].shuju.list"
                  :key="index"
                >
                  <div class="like-kuang">
                    <div class="like-kuang-one">
                      <div
                        class="like-imges"
                        @click="DetailsPage(item.resource.userid)"
                      >
                        <img
                          :src="item.resource.author.userinfo.avatar"
                          alt=""
                        />
                      </div>
                      <div
                        class="like-text"
                        @click="DetailsPage(item.resource.userid)"
                      >
                        <span class="span-one"
                          >{{ item.resource.author.userinfo.username }} </span
                        ><span class="span-two">
                          和其他
                          {{ item.resource.team_user_count }}
                          人</span
                        >
                      </div>
                      <div class="like-right">
                        <van-icon
                          name="share-o"
                          class="like-share-o"
                          @click="showShare = true"
                        />
                      </div>
                    </div>
                    <div class="like-kuang-text">
                      {{ item.resource.title }}
                    </div>
                    <div
                      class="like-kuang-two"
                      @click.capture="yanshi(item.resource.id)"
                    >
                      <img :src="item.resource.cover" alt="" />
                    </div>
                    <div class="like-kuang-three">
                      <div
                        class="kuangge"
                        @click.capture="yanshi(item.resource.id)"
                      >
                        <div class="ge-one">
                          <van-icon name="chat-o" class="ge-one-van-icon" />
                        </div>
                        <div class="ge-two"></div>
                      </div>
                      <div class="kuangge" @click="qiehuan(index)">
                        <div class="ge-one">
                          <van-icon name="good-job-o" class="ge-one-van-icon" />
                        </div>
                        <div class="ge-two">
                          {{ item.resource.count.count_like }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { Toast } from "vant";
export default {
  name: "User",
  data() {
    return {
      id: "",
      imgIcon: "good-job-o",
      Usershuju: [],
      active: 0,
      activeOne: 0,
      showShare: false,
      shu: 1,
      loading: false,
      finished: false,
      shuzhu: [],
      imges:
        "https://img0.baidu.com/it/u=4152745790,1630191381&fm=253&fmt=auto&app=138&f=JPEG?w=282&h=500",
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
      homepage: [
        {
          name: "works",
          usename: "作品",
          shuju: [],
          shijianshuju: [],
          text: "",
          isHas: "",
          styleObject: {
            width: "100%",
            height: "100%",
          },
        },
        {
          name: "album",
          usename: "专辑",
          text: "",
          shuju: [],
          isHas: "",
          styleObject: {
            width: "100%",
            height: "100%",
          },
        },
        {
          name: "like",
          usename: "喜欢",
          shuju: [],
          text: "",
          isHas: "",
          styleObject: {
            width: "100%",
            height: "100%",
          },
        },
      ],
    };
  },

  created() {
    this.id = this.$route.params.pid;
    this.UserId(this.id);
    this.UserIdworks(this.id);
    this.UserIdalbum(this.id);
    this.UserIdlike(this.id);
  },
  methods: {
    DetailsPage(pid) {
      console.log(pid);
      this.Usershuju = [];
      this.homepage[0].shuju = [];
      this.homepage[0].shijianshuju = [];
      this.homepage[1].shuju = [];
      this.homepage[2].shuju = [];
      this.id = pid;
      this.UserId(this.id);
      this.UserIdworks(this.id);
      this.UserIdalbum(this.id);
      this.UserIdlike(this.id);
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
    },
    yanshi(id) {
      this.$router.push({ name: "Video", params: { id } });
    },
    qiehuan(i) {
      for (let j = 0; j < this.shuzhu.length; j++) {
        if (this.shuzhu[j] == i) {
          this.shuzhu.splice(j, 1);
          this.homepage[2].shuju.list[i].resource.count.count_like--;
          Toast({ type: "primary", message: "取消成功 ！！" });
          // console.log(this.shuzhu);
          return;
        }
      }
      this.shuzhu.push(i);
      this.homepage[2].shuju.list[i].resource.count.count_like++;
      Toast({ type: "primary", message: "点赞成功 ！！" });
      // console.log(this.shuzhu);
    },
    onLoad() {
      this.shu++;
      this.axios({
        method: "get",
        url:
          "https://apis.netstart.cn/xpc/user/" +
          this.id +
          "/articles?type=public&order=view&is_hide_in_space=0&return_struct_type=user_home&page=" +
          this.shu,
      })
        .then((result) => {
          if (result.data.code == "_200") {
            let cunchu = result.data.data.list;
            for (let i = 0; i < cunchu.length; i++) {
              this.homepage[0].shuju.list.push(cunchu[i]);
            }
            for (let i = 0; i < this.homepage[0].shuju.list.length; i++) {
              let date = this.homepage[0].shuju.list[i].resource.publish_time;
              date = new Date(date * 1000);
              let year = date.getFullYear(); // 年
              let month = date.getMonth() + 1; // 月, 月份是从0开始算的 0 - 11
              let data = date.getDate(); // 日

              let hour = date.getHours(); // 时
              let minute = date.getMinutes(); // 分
              let second = date.getSeconds(); // 秒
              // 优化一下，一般在显示 月 日 时分秒的时候我们习惯按照两位的方式去显示；如果数字是一位的我们补齐一个0即可
              month = month < 10 ? "0" + month : month;
              data = data < 10 ? "0" + data : data;
              hour = hour < 10 ? "0" + hour : hour;
              minute = minute < 10 ? "0" + minute : minute;
              second = second < 10 ? "0" + second : second;
              let munder =
                year +
                "-" +
                month +
                "-" +
                data +
                "    " +
                hour +
                ":" +
                minute +
                ":" +
                second;
              this.homepage[0].shijianshuju.push(munder);
            }
            // 加载状态结束
            this.loading = false;
            //   数据全部加载完成
            let sss = cunchu.length + 1;
            if (sss == 1) {
              this.finished = true;
            }
          }
        })
        .catch((err) => {});
    },
    UserIdOne(id) {
      this.$router.push({ name: "Attention", params: { id } });
    },
    UserIdTwo(id) {
      this.$router.push({ name: "Fans", params: { id } });
    },
    tishi() {
      Dialog.alert({
        title: "人气",
        message: this.Usershuju.count.count_popularity,
        theme: "round-button",
      }).then(() => {
        // on close
      });
    },
    onSelect(option) {
      Toast(option.name);
      // console.log(this.showShare);
      this.showShare = false;
      // console.log(this.showShare);
    },
    onCancel() {
      this.$router.go(-1);
    },
    UserId(id) {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/user/" + id,
      })
        .then((result) => {
          if (result.data.code == "_200") {
            this.Usershuju = result.data.data;
          }

          // console.log('this.Usershuju==>',this.Usershuju);
        })
        .catch((err) => {
          console.log("err===>", err);
        });
    },
    UserIdworks(id) {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/user/" + id + "/articles",
      })
        .then((result) => {
          if (result.data.code == "_200") {
            this.homepage[0].shuju = result.data.data;
            if (this.homepage[0].shuju.list == "") {
              this.homepage[0].text = "还没有上传作品";
              this.homepage[0].styleObject.height = "420px";
              this.homepage[0].styleObject.textAlign = "center";
              this.homepage[0].styleObject.lineHeight =
                this.homepage[0].styleObject.height;
              this.homepage[0].styleObject.color = "lightgrey";
              this.homepage[0].styleObject.fontSize = "19px";
              this.homepage[0].isHas = false;
            } else {
              this.homepage[0].isHas = true;
              for (let i = 0; i < this.homepage[0].shuju.list.length; i++) {
                let date = this.homepage[0].shuju.list[i].resource.publish_time;
                date = new Date(date * 1000);
                let year = date.getFullYear(); // 年
                let month = date.getMonth() + 1; // 月, 月份是从0开始算的 0 - 11
                let data = date.getDate(); // 日

                let hour = date.getHours(); // 时
                let minute = date.getMinutes(); // 分
                let second = date.getSeconds(); // 秒
                // 优化一下，一般在显示 月 日 时分秒的时候我们习惯按照两位的方式去显示；如果数字是一位的我们补齐一个0即可
                month = month < 10 ? "0" + month : month;
                date = date < 10 ? "0" + date : date;
                hour = hour < 10 ? "0" + hour : hour;
                minute = minute < 10 ? "0" + minute : minute;
                second = second < 10 ? "0" + second : second;
                let munder =
                  year +
                  "-" +
                  month +
                  "-" +
                  data +
                  "    " +
                  hour +
                  ":" +
                  minute +
                  ":" +
                  second;
                this.homepage[0].shijianshuju.push(munder);
              }
            }
          }
        })
        .catch((err) => {});
    },
    UserIdalbum(id) {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/user/" + id + "/collections",
      })
        .then((result) => {
          if (result.data.code == "_200") {
            this.homepage[1].shuju = result.data.data;
            if (this.homepage[1].shuju.list == "") {
              this.homepage[1].text = "还没有创建专辑";
              this.homepage[1].styleObject.height = "420px";
              this.homepage[1].styleObject.textAlign = "center";
              this.homepage[1].styleObject.lineHeight =
                this.homepage[1].styleObject.height;
              this.homepage[1].styleObject.color = "lightgrey";
              this.homepage[1].styleObject.fontSize = "19px";
              this.homepage[1].isHas = false;
            } else {
              this.homepage[1].isHas = true;
              // console.log("this.homepage[1].shuju==>", this.homepage[1].shuju);
            }
          }
        })
        .catch((err) => {});
    },
    UserIdlike(id) {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/user/" + id + "/articles-approved",
      })
        .then((result) => {
          if (result.data.code == "_200") {
            this.homepage[2].shuju = result.data.data;
            if (this.homepage[2].shuju.list == "") {
              this.homepage[2].text = "还没有喜欢的作品";
              this.homepage[2].styleObject.height = "420px";
              this.homepage[2].styleObject.textAlign = "center";
              this.homepage[2].styleObject.lineHeight =
                this.homepage[2].styleObject.height;
              this.homepage[2].styleObject.fontSize = "19px";
              this.homepage[2].styleObject.color = "lightgrey";
              this.homepage[2].isHas = false;
            } else {
              this.homepage[2].isHas = true;
            }
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep .van-icon-arrow-left:before {
  font-size: 30px;
}
::v-deep .van-icon-ellipsis:before {
  font-size: 30px;
}
::v-deep .van-icon-weapp-nav:before {
  height: 25px;
  width: 25px;
  text-align: center;
  line-height: 25px;
}
.user-one {
  width: 100%;
  height: 358px;
  position: relative;
  img {
    width: 100%;
    height: 358px;
  }
  .user-two {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0px;
    left: 0px;
    .user-kuang {
      width: 100%;
      height: 15%;
      .text-img-one {
        float: left;
        text-align: center;
        line-height: 70px;
        width: 15%;
        height: 100%;
      }
      .text-img-two {
        float: right;
        text-align: center;
        line-height: 70px;
        width: 15%;
        height: 100%;
      }
    }
    .imges-one {
      width: calc(100%-70px);
      height: 80px;
      padding: 35px;
      .imges {
        width: 76px;
        height: 76px;
        border-radius: 80px;
        padding: 2px;
        background-color: white;
        img {
          width: 76px;
          height: 76px;
          border-radius: 80px;
        }
      }
    }
    .text-one {
      color: white;
      font-size: 20px;
      padding-left: 25px;
      margin-bottom: 5px;
    }
    .text-two {
      color: rgb(211, 211, 211);
      font-size: 11px;
      padding-left: 25px;
      margin-bottom: 5px;
    }
    .text-three {
      color: rgb(212, 212, 212);
      font-size: 12px;
      padding-left: 25px;
      margin-bottom: 5px;
    }
    .user-kuang-one {
      height: 40px;
      padding: 0 0 0 25px;
      .user-kuang-two {
        width: 210px;
        height: 100%;
        .kuang1 {
          width: 70px;
          height: 100%;
          float: left;
          color: white;
          .kuang-text {
            width: 100%;
            height: 20px;
            line-height: 30px;
            text-align: center;
          }
        }
      }
    }
  }
}
.right {
  float: right;
}
hr {
  clear: both;
}
.gekai-one {
  width: 100%;
  height: 10px;
}
.fenlei {
  width: 100%;
  height: 100%;
  .gekai {
    width: 100%;
    height: 10px;
    background-color: rgb(241, 241, 241);
  }
  .works {
    width: calc(100% - 40px);
    height: calc(120px - 20px);
    padding: 10px 20px;
    border-bottom: 1px solid rgb(245, 245, 245);
    .works-One {
      float: left;
      width: 40%;
      height: 100%;
      border-radius: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .works-Two {
      float: right;
      width: calc(60% - 20px);
      height: calc(100% - 10px);
      padding: 5px 10px;
      .works-text-One {
        width: 100%;
        height: 50%;
        font-size: 17px;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .works-text-Two {
        width: 100%;
        height: 50%;
        .text-One {
          width: 100%;
          height: 50%;
          color: rgb(196, 196, 196);
          line-height: 25px;
        }
        .text-Two {
          width: 100%;
          height: 50%;
          line-height: 25px;
          color: rgb(143, 143, 143);
        }
      }
    }
  }
  .album {
    width: 100%;
    height: 100%;
    .album-kuang {
      width: calc(100% - 40px);
      height: calc(250px - 20px);
      padding: 10px 20px;
      background-color: rgb(255, 255, 255);
      .album-kuang-img {
        width: 100%;
        height: 180px;
        border-radius: 10px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
      .album-kuang-text {
        width: 100%;
        height: 50px;
        .album-kuang-text-one {
          width: 100%;
          height: 30px;
          line-height: 30px;
          font-size: 19px;
        }
        .album-kuang-text-two {
          width: 100%;
          height: 20px;
          line-height: 20px;
          color: rgb(168, 168, 168);
        }
      }
    }
  }
  .like {
    width: calc(100% - 24px);
    height: calc(100% - 14px);
    padding: 7px 12px;
    background-color: rgb(241, 241, 241);
    .like-kuang {
      width: 100%;
      height: 300px;
      background-color: white;
      border-radius: 10px;
      .like-kuang-one {
        width: calc(100% - 20px);
        height: calc(60px - 10px);
        padding: 0 10px;
        padding-top: 10px;
        .like-imges {
          float: left;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          img {
            width: 100%;
            border-radius: 50%;
          }
        }
        .like-text {
          float: left;
          width: calc(100% - 100px);
          height: 50px;
          line-height: 50px;
          .span-one {
            float: left;
            width: 70%;
            font-size: 15px;
            margin-left: 10px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .span-two {
            float: left;
            color: rgb(189, 189, 189);
          }
        }
        .like-right {
          float: left;
          width: 50px;
          height: 50px;
          .like-share-o {
            font-size: 20px;
            line-height: 50px;
            margin-left: 20px;
          }
        }
      }
      .like-kuang-text {
        width: calc(100% - 20px);
        padding: 0 10px;
        height: 30px;
        font-size: 14px;
        line-height: 30px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .like-kuang-two {
        width: 100%;
        height: 170px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .like-kuang-three {
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
}
</style>