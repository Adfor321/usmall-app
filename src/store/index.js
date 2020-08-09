import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk"
import { reqGoods, reqDetail, reqSort,reqSortGoods,reqShopCarList } from '../utils/requset'
const initState = {
    goodsList: [],
    goodsDetail: {},
    sortList: [],
    sortGoods:[],
    shopcarList:[]
}
const reqGoodsAction = (arr) => {
    return { type: 'changeGoods', list: arr }
}
export const reqHomeList = () => {
    return (dispatch, getState) => {
        const { goodsList } = getState()
        if (goodsList.length > 0) {
            return
        }
        reqGoods().then(res => {
            dispatch(reqGoodsAction(res.data.list[0].content))
        })
    }
}
const reqDetailsAction = (arr) => {
    return { type: 'changeDetail', list: arr }
}
export const reqDetails = (id) => {
    return (dispatch, getState) => {

        if (Number(id) === getState().goodsDetail.id) {
            return;
        } else {
            reqDetail({ id: id }).then(res => {
                dispatch(reqDetailsAction(res.data.list[0]))
            })
        }

    }
}
const reqSortAction = (arr) => {
    return { type: 'changeSort', list: arr }
}
//分类列表请求
export const reqSortList = () => {
    
    return (dispatch,getState) => {
        const { sortList } = getState()
        if (sortList.length > 0) {
            return
        }
        reqSort().then(res => {
            dispatch(reqSortAction(res.data.list))
        })
    }
}
//分类商品请求
const reqSortgoodsAction = (arr)=>{
    return {type:'changeSortGoods',list:arr}
}
export const reqSortgoods = (id)=>{
    return (dispatch)=>{
        reqSortGoods({fid:id}).then(res=>{
            dispatch(reqSortgoodsAction(res.data.list))
        })
    }
}
//购物车列表请求
const reqShopcarAction = (arr)=>{
    return {type:'changeShopcarList',list:arr}
}
export const reqShopcar = (id)=>{
    console.log(id)
    return (dispatch)=>{
        reqShopCarList({uid:id}).then(res=>{
            dispatch(reqShopcarAction(res.data.list))
        })
    }
}
function reducer(state = initState, action) {
    switch (action.type) {
        case "changeGoods":
            return {
                ...state,
                goodsList: action.list
            };
        case "changeDetail":
            return {
                ...state,
                goodsDetail: action.list
            };
        case "changeSort":
            return {
                ...state,
                sortList: action.list
            };
        case "changeSortGoods":
            return {
                ...state,
                sortGoods:action.list
            };
        case "changeShopcarList":
            return{
                ...state,
                shopcarList:action.list
            }
        default:
            return state
    }
}
const store = createStore(reducer, applyMiddleware(thunk))
export const goods = (state) => state.goodsList
export const details = (state) => state.goodsDetail
export const sorts = (state) => state.sortList
export const sortGoods = (state) => state.sortGoods
export const shopcarList = (state) => state.shopcarList
export default store