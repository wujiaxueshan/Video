<template>
  <div class="shopbag">
    <meta name="referrer" content="no-referrer" />
    <div class="gekai"></div>
    <van-swipe @change="onChange" :autoplay="3000">
      <van-swipe-item
        v-for="(item, index) in tushuju"
        :key="index"
        @click="shiyan(item.id)"
      >
        <img :src="item.cover" alt="" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/{{ tushujulength }}
        </div>
      </template>
    </van-swipe>
    <div class="works-text">作品</div>
    <div class="works-reinon">
      <div
        class="works-reinon-one"
        v-for="(items, index) in worksshuju"
        :key="index"
        @click="Jump(items.id, items.category_name)"
      >
        <div class="works-reinon-kuang">
          <div class="works-reinon-text">{{ items.category_name }}</div>
          <img :src="items.cover" alt="" />
        </div>
      </div>
      <div class="xiao"></div>
    </div>
    <!-- 搜索栏 -->
    <meta name="referrer" content="no-referrer" />
    <van-search
      v-model="value"
      shape="round"
      background="#fff"
      placeholder="请输入搜索关键词"
      @click="goDetail"
      disabled
      class="ding"
    ></van-search>
  </div>
</template>

<script>
export default {
  name: "Shopbag",
  data() {
    return {
      value: "",
      current: 0,
      tushuju: [],
      worksshuju: [],
      tushujulength: "0",
    };
  },
  created() {
    this.FindOne();
  },
  methods: {
    shiyan(e) {
      console.log(e);
    },
    Jump(id, text) {
      this.$router.push({ name: "ClassificationContent", params: { id } });
    },
    onChange(index) {
      this.current = index;
    },
    FindOne() {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/xpc/page/discovery",
      })
        .then((result) => {
          if (result.data.code == "_200") {
            this.tushuju = result.data.data.banners;
            this.tushujulength = result.data.data.banners.length;
            // console.log("result=1=>", result.data.data.categories);
            this.worksshuju = result.data.data.categories;
            // console.log(this.worksshuju);
          }
        })
        .catch((err) => {});
    },
    goDetail() {
      this.$router.push({ name: "Search" });
    },
  },
};
</script>
<style lang="less" scoped>
.ding{
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
}
.gekai{
  width: 100%;
  height: 52px;
  background-color: violet;
}
.tu {
  width: 100%;
  height: 200px;
  background-color: brown;
}
img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.xiao {
  width: 100%;
  height: 50px;
  clear: both;
  color: white;
  background-color: white;
}
.custom-indicator {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 2px 5px;
  font-size: 12px;
  color: white;
  background: rgba(24, 24, 24, 0.459);
}
.works-text {
  width: calc(100% - 40px);
  height: 50px;
  padding: 0 20px;
  font-size: 19px;
  line-height: 50px;
  font-weight: 900;
}
.works-reinon {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  padding: 10px 10px;
  .works-reinon-one {
    float: left;
    width: calc(50% - 10px);
    height: calc(120px - 10px);
    padding: 5px 5px;
    .works-reinon-kuang {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
      .works-reinon-text {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 16px;
        color: white;
      }
    }
  }
}
</style>