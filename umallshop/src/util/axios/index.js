import axios from './axios'

export function getBannerList() {
    return axios.get('/getbanner')
}
export function getGoodsList(){
    return axios.get('/getindexgoods')
}
export function getCateTreeList(){
    return axios.get('/getcatetree')
}
export function getGoodList(params){
    return axios.get('/getgoods',{params})
}

export function getGoodsInfo(params){
    return axios.get('/getgoodsinfo',{params})
}
export function getRegister(data){
    return axios.post('/register',data)
}
export function getLogin(data){
    return axios.post('/login',data)
}
export function getCartList(params){
    return axios.get('/cartlist',{params})
}
export function getCartAdd(data){
    return axios.post('/cartadd',data)
}
export function getCartDelete(data){
    return axios.post('/cartdelete',data)
}
