<template>
  <div>
    <div class="page" id="box">
      <van-nav-bar
        :title="$route.name"
        right-text="登录"
        left-arrow
        @click-left="$router.back()"
        @click-right="$router.push('/login')"
      />
      <van-form @submit="onSubmit">
        <van-field
          v-model="regInfo.phone"
          name="phone"
          label="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="regInfo.nickname"
          name="nickname"
          label="昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
        />
        <van-field
          v-model="regInfo.password"
          name="password"
          type="password"
          label="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { getRegister } from "../../util/axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      regInfo: {
        phone: "",
        nickname: "",
        password: ""
      },
    };
  },
  methods: {
    onSubmit() {
      getRegister(this.regInfo).then((res) => {
        if (res.code === 200) {
          Toast.success(res.msg);
          //成功之后跳转到登录页
          this.$router.push("/login");
        } else {
          Toast.fail(res.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
@import "../../assets/css/register.css";
</style>