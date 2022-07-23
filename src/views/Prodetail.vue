<template>
  <div class="prodetail">
    <meta name="referrer" content="no-referrer" />
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onCancel"
      fixed
    >
      <template #right>
        <van-icon name="share-o" size="18" @click="showShare = true" />
        <van-share-sheet
          v-model="showShare"
          title="立即分享给好友"
          :options="options"
          @select="onSelect"
        />
      </template>
    </van-nav-bar>
    <div class="dao">1</div>
    <div class="prodetail-dao" @click="DetailsPage(pid)">
      <div class="prodetail-one left">
        <img :src="productDetail2.avatar" alt="" />
      </div>
      <div class="prodetail-text left">
        <div class="text1">{{ productDetail2.username }}</div>
        <div class="text2">{{ productDetail.addtime }}</div>
      </div>
    </div>
    <van-swipe :autoplay="3000" class="banner-box">
      <van-swipe-item
        v-for="(image, index) in productDetail.images"
        :key="index"
        class="banner-box-one"
      >
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="text-kuan">
      <div class="text-one">{{ productDetail.title }}</div>
      <div class="text-two">{{ productDetail.content }}</div>
    </div>
    <div class="comment">
      <div class="comment-tou">{{ producttext.length }}<span>评论</span></div>
      <div
        class="comment-kuang"
        v-for="(itmes, index) in producttext"
        :key="index"
      >
        <div class="imgs-ke left" @click="DetailsPage(itmes.userId)">
          <img :src="itmes.userDetail.avatar_big" alt=""/>
        </div>
        <div class="xiaokuang right">
          <div class="shang">
            {{ itmes.userDetail.nickname }}
            <div class="right" @click="show = true">
              <van-icon name="ellipsis" />
              <van-action-sheet
                v-model="show"
                :actions="actions"
                @select="onSelectOne"
              />
            </div>
          </div>
          <div class="zhong">{{ itmes.contentText }}</div>
          <div class="xia">
            {{ createTimeUnix[index] }}
            <div class="inges right" @click="collectOne(index)">
              <img class="imgsOne" src="../assets/dz-one.png" alt="" />
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>

    <div class="Inputbox">
      <div class="Inputbox-one left">
        <input type="text"  class="ipt" placeholder="请输入" />
      </div>
      <div class="fabulous right">
        <button @click="btn">发送</button>
      </div>
    </div>
    <div class="yinc"></div>
  </div>
</template>

<script>
import Navi from "../components/Navi.vue";
import { Toast } from "vant";
export default {
  name: "Prodetail",
  data() {
    return {
      count: 1,
      id: "",
      pid:'',
      productDetail: [],
      productDetail2: [],
      producttext: [],
      createTimeUnix: [],
      showShare: false,
      show: false,
      actions: [{ name: "复制" }, { name: "举报" }],
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
    };
  },
  components: {
    Navi,
  },

  created() {
    this.id = this.$route.params.id;
    this.getProductDetailByPid(this.id);
    this.getProductDetailByPid2(this.id);
  },

  methods: {
    DetailsPage(pid) {
      // console.log(pid);
      this.$router.push({ name: "User" , params: { pid } });
    },
    collectOne(index) {
      if (this.activeInde) {
        let zimg = document.querySelectorAll(".imgsOne")[index];
        zimg.src = require("../assets/dz-two.png");
        this.activeInde = false;
        Toast({ type: "primary", message: "点赞成功 ！！" });
        return;
      } else {
        let zimg = document.querySelectorAll(".imgsOne")[index];
        zimg.src = require("../assets/dz-one.png");
        this.activeInde = true;
        Toast({ type: "primary", message: "取消成功 ！！" });
        return;
      }
    },
    onSelectOne(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      Toast(item.name + "成功");
    },
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    onCancel() {
      this.$router.go(-1);
    },
    //根据id获取详情数据
    getProductDetailByPid(id) {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/note/" + id,
      })
        .then((result) => {
          if (result.data.code === "_200") {
            this.productDetail = result.data.data;
            this.productDetail2 = this.productDetail.user;
            this.pid = this.productDetail2.id;
          }
        })
        .catch((err) => {});
    },
    getProductDetailByPid2(id) {
      this.axios({
        method: "get",
        // https://apis.netstart.cn/xpc/note/5849/comment?offset=0&limit_size=10
        url: "https://apis.netstart.cn/xpc/note/" + id + "/comment",
        params: {
          offset: 0,
          limit_size: 10,
        },
      })
        .then((result2) => {
          if (result2.data.code === "SUCCESS") {
            this.producttext = result2.data.data;
          }
          // console.log('this.producttext==>',this.producttext);
          for (let i = 0; i < this.producttext.length; i++) {
            let date = this.producttext[i].createTimeUnix;
            date = new Date(date);
            let year = date.getFullYear(); // 年
            let month = date.getMonth(); // 月, 月份是从0开始算的 0 - 11
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
              "/" +
              month +
              "/" +
              data +
              "    " +
              hour +
              ":" +
              minute +
              ":" +
              second;
            this.createTimeUnix.push(munder);
          }
        })
        .catch((err) => {});
    },
    btn() {
      let myDate = new Date();
      let Year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
      let Month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      let Datetwo = myDate.getDate(); //获取当前日(1-31)
      let mytime = myDate.toLocaleTimeString(); //获取当前时间
      let datadata = Year + "/" + Month + "/" + Datetwo + "    " + mytime;
      let ipt = document.querySelector(".ipt");
      let value = ipt.value;
      let jiashuju = {
        contentText: "( *・ω・)✄╰ひ╯",
        createTime: "2022-03-18T15:01:21.000+0000",
        createTimeUnix: 1647615681000,
        dislikeCount: 0,
        id: 1048,
        likeCount: 0,
        moduleCode: "default",
        parentId: 1047,
        rootId: 1047,
        siteCode: "note",
        status: 1,
        top: 0,
        topicCode: "5962",
        userDetail: {
          area: "",
          avatar_big:
            "https://oss-xpc0.xpccdn.com/passport/avatar/12651579/2022/3/62349fa1cfdea.jpg",
          avatar_middle:
            "https://oss-xpc0.xpccdn.com/passport/avatar/12651579/2022/3/62349fa1cfdea.jpg",
          avatar_small:
            "https://oss-xpc0.xpccdn.com/passport/avatar/12651579/2022/3/62349fa1cfdea.jpg",
          badge: 0,
          badge_from: "common",
          birthday: "0",
          city: "",
          country: "",
          created_date: null,
          email_validate: null,
          exist: true,
          id: "12651579",
          id_validate: null,
          if_set_password: false,
          input_email: null,
          input_phone: "18744937719",
          is_freelancer: false,
          location: null,
          mobile_international_code: "+86",
          mobile_validate: 1,
          nationality: null,
          nickname: "Eason",
          profile: "",
          province: "",
          realname: null,
          realnameIdNumber: null,
          realnameStatus: 0,
          realnameType: null,
          salt: null,
          school: "",
          status: 0,
          user_email: null,
          user_group: null,
          user_groups: Array(1),
          user_id_number: null,
          user_id_type: null,
          user_name: "_user_12651579",
          user_password: null,
          user_phone: "+86-18744937719",
          user_real_name: null,
          user_sex: 0,
          verifyIdCardBackSide: null,
          verifyIdCardFrontSide: null,
          verifyLicense: null,
          verifyName: null,
          vip_end_time: null,
          vip_flag: 0,
          vip_next_renew_time: null,
          vip_package_type: null,
          vip_start_time: null,
          vip_subscribe: null,
          vip_type: 0,
        },
        userId: 12651579,
      };
      jiashuju.contentText = value;
      if (ipt.value === "") {
        return;
      }
      this.producttext.unshift(jiashuju);
      this.createTimeUnix.unshift(datadata);
      ipt.value = "";
    },
  },
};
</script>

