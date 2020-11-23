<template>
  <div>
    <div class="page" id="box">
      <van-nav-bar
        :title="$route.name"
        right-text="注册"
        left-arrow
        @click-left="$router.back()"
        @click-right="$router.push('/register')"
      />
      <van-form @submit="onSubmit">
        <van-field
          v-model="logInfo.phone"
          name="手机号"
          label="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="logInfo.password"
          type="password"
          name="密码"
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
import { getLogin } from "../../util/axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      logInfo: {
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      getLogin(this.logInfo).then((res) => {
        if (res.code === 200) {
          console.log(res);
          Toast.success(res.msg);
          this.$router.push("/mine");
          localStorage.setItem('userInfo',JSON.stringify(res.list))
        } else {
          Toast.fail(res.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
@import "../../assets/css/login.css";
</style>