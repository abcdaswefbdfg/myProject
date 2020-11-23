<template>
  <div class="page">
    <header class="headCon">
      <a href="#" class="back" @click="$router.back()"
        ><img src="../../assets/images/arrowLeft (2).jpg" alt=""
      /></a>
      <h2>{{ $route.name }}</h2>
      <div class="menu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
    <div v-if="goodDetail">
      <div class="intro">
        <a href="#" class="goodPic"
          ><img
            :src="
              goodDetail.img
                ? $imgUrl + goodDetail.img
                : '../../assets/images/picDetail_1.jpg'
            "
            alt="picDetail_1"
        /></a>
        <a href="#" class="goodName">
          {{ goodDetail.goodsname }}
        </a>
        <p>
          <span>&yen;{{ goodDetail.market_price | toFloat }}</span
          >（此价格不与套装优惠同享）
        </p>
      </div>
      <div class="main">
        <dl class="discount">
          <dt class="title">促销:</dt>
          <dd><span>满减</span> 满2件9折；3件8折</dd>
        </dl>
        <dl class="number">
          <dt class="title">购买数量</dt>
          <dd>
            <van-stepper v-model="value" />
          </dd>
        </dl>
        <dl class="attribute">
          <dt>商品属性</dt>

          <dd>
            {{ goodDetail.specsname }}
            <!-- <span :class="[index===0 ? 'red' : 'grey']" v-for="(item,index) in specsattr" :key="item">{{item}}</span> -->
            <van-tag
              v-for="item in specsattr"
              :key="item"
              type="primary"
              size="large"
              >{{ item }}</van-tag
            >
          </dd>
        </dl>
      </div>
      <div class="detail">
        <h3>商品详情</h3>
        <p style="padding-left: 0.15rem" v-html="goodDetail.description"></p>
      </div>
      <div class="comment">
        <h4>商品评价</h4>
        <a href="#" class="userName">1235668fg</a>
        <p class="con">效果很好，物流到位，下次继续来。</p>
        <div class="pic">
          <img src="../../assets/images/picDetail_8.jpg" alt="picDetail_8" />
          <img src="../../assets/images/picDetail_9.jpg" alt="picDetail_9" />
          <img src="../../assets/images/picDetail_10.jpg" alt="picDetail_10" />
        </div>
        <p class="date">2020-01-22</p>
        <div class="num">
          <p>共<span>1000+</span>评论</p>
          <a href="#" class="more">查看更多</a>
        </div>
      </div>
      <div class="foot">
        <van-goods-action>
          <van-goods-action-icon icon="cart-o" text="购物车" @click="goCart" />
          <van-goods-action-button
            type="warning"
            text="加入购物车"
            @click="addCart"
          />
          <van-goods-action-button type="danger" text="立即购买" />
        </van-goods-action>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsInfo, getCartAdd } from "../../util/axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      value: 1,
      goodDetail: '',
      specsattr: [],
    };
  },
  filters: {
    toFloat(n) {
      return n.toFixed(2);
    },
  },
  methods: {
    getGoodsDetail() {
      getGoodsInfo({
        id: this.$route.query.id,
      }).then((res) => {
        console.log(res);
        this.goodDetail = res.list[0];
        this.specsattr = this.goodDetail.specsattr
          ? this.goodDetail.specsattr.split(",")
          : [];
      });
    },
    addCart() {
      if (localStorage.getItem("userInfo")) {
        getCartAdd({
          uid: JSON.parse(localStorage.getItem("userInfo")).uid,
          goodsid: this.$route.query.id,
          num: this.value,
        }).then((res) => {
          if (res.code === 200) {
            Toast.success(res.msg);
          }
          console.log(res);
        });
      } else {
        Toast.fail("当前未登录，请登录");
        this.$router.push("/login");
      }
    },
    goCart() {
      if (localStorage.getItem("userInfo")) {
        this.$router.push({
          path: "/cart",
          query: {
            uid: JSON.parse(localStorage.getItem("userInfo")).uid,
          },
        });
      } else {
        Toast.fail("当前未登录，请登录");
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    this.getGoodsDetail();
  },
};
</script>

<style lang="" scoped>
@import "../../assets/css/detail.css";
.van-tag {
  margin-left: 0.3rem;
}
</style>