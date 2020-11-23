<template>
  <div>
    <div class="page">
      <header class="headCon">
        <a href="#" class="back" @click="$router.back()"
          ><img src="../../assets/images/arrowLeft (2).jpg" alt=""
        /></a>
        <h2>{{$route.name}}</h2>
        <div class="menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
      <div class="cateInfo">
        
        <van-sidebar v-model="activeKey" @change="changeCate">
          <van-sidebar-item
            v-for="item in catelist"
            :key="item.id"
            :title="item.catename"
           
          />
        </van-sidebar>
        <van-grid :border="false" :column-num="3">
          <van-grid-item
            v-for="item in secondlist"
            :key="item.id" :to="'/goodList?sid='+item.id"
          >
            <van-image
              :src="
                item.img
                  ? $imgUrl + item.img
                  : '../../assets/images/picDetail_1.jpg'
              "
            />
            <span class="title">{{item.catename}}</span>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import { getCateTreeList } from "../../util/axios";
export default {
  data() {
    return {
      activeKey: 0,
      catelist: [],
      secondlist: [],
    };
  },
  mounted() {
    this.getCateTreeListInfo();
  },
  methods: {
    getCateTreeListInfo() {
      getCateTreeList().then((res) => {
        console.log(res,"catelist");
        this.catelist = res.list;
        this.secondlist = res.list[this.activeKey].children;
      });
    },
    changeCate(e) {
      this.secondlist = this.catelist[e].children;
    },
  },
};
</script>

<style lang="" scoped>
@import "../../assets/css/sort.css";
.cateInfo {
  display: flex;
}
.van-grid {
  flex: 1;
}
.title {
  font-size: 14px;
}
</style>
