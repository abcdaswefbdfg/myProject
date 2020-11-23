<template>
  <div>
    <div class="page">
      <!-- header头部 -->
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
      <div v-if="!userInfo" style="text-align: center; padding-top: 0.2rem">
        <van-image
          round
          width="2.4rem"
          height="2.4rem"
          src="../../assets/images/picDetail_1.jpg"
        />

        <div>
          <van-button
            @click="$router.push('/login')"
            type="primary"
            style="margin-top: 0.2rem"
            >未登录，请登录</van-button
          >
        </div>
      </div>
      <div v-else>
        <!-- userArea -->
        <div style="text-align: center; padding-top: 0.2rem">
          <van-image
            round
            width="2.4rem"
            height="2.4rem"
            src="../../assets/images/picDetail_1.jpg"
          />
          <p
            style="
              text-align: center;
              font: 0.26rem/.8rem '微软雅黑';
              color: #5c5c5c;
            "
          >
            {{ userInfo.nickname }}
          </p>
          <van-button @click="exit" :hairline="hairline" plain type="info" style="margin-top: 0.2rem"
            >退出登录</van-button
          >
        </div>

        <!-- icons -->
        <div class="icons">
          <a href="#">
            <img src="../../assets/images/iconMine_1.jpg" alt="iconMine_1" />
            <p>全部订单</p>
          </a>
          <a href="#">
            <img src="../../assets/images/iconMine_2.jpg" alt="iconMine_1" />
            <p>待付款</p>
          </a>
          <a href="#">
            <img src="../../assets/images/iconMine_3.jpg" alt="iconMine_1" />
            <p>待收货</p>
          </a>
        </div>
        <!-- manageArea -->
        <ul class="manageArea">
          <li class="address">
            <a href="#">地址管理</a>
          </li>
          <li class="wallet">
            <a href="#">我的钱包</a>
          </li>
          <li class="coupon">
            <a href="#">我的优惠券</a>
          </li>
          <li class="erweima">
            <a href="#">我的二维码</a>
          </li>
          <li class="friends">
            <a href="#">我的小伙伴</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: "",
      hairline: false
    };
  },
  mounted() {
    this.userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : "";
  },
  methods: {
    exit() {
      localStorage.removeItem('userInfo');
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="" scoped>
@import "../../assets/css/mine.css";
</style>