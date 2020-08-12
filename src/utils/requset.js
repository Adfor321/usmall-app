import axios from 'axios'
import qs from 'qs'
let token = qs.parse(sessionStorage.getItem('user')).token

axios.interceptors.response.use(res=>{
    console.group('本次请求的地址是===='+res.config.url)
    console.log(res)
    console.groupEnd()
    return res
})
//注册请求
export const reqRegister = (params)=>{
    return axios({
        url:'/api/register',
        method:'post',
        data:qs.stringify(params)
    })
}
//登录请求
export const reqLogin = (params)=>{
    return axios({
        url:'/api/login',
        method:'post',
        data:qs.stringify(params)
    })
}
//轮播图请求
export const reqBanner = ()=>{
    return axios ({
        url:'/api/getbanner',
        method:'get'
    })
}
//限时秒杀请求
export const reqKill = ()=>{
    return axios ({
        url:'/api/getseckill',
        method:'get'
    })
}
//商品列表请求
export const reqGoods = ()=>{
    return axios ({
        url:'/api/getindexgoods',
        method:'get'
    })
}
//商品详情请求
export const reqDetail = (params)=>{
    return axios ({
        url:'/api/getgoodsinfo',
        method:'get',
        params,
    })
}
//购物车添加
export const reqShopCar = (params)=>{
    return axios ({
        url:'/api/cartadd',
        method:'post',
        data:qs.stringify(params),
        headers: {'authorization': token}
    })
}
//分类列表请求
export const reqSort = ()=>{
    return axios ({
        url:'/api/getcatetree',
        method:'get'
    })
}
//分类商品请求
export const reqSortGoods = (params)=>{
    return axios ({
        url:'/api/getgoods',
        method:'get',
        params
    })
}
//购物车列表
export const reqShopCarList = (params)=>{
    return axios ({
        url:'/api/cartlist',
        method:'get',
        params,
        headers: {'authorization': token}
    })
}
//购物车修改
export const reqShopEdit = (params)=>{
    return axios ({
        url:'/api/cartedit',
        method:'post',
        data:qs.stringify(params),
        headers: {'authorization': token}
    })
}
//购物车删除
export const reqShopDel = (params)=>{
    return axios ({
        url:'/api/cartdelete',
        method:'post',
        data:qs.stringify(params),
        headers: {'authorization': token}
    })
}