<template>
  <div class="search">
    <meta name="referrer" content="no-referrer" />
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="qiehuan"
      />
    </form>
    <div class="history">
      <div class="history-jilu">
        <div class="history-text">历史记录</div>
        <van-icon name="delete-o" class="history-textimg" @click="shangchu" />
      </div>
      <div class="history-jilu-shuju">
        <div>
          <div class="shuju" v-for="(tiem, index) in textshuju" :key="index">
            <div class="shuju-text" @click="shuruOne(index)">{{ tiem }}</div>
          </div>
        </div>
      </div>
      <div class="history-jilu">
        <div class="history-text">热门搜索关键词</div>
      </div>
      <div class="history-jilu-shuju-one">
        <div>
          <div
            class="shuju"
            v-for="(tiem, index) in textshujuTwo.list"
            :key="index"
          >
            <div class="shuju-text" @click="shuruTwo(index)">
              {{ tiem.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Search",
  data() {
    return {
      active: 2,
      value: "",
      textshuju: [],
      textshujuTwo: [],
      textshujuOne: true,
      value1: 0,
      option1: [
        { text: "最热门", value: 0 },
        { text: "最匹配", value: 1 },
        { text: "新发布", value: 2 },
      ],
    };
  },
  created() {
    this.show();
    this.SearchIdThree();
    var book = localStorage.getItem("book");
    //将book的json字符串转换为普通数组
    this.textshuju = JSON.parse(book);
  },
  methods: {
    DetailsPage(pid) {
      this.$router.push({ name: "User", params: { pid } });
    },
    shuruOne(e) {
      this.value = this.textshuju[e];
      this.onSearch(this.value);
    },
    shuruTwo(e) {
      this.value = this.textshujuTwo.list[e].name;
      this.onSearch(this.value);
    },
    shangchu() {
      this.textshuju = [];
    },
    show() {
      if (this.textshuju == "") {
        this.textshujuOne = false;
      } else {
        this.textshujuOne = true;
      }
    },
    qiehuan() {
      this.value = "";
      this.show();
      this.qiehuanOne = true;
      this.qiehuanTwo = false;
    },
    onSearch(val) {
      if (val == "") {
        Toast("不能为空！！！");
      } else {
        this.textshujuOne = true;
        // for (let i = 0; i < this.textshuju.length; i++) {
        //   if (this.textshuju[i] == val) {
        //     this.textshuju.splice(i, 1);
        //   }
        // }
        // this.textshuju.unshift(val);
        // if (this.textshuju.length >= 9) {
        //   this.textshuju.pop();
        // }
        // var book = this.textshuju;
        // var bookJson = JSON.stringify(book);
        // localStorage.setItem("book", bookJson);
        this.$router.push({ name: "Searchone", params: { val } });
      }
    },
    SearchIdThree() {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/search/recommend_kws",
      })
        .then((result) => {
          if (result.data.message == "OK") {
            this.textshujuTwo = result.data.data;
          }
        })
        .catch((err) => {});
    },
    onCancel() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="less" scoped>
::v-deep .van-dropdown-menu__bar {
  height: 100%;
  box-shadow: 0 0 0 0;
}
.history {
  width: calc(100% - 40px);
  height: calc(757px - 40px);
  padding: 20px;
  .history-jilu {
    width: 100%;
    height: 30px;
    .history-text {
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      float: left;
    }
    .history-textimg {
      height: 30px;
      line-height: 30px;
      font-size: 19px;
      float: right;
    }
  }
  .history-jilu-shuju {
    width: 100%;
    height: 100px;
    .shuju {
      width: calc(25% - 10px);
      height: calc(50px - 20px);
      float: left;
      padding: 10px 5px;
      .shuju-text {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        background-color: rgb(235, 235, 235);
      }
    }
  }
  .history-jilu-shuju-one {
    width: 100%;
    height: 500px;
    .shuju {
      width: calc(25% - 10px);
      height: calc(50px - 20px);
      float: left;
      padding: 10px 5px;
      .shuju-text {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        background-color: rgb(235, 235, 235);
      }
    }
  }
}
.paixu {
  width: calc(100% - 40px);
  height: 40px;
  padding: 0 20px;
  .paixu-right {
    width: 30%;
    height: 100%;
    background-color: brown;
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