<template>
  <div class="main">
    <meta name="referrer" content="no-referrer" />
    <div>
      <router-view></router-view>
    </div>
    <van-tabbar v-model="activeOne" active-color="red" route>
      <van-tabbar-item
        v-for="(item, index) in textData"
        :key="index"
        :to="{ name: item.usename }"
      >
        <span>{{ item.tiele }}</span>
        <template #icon="props">
          <img :src="props.active ? item.inactive : item.activeIcon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      onename: "Home",
      value: "",
      activeOne: 0,
      textData: [
        {
          tiele: "首页",
          usename: "Home",
          activeIcon: require("../assets/home.png"),
          inactive: require("../assets/Homeone.png"),
        },
        {
          tiele: "热门",
          usename: "DetailPage",
          activeIcon: require("../assets/DetailPage.png"),
          inactive: require("../assets/DetailPageone.png"),
        },
        {
          tiele: "手记",
          usename: "Notes",
          activeIcon: require("../assets/notes.png"),
          inactive: require("../assets/Notesone.png"),
        },
        {
          tiele: "发现",
          usename: "Shopbag",
          activeIcon: require("../assets/find.png"),
          inactive: require("../assets/Findone.png"),
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 200px;
  height: 200px;
  background-color: #e4383c;
}
.van-tabbar--fixed {
    position: fixed;
    bottom: 0;
    left: 0;
}
</style>