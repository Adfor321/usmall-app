import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reqHomeList, goods } from '../../../../store/index'
import { Link } from "react-router-dom"
import './Link.css'
class Links extends Component {
    componentDidMount() {
        this.props.reqGoods()
    }
    render() {
        const { goods } = this.props
        return (
            <div className='link'>
                {
                    goods.map(item => {
                        return (
                            <div key={item.id} className='goods'>
                                <span className='linkImg'><img src={item.img} alt="" /></span>
                                <span className='buy'>
                                    <span>{item.goodsname}</span>
                                    <span style={{ color: 'red', marginTop: '0.2rem' }}>{'￥' + item.price}</span>
                                    <span><button><Link to={"/detail?id=" + item.id}>立即抢购</Link></button></span>
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {

    return {
        goods: goods(state)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        reqGoods: () => dispatch(reqHomeList())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Links)