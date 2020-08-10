import React, { Component } from 'react'
import './Mine.css'
import { Badge } from 'antd-mobile';
import setImg from '../../assets/img/set.png'
import msgImg from '../../assets/img/news.png'
import userImg from '../../assets/img/1.jpg'
import keep from '../../assets/img/keep.png'
import loading from '../../assets/img/icon_refund.png'
export default class Mine extends Component {
    constructor() {
        super()
        this.state = {
            arr: [1, 2, 3, 4],
            nickname:''
        }
    }
    componentDidMount(){
        this.setState({
            nickname:sessionStorage.getItem('nickname')
        })
    }
    render() {
        return (
            <div>
                <div className="mineHeader">
                    <div className='mineHeaderTop'>
                        <span><img src={setImg} alt="" /></span>
                        <span className='personal-center'>个人中心</span>
                        <span className='logoBox'>
                            <img src={msgImg} alt="" />
                            <span className='minelogo'><Badge text={11} overflowCount={9} /></span>
                        </span>
                    </div>
                </div>
                <div className='userHead'>
                    <img src={userImg} alt="" />
                    <p className='nickname'>{this.state.nickname}</p>
                </div>
                <div className='collection'>
                    <span><img src={keep} alt="" /></span>
                    <span className='myCollection'>我的收藏 ( 5 )</span>
                </div>
                <div className='order'>
                    <span>我的订单</span>
                    <span style={{ "color": '#BEC6D2' }}>查看订单</span>
                </div>
                <div className='loading'>
                    <span>
                        <img src={loading} alt="" />
                        <p style={{ fontSize: '0.3rem' }}>待发货</p>
                    </span>
                    {
                        this.state.arr.map(item => {
                            return (
                                <span className='loadBox' key={item}>
                                    <img src={loading} alt="" />
                                    <p style={{ fontSize: '0.3rem' }}>待发货</p>
                                    <span className='loadinglogo'><Badge text={3} overflowCount={9} /></span>
                                </span>
                            )
                        })
                    }
                </div>
                <div className='address'>
                    <span>收货地址管理</span>
                </div>
            </div>
        )
    }
}