<style lang="less" scoped>
.left {
  float: left;
}
.right {
  float: right;
}
.van-nav-bar {
  background-color: #fff;
}
::v-deep .van-icon {
  color: #000;
}
::v-deep .van-nav-bar__text {
  color: #000;
}
.dao {
  width: 100%;
  height: 49px;
}
img {
  width: 100%;
}
::v-deep .van-swipe__track {
  align-items: center;
}
.prodetail-dao {
  width: 100%;
  height: 60px;
  .prodetail-one {
    width: 44px;
    height: 44px;
    margin-top: 8px;
    margin-left: 20px;
    img {
      width: 44px;
      height: 44px;
      border-radius: 50px;
    }
  }
  .prodetail-text {
    width: 250px;
    height: 38px;
    margin-top: 10px;
    margin-left: 10px;
    .text1 {
      font-size: 17px;
      color: rgb(92, 92, 92);
    }
    .text2 {
      margin-top: 2px;
      font-size: 12px;
      color: rgb(92, 92, 92);
    }
  }
}
.text-kuan {
  width: calc(100%-40px);
  // height: 70px;
  padding: 10px 20px;
  border-bottom: 10px solid rgb(218, 218, 218);
  .text-one {
    font-size: 20px;
    margin: 5px 0;
  }
  .text-two {
    color: rgb(136, 136, 136);
    font-size: 15px;
    margin: 5px 0;
  }
}
.comment {
  width: 100%;
  height: 100%;
  .comment-tou {
    width: calc(100% - 15px);
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    font-size: 15px;
    span {
      margin-left: 5px;
    }
  }
  .comment-kuang {
    width: 100%;
    height: 100%;
    .imgs-ke {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      margin-left: 10px;
      margin-top: 10px;
      img {
        width: 100%;
        border-radius: 50px;
      }
    }
    .xiaokuang {
      width: calc(100% - 80px);
      height: 100%;
      padding: 0 10px;
      .shang {
        width: 100%;
        font-size: 16px;
        margin: 10px 0;
      }
      .zhong {
        width: 100%;
        margin: 10px 0;
        font-size: 13px;
      }
      .xia {
        width: 100%;
        height: 17px;
        line-height: 17px;
        margin: 5px 0;
        .inges {
          width: 18px;
          height: 18px;
          img {
            width: 100%;
          }
        }
      }
    }
    hr {
      clear: both;
    }
  }
}
.Inputbox {
  width: calc(100% - 20px);
  height: calc(60px - 22px);
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid rgb(218, 218, 218);
  background-color: white;
  padding: 11px 10px;
  .Inputbox-one {
    width: 80%;
    height: 35px;
    input {
      padding-left: 10px;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      border: 0;
      cursor: pointer;
      background-color: rgb(216, 216, 216);
    }
  }
  .fabulous {
    width: 40px;
    height: 40px;
    text-align: center;
    button {
      width: 100%;
      height: 100%;
      border: 0;
      background-color: white;
    }
  }
}
.yinc {
  width: 100%;
  height: 60px;
}
</style>