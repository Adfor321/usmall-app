import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk"
import { Toast } from 'antd-mobile';
import { reqGoods, reqDetail, reqSort, reqSortGoods, reqShopCarList, reqShopEdit } from '../utils/requset'
import qs from 'qs'
const initState = {
    goodsList: [],
    goodsDetail: {},
    sortList: [],
    sortGoods: [],
    shopcarList: [],
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
//详情
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
    return (dispatch, getState) => {
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
const reqSortgoodsAction = (arr) => {
    return { type: 'changeSortGoods', list: arr }
}
export const reqSortgoods = (id) => {
    return (dispatch) => {
        reqSortGoods({ fid: id }).then(res => {
            dispatch(reqSortgoodsAction(res.data.list))
        })
    }
}
//购物车列表请求
const reqShopcarAction = (arr) => {
    return { type: 'changeShopcarList', list: arr }
}
export const reqShopcar = () => {
    return (dispatch) => {
        reqShopCarList({ uid: qs.parse(sessionStorage.getItem("user")).uid }).then(res => {
            if (res) {
                if (res.data.msg === "登录已过期或访问权限受限"||res.data.msg === "缺少必要条件") {
                    Toast.fail("登录已过期或访问权限受限", 1)
                    sessionStorage.removeItem('user')
                    window.open("http://localhost:3001/#/", "_self")
                }
                const lists = res.data.list?res.data.list:[]
                if (lists) {
                    lists.forEach(item => {
                        item.checked = false;
                    });
                    dispatch(reqShopcarAction(lists))
                }
            }


        })
    }

}
//购物车修改
export const reqShopcarEdit = (id) => {
    return (dispatch) => {
        reqShopEdit(id).then(res => {
            dispatch(reqShopcar())
        })
    }
}
//购物车选中项
export const reqShopcarChecked = (index) => {
    return {
        type: 'shopcheck', index
    }
}
//购物车全选
export const reqAllchecked = (checked) => {
    return (dispatch, getState) => {
        let list = getState().shopcarList
        list.forEach(item => {
            item.checked = checked
        });
        dispatch(reqShopcarAction(list))
    }
}
//获取之前的列表
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
                sortGoods: action.list
            };
        //购物车列表
        case "changeShopcarList":
            let oldList = [...state.shopcarList];
            let list = action.list
            if (list) {
                list.forEach((item, index) => {
                    if (oldList.length) {
                        item.checked = oldList[index].checked
                    } else {
                        item.checked = false
                    }
                })
            }
            return {
                ...state,
                shopcarList: list ? list : []
            };
        //选中
        case "shopcheck":
            let shopcarList = [...state.shopcarList];
            shopcarList[action.index].checked = !shopcarList[action.index].checked
            return {
                ...state,
                shopcarList
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