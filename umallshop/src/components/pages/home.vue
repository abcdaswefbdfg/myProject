<template>
  <div class="page" id="box" v-cloak>
    <!-- header头部 -->
    <header class="headCon">
      <a class="logo" href="index.html"
        ><img src="../../assets/images/logo.jpg" alt="logo"
      /></a>
      <input class="search" type="search" placeholder="寻找商品" />
      <p class="menu">
        <span></span>
        <span></span>
        <span></span>
      </p>
    </header>
    <!-- nav导航 -->
    <nav class="navbar">
      <ul class="clearfix">
        <li class="active"><a href="#">推荐</a></li>

        <li v-for="item in classify" :key="item.id">
          <router-link :to="'/goodList?id=' + item.id">{{
            item.name
          }}</router-link>
        </li>
      </ul>
      <div></div>
    </nav>
    <!-- banner -->

    <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
      <van-swipe-item v-for="item in bannerlist" :key="item.id">
        <img
          :src="
            item.img
              ? $imgUrl + item.img
              : 'https://img.yzcdn.cn/vant/ipad.jpeg'
          "
          alt=""
        />
      </van-swipe-item>
    </van-swipe>
    <!-- icons -->
    <ul class="icons">
      <li>
        <a href="#">
          <img src="../../assets/images/indexicon1.jpg" alt="icons" />
          <p>限时抢购</p>
        </a>
      </li>
      <li>
        <a href="#">
          <img src="../../assets/images/indexicon2.jpg" alt="icons" />
          <p>积分商城</p>
        </a>
      </li>
      <li>
        <a href="#">
          <img src="../../assets/images/indexicon3.jpg" alt="icons" />
          <p>联系我们</p>
        </a>
      </li>
      <li>
        <router-link to="/sort"
          ><img src="../../assets/images/indexicon4.jpg" alt="icons" />
          <p>商品分类</p></router-link
        >
      </li>
    </ul>
    <!-- 限时秒杀limitTime -->
    <div class="limitTime">
      <div class="itemsL">
        <h3>
          <a href="#">限时秒杀</a>
        </h3>
        <p class="txt">
          <a href="#">每天零点场 优惠秒不停</a>
        </p>
        <p class="time clearfix">
          <span class="dotted">02</span>
          <span class="dotted">16</span>
          <span>45</span>
          <span class="yellow"> 秒杀 </span>
        </p>
        <div class="img">
          <a href="#"
            ><img src="../../assets/images/shop_5.jpg" alt="shop_5"
          /></a>
        </div>
        <div class="posi">&yen;14.8</div>
      </div>
      <div class="itemsR">
        <div class="brand">
          <div class="txt">
            <h3>
              <a href="#">品牌上新</a>
            </h3>
            <p><a href="#">每日九点 抢大牌</a></p>
            <a href="#" class="pic"
              ><img src="../../assets/images/brand.jpg" alt="brand"
            /></a>
          </div>
          <a href="#" class="picR"
            ><img src="../../assets/images/indexshop.jpg" alt="shop"
          /></a>
        </div>
        <div class="item">
          <div class="left">
            <h3><a href="#">每日十件</a></h3>
            <p><a href="#">只为你选好货</a></p>
            <a href="#" class="itemPic"
              ><img src="../../assets/images/indexship2.jpg" alt="shop"
            /></a>
          </div>
          <div class="right">
            <h3><a href="#">拼啊</a></h3>
            <p><a href="#">超级好价拼团</a></p>
            <a href="#" class="itemPic2"
              ><img src="../../assets/images/shop_3.jpg" alt="shop"
            /></a>
          </div>
        </div>
      </div>
    </div>
    <!-- ads -->
    <div class="ads">
      <a href="#">
        <img src="../../assets/images/bar.jpg" alt="ads" />
      </a>
    </div>
    <div class="goods">
      <!-- <ul class="title">
        <li class="active"><a href="#">热门推荐</a></li>
        <li><a href="#">发现好货</a></li>
        <li><a href="#">只看专场</a></li>
        <li><a href="#">只看商品</a></li>
      </ul> -->
      <van-tabs v-model="active">
        <van-tab title="热门推荐">
          <van-card
            v-for="item in hotGoods"
            :key="item.id"
            :num="2"
            :price="item.price | toFloat"
            desc="描述信息"
            :title="item.goodsname"
            :thumb="
              item.img
                ? $imgUrl + item.img
                : '../../assets/images/picDetail_1.jpg'
            "
          />
        </van-tab>
        <van-tab title="发现新品">
          <van-card
            v-for="item in newGoods"
            :key="item.id"
            :num="2"
            :price="item.price"
            desc="描述信息"
            :title="item.goodsname"
            :thumb="
              item.img
                ? $imgUrl + item.img
                : '../../assets/images/picDetail_1.jpg'
            "
          />
        </van-tab>
        <van-tab title="全部商品">
          <van-card
            v-for="item in goodslist"
            :key="item.id"
            :num="2"
            :price="item.price"
            desc="描述信息"
            :title="item.goodsname"
            :thumb="
              item.img
                ? $imgUrl + item.img
                : '../../assets/images/picDetail_1.jpg'
            "
          />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getBannerList, getGoodsList } from "../../util/axios";
export default {
  data() {
    return {
      active: 0,
      bannerlist: [],
      goodslist: [],
      hotGoods: [],
      newGoods: [],
      classify: [
        {
          id: 1,
          name: "女装1",
        },
        {
          id: 2,
          name: "女装2",
        },
        {
          id: 3,
          name: "女装3",
        },
        {
          id: 4,
          name: "女装4",
        },
        {
          id: 5,
          name: "女装5",
        },
        {
          id: 6,
          name: "女装6",
        },
        {
          id: 7,
          name: "女装7",
        },
      ],
    };
  },
  mounted() {
    this.getBannerListInfo();
    this.getGoodsListInfo();
  },
  filters: {
    toFloat(n) {
      return n.toFixed(2);
    },
  },
  methods: {
    getBannerListInfo() {
      getBannerList().then((res) => {
        if (res.code === 200) {
          this.bannerlist = res.list;
        }
      });
    },
    getGoodsListInfo() {
      getGoodsList().then((res) => {
        // console.log(res, "fegfh");
        if (res.code === 200) {
          this.goodslist = res.list[2].content;
          this.hotGoods = res.list[0].content;
          this.newGoods = res.list[1].content;
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
@import "../../assets/css/index.css";
.van-swipe img {
  width: 100%;
  height: auto;
}
</style>