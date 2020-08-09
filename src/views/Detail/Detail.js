import React, { Component } from 'react'
import querystring from "querystring"
import { connect } from 'react-redux';
import { reqDetails, details } from '../../store'
import './detail.css'
import cart_on from '../../assets/img/tab_shopping_hig.png'
import DetailFooter from './components/Footer'
import DetailShopcar from './components/DetailShopcar'
import Header from '../../components/Header/Header'
class Detail extends Component {
    constructor() {
        super()
        this.state = {
            show: "none",
            shopcarMsg:[]
        }
    }
    componentDidMount() {
        const id = querystring.parse(this.props.location.search.slice(1)).id
        this.props.reqDetail(id)
    }
    show(val) {
        this.setState({
            show: val,
            shopcarMsg:this.props.details
        }, () => {

        })

    }
    cancel(){
        this.setState({
            show:'none'
        })
    }
    childs(val){
        this.setState({
            show:val
        })
    }
    render() {
        const { details } = this.props
        return (
            <div>
                <div className='detailHead'><Header ViewName='商品详情' Go='true'></Header></div>
                <div>
                    <span className='detailImg'><img src={details.img} alt="" /></span>
                    <div className='detailsbox'>
                        <p><span className='goodsname'>{details.goodsname}</span><span className='shoucang'><img src={cart_on} alt="" /><span>收藏</span></span></p>
                        <p><span className='detailPrice'>{'￥' + details.price}</span>
                            <span>
                                {
                                    details.ishot === 1 ? <span className='hot'>热卖</span> : null
                                }
                            </span>
                            <span>
                                {
                                    details.isnew === 1 ? <span className='new'>新品</span> : null
                                }
                            </span>
                        </p>
                        <p style={{ textDecoration: "line-through" }}>{'￥' + details.market_price}</p>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: details.description }} style={{ paddingBottom: '1.3rem' }}></div>
                <div className='detailFooter'><DetailFooter onShop={(val) => this.show(val)}></DetailFooter> </div>
                <div style={{ display: this.state.show }} className={this.state.show === 'block' ? 'blackBack' : null} onClick={()=>this.cancel()}></div>
                {
                    this.state.show==='block'?<div className='shopcarItem' ><DetailShopcar msg={this.state.shopcarMsg} content={(val)=>this.childs(val)}></DetailShopcar></div>:null
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        details: details(state)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        reqDetail: (id) => dispatch(reqDetails(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail)