<template>
  <div class="page">
    <!-- header头部 -->
    <header class="headCon">
      <a href="#" class="back" @click="$router.back()"
        ><img src="../../assets/images/arrowLeft.jpg" alt=""
      /></a>
      <a href="index.html" class="logo"
        ><img src="../../assets/images/logo.jpg" alt="logo"
      /></a>
      <div class="menu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
    <!-- search搜索框 -->
    <div class="search">
      <input type="search" placeholder="搜索商品" />
    </div>
    <van-card
      v-for="item in goodList"
      :key="item.id"
      num="2"
      tag="标签"
      :price="item.market_price | toFloat"
      desc="描述信息"
      :title="item.goodsname"
      :thumb="item.img ? $imgUrl + item.img : '../../assets/images/picDetail_1.jpg'"
      :origin-price="item.price | toFloat"
      @click="getId(item.id)"
    />
  </div>
</template>

<script>
import { getGoodList } from "../../util/axios";
export default {
  data() {
    return {
      goodList: [],
    };
  },
  mounted() {
    this.getGoodListInfo();
  },
  filters: {
    toFloat(n) {
      return n.toFixed(2);
    },
  },
  methods: {
    getGoodListInfo() {
      getGoodList({
        fid: this.$route.query.sid,
      }).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.goodList = res.list;
        }
      });
    },
    getId(id){
      this.$router.push({
        path: '/goodDetail',
        query: {
          id
        }
      })
    }
  },
};
</script>

<style lang="" scoped>
@import "../../assets/css/list.css";
.wid {
  width: 100%;
}
.van-card{
  width: 100%;
  padding: .2rem .8rem;
}
</style>