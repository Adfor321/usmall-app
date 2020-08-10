import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Header/Header'
import { reqShopcar, shopcarList, reqShopcarEdit, reqShopcarChecked, reqAllchecked } from '../../store'
import { filterPrice } from '../../filters/filter'
import selectImg from '../../assets/img/radio_nor.png'
import selectImg_on from '../../assets/img/radio_hig.png'
import editImg from '../../assets/img/editor_nor.png'
import editImg_on from '../../assets/img/editor_hig.png'
import store from '../../assets/img/store.png'
import ShopCarNo from '../../assets/img/tab_shopping_nor.png'
import './shopcar.css'
import { reqShopDel } from '../../utils/requset'
import { Modal, Toast } from 'antd-mobile';
const alert = Modal.alert;
class ShopCar extends Component {
    constructor() {
        super()
        this.state = {
            select: false,
            edit: false,
            selectArr: [],
            price: 0,
            vas : false
        }
    }
    componentDidMount() {
        this.props.reqShopCarList(sessionStorage.getItem("islogin"))
    }
    //单选
    selects(index) {
        this.props.reqSelect(index)
    }
    //全选
    all(checked) {
        this.setState({
            select: !this.state.select
        })
        this.props.reqAllchecked(checked)
    }
    //编辑
    edit() {
        this.setState({
            edit: !this.state.edit
        })
    }
    add(type, id, index) {
        this.props.reqShopcarEdit({ type: type, id: id, index: index })
        this.props.reqShopCarList(sessionStorage.getItem("islogin"))
    }
    //合计
    allsprice() {
        let { shopcarList } = this.props
        let arr = 0
        shopcarList.forEach(item => {
            if (item.checked) {
                arr += item.num * item.price
            }
        })
        return filterPrice(arr)
    }
    del(id) {
        alert('删除', '你确定要删除吗?', [
            { text: '取消', onPress: () => null },
            {
                text: '确定',
                onPress: () =>
                    reqShopDel({ id: id }).then(res => {
                        console.log(id)
                        if (res.data.code === 200) {
                            Toast.success('删除成功', 1)
                            this.props.reqShopCarList(sessionStorage.getItem("islogin"))
                            this.setState({
                                edit: !this.state.edit
                            })
                        } else {
                            Toast.info(res.data.msg, 1)
                        }
                    })
            },
        ])

    }
    render() {
        const { shopcarList } = this.props
        let checkedAll = shopcarList.every(item => item.checked)
        return (
            <div className='shopcar'>
                <Header ViewName='购物车'></Header>
                <ul className='shopCarUser'>
                    {
                        shopcarList.length > 0 ? <div></div> : <div className='shopCarNo'>
                            <p><img src={ShopCarNo} alt="" /></p>
                            <p>购物车还是空的</p>
                            <p>快去逛逛吧~</p>
                        </div>
                    }
                    {
                        shopcarList.map((item, index) => {
                            return (
                                <li key={item.id} className='carGoodsList'>
                                    <p className="carGoodsTitle"><i><img src={store} alt="" /></i>杭州保税局仓</p>
                                    <div className='carGoods'>
                                        {
                                            item.checked ? <span onClick={() => this.selects(index)} className={this.state.edit ? 'carGoodsEdit' : "carGoodsSelect"}><img src={selectImg_on} alt="" /></span> : <span className={this.state.edit ? 'carGoodsEdit' : "carGoodsSelect"} onClick={() => this.selects(index)}><img src={selectImg} alt="" /></span>
                                        }
                                        <span className='carGoodsImg'>
                                            <img src={item.img} alt="" />
                                        </span>
                                        <span className='carGoodsright'>
                                            <span className='carGoodsName'>{item.goodsname}</span>
                                            <span className='carGoodsNum'>
                                                <button onClick={() => this.add(1, item.id, index)}>-</button>
                                                <span>{item.num}</span>
                                                <button onClick={() => this.add(2, item.id, index)}>+</button>
                                            </span>
                                            <span onChange={() => this.allsprice()}>总价:{filterPrice(item.price * item.num)}</span>
                                        </span>
                                        <span className='carGoodsPrice'>
                                            {'￥' + filterPrice(item.price)}
                                        </span>
                                        {
                                            this.state.edit ? <span className='del' onClick={() => this.del(item.id)}>
                                                <p>删</p>
                                                <p>除</p>
                                            </span> : null
                                        }
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                {
                    shopcarList.length > 0 ? <div className='shopCarFooter'>
                        <div className='footerLeft'>
                            <span onClick={() => this.all(!checkedAll)}>
                                {
                                     checkedAll ? <img src={selectImg_on} alt="" /> : <img src={selectImg} alt="" />
                                }
                                <p>全选</p>
                            </span>
                            <span onClick={() => this.edit()}>
                                {
                                    this.state.edit ? <img src={editImg_on} alt="" /> : <img src={editImg} alt="" />
                                }
                                <p>编辑</p>
                            </span>
                            <span className='total'>
                                {
                                    '合计：' + this.allsprice()
                                }
                                <p>(不含运费)</p>
                            </span>
                        </div>
                        <span className='goshoping'>
                            去结算
                    </span>
                    </div> : <div></div>
                }
            </div>
        )
    }
}
const mapStatetoProps = (state) => {
    return {
        shopcarList: shopcarList(state),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        reqShopCarList: (id) => dispatch(reqShopcar(id)),
        reqShopcarEdit: (id) => dispatch(reqShopcarEdit(id)),
        reqSelect: (index) => dispatch(reqShopcarChecked(index)),
        reqAllchecked: (checked) => dispatch(reqAllchecked(checked)),
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(ShopCar)