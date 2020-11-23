<template>
  <div>
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
    <div v-if="cartList && userInfo">
      <van-swipe-cell v-for="item in cartList" :key="item.id">
        <div class="cartInfo">
          <input type="checkbox" v-model="item.checked" @change="changeOne" />
          <van-card
            :price="item.price | toFloat"
            desc="描述信息"
            :title="item.goodsname"
            :thumb="
              item.img
                ? $imgUrl + item.img
                : '../../assets/images/picDetail_1.jpg'
            "
            class="goods-card"
          >
            <template #footer>
              <div>
                <van-stepper
                  v-model="item.num"
                  theme="round"
                  button-size="22"
                  disable-input
                />
              </div>
            </template>
          </van-card>
        </div>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="del(item.id)"
          />
        </template>
      </van-swipe-cell>
      <van-submit-bar :price="allSum" button-text="提交订单">
        <input type="checkbox" v-model="allChecked" @change="allChoose" />全选
      </van-submit-bar>
    </div>
    <div v-else-if="!cartList && userInfo">
      <van-empty description="购物车空空如也，快去买买买" />
    </div>
    <div style="text-align: center; padding-top: 0.5rem" v-else>
      <van-button @click="$router.push('/login')" type="default"
        >请先登录，再查看</van-button
      >
    </div>
  </div>
</template>

<script>
import { Locale, Toast } from "vant";
import { getCartList, getCartDelete, getCartAdd } from "../../util/axios";
export default {
  data() {
    return {
      allChecked: false,
      cartList: '',
      userInfo: "",
    };
  },
  filters: {
    toFloat(n) {
      return n.toFixed(2);
    },
  },
  computed: {
    allSum() {
      let sum = 0;
      this.cartList.map((item, i) => {
        if (this.cartList[i].checked) {
          sum += item.price * item.num;
        }
      });
      return sum*100;
    },
  },
  mounted() {
    this.userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : "";
    this.getCartListInfo();
  },
  methods: {
    getCartListInfo() {
      getCartList({
        uid: this.userInfo.uid,
      }).then((res) => {
        if (res.code === 200) {
          this.cartList = res.list;
        }
      });
      this.cartList ? this.cartList.map((item) => (item.checked = false)) : '';
    },
    del(id) {
      getCartDelete({
        id,
      }).then((res) => {
        if (res.code === 200) {
          Toast.success(res.msg);
        }
      });
      this.getCartListInfo();
    },
    changeOne() {
      this.allChecked = this.cartList.every((item) => item.checked);
    },
    allChoose() {
      this.cartList.map((item) => (item.checked = this.allChecked));
    },
  },
};
</script>

<style lang="" scoped>
@import "../../assets/css/cart.css";
.goods-card {
  margin: 0;
  background-color: #fff;
}

.delete-button {
  height: 100%;
}
.cartInfo {
  display: flex;
}
.van-card {
  flex: 1;
}
.van-checkbox {
  padding-left: 15px;
  width: 20px;
}
.van-submit-bar__bar {
  position: fixed;
  bottom: 1.2rem;
  margin: 0 auto;
  width: 91.47%;
}
input[type="checkbox"] {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  margin: 0.9rem 0.44rem 0 0.24rem;
  display: block;
  float: left;
  width: 0.34rem;
  height: 0.34rem;
  border: 0.02rem solid #666666;
  border-radius: 50%;
}

input[type="checkbox"]:checked {
  border-color: #b32e1f;
  background: url(../../assets/images/selectCart.jpg) no-repeat center;
  background-size: 0.17rem 0.13rem;
}
.van-submit-bar input[type="checkbox"] {
  margin-top: 0.1rem;
}
</style>
