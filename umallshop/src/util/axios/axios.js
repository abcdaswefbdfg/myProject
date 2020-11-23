import axios from 'axios'
import {Toast} from 'vant'
const http = axios.create({
    baseURL: '/api/api'
})
//请求拦截
http.interceptors.request.use(req => {
    let token = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")).token
        : "";
    req.headers.authorization = token;
    return req;
});

//响应拦截
http.interceptors.response.use(res => {
    console.log(res,'响应');
    if (res.code === 500) {
        Toast.fail(res.msg);
        router.push("/login");
        return res.data;
    } else if (res.code === 403) {
        Toast.fail(res.msg);
        router.push("/login");
        return res.data;
    } else {
        return res.data;
    }
});
export default http