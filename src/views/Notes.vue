<template>
  <div class="notes">
    <!-- 搜索栏 -->
    <meta name="referrer" content="no-referrer" />
    <div class="notes-one">
      <div class="notes-two">
        <div class="notes-three">
          <!-- 手记遍历 -->
          <!-- <div
            class="notes-four"
            v-for="(item, index) in product2"
            :key="index"
            :class="[index % 2 == 0 ? 'left' : 'right']"
            @click="DetailsPage(item.id)"
          >
            <img class="notes-img" :src="item.images[0]" alt="" />
            <div class="notes-text-one">
              {{ item.title }}
            </div>
            <div class="notes-text-two">
              <div class="notes-img-one">
                <img class="notes-img-two" :src="item.user.avatar" alt="" />
              </div>
              <div class="notes-text-three">
                {{ item.user.username }}
              </div>
            </div>
          </div> -->
          <waterfall
            :col="col"
            :width="itemWidth"
            :gutterWidth="gutterWidth"
            :data="product2"
          >
            <template>
              <div
            class="notes-four"
            v-for="(item, index) in product2"
            :key="index"
            @click="DetailsPage(item.id)"
          >
            <img class="notes-img" :src="item.images[0]" alt="" />
            <div class="notes-text-one">
              {{ item.title }}
            </div>
            <div class="notes-text-two">
              <div class="notes-img-one">
                <img class="notes-img-two" :src="item.user.avatar" alt="" />
              </div>
              <div class="notes-text-three">
                {{ item.user.username }}
              </div>
            </div>
          </div>
            </template>
          </waterfall>
          <!-- 加载 -->

          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="clear"></div>
          </van-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Notes",
  data() {
    return {
      value: "",
      product: [],
      product2: [],
      list: [],
      shu: 0,
      col: 2,
      loading: false,
      finished: false,
    };
  },
  computed: {
    itemWidth() {
      return 350 * 0.5 * (document.documentElement.clientWidth / 375) // #rem布局 计算宽度
    },
    gutterWidth() {
      return 9 * 0.5 * (document.documentElement.clientWidth / 375) //#rem布局 计算x轴方向margin(y轴方向的margin自定义在css中即可)
    },
  },
  created() {
    this.getHotProduct(this.shu);
  },
  methods: {
    //加载获取数据
    onLoad() {
      this.shu++;
      this.axios({
        //请求类型
        method: "get",
        //请求路径
        url: "https://apis.netstart.cn/xpc/notes",
        //如果get请求, 请求参数需要写在params字段中
        params: {
          page: this.shu,
        },
      })
        .then((result) => {
          if (result.data.code === "_200") {
            this.product = result.data.data.list;

            for (let i = 0; i < this.product.length; i++) {
              this.product2.push(this.product[i]);
            }

            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成
            let sss = this.product2.length + 1;
            if (this.product2[sss]) {
              this.finished = true;
            }
          }
        })
        .catch((err) => {});
    },
    //获取数据
    getHotProduct() {
      //发起请求
      this.axios({
        //请求类型
        method: "get",
        //请求路径
        url: "https://apis.netstart.cn/xpc/notes",
        //如果get请求, 请求参数需要写在params字段中
        params: {
          page: this.shu,
        },
      })
        .then((result) => {
          if (result.data.code === "_200") {
            this.product = result.data.data.list;

            for (let i = 0; i < this.product.length; i++) {
              this.product2.push(this.product[i]);
            }
          }
        })
        .catch((err) => {});
    },
    //查看笔记详情页面
    DetailsPage(id) {
      this.$router.push({ name: "Prodetail", params: { id } });
    },
  },
};
</script>
<style lang="less" scoped>
html,
body {
  overflow-x: hidden;
}
.left {
  float: left;
}
.right {
  float: right;
}
.clear {
  width: 100%;
  height: 2px;
  clear: both;
}
.notes {
  position: fixed;
  top: 0;
  bottom: 50px;
  right: 0;
  left: 0;
  .notes-one {
    display: flex;
    height: 100%;
    .notes-two {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      padding-left: 10px;
      padding-right: 10px;
      .notes-three {
        width: 100%;
        .notes-four {
          width: calc(100% - 10px);
          break-inside: avoid;
          position: relative;
          margin: 5px 0;
          padding: 5px;
          border-radius: 10px 10px 10px 10px;
          background-color: rgb(240, 240, 240);
          .notes-img {
            margin-bottom: 10px;
          }
          img {
            border-radius: 10px 10px 0 0;
            width: 100%;
          }
          .notes-text-one {
            color: black;
            font-size: 15px;
            padding-left: 5px;
            margin-bottom: 5px;
          }
          .notes-text-two {
            width: 100%;
            height: 30px;
            margin-bottom: 5px;
            .notes-img-one {
              float: left;
              width: 30px;
              height: 30px;
              img {
                border-radius: 30px;
              }
            }
            .notes-text-three {
              float: left;
              width: calc(100% - 40px);
              height: 30px;
              color: rgb(150, 150, 150);
              line-height: 30px;
              padding-left: 10px;
            }
          }
        }
      }
    }
  }
}
// .notes-one {
//   column-count: 2;
//   column-gap: 10px;
//   display: flex;
//   height: calc(100% - 50px);
//   background-color: tomato;
// }
</style>