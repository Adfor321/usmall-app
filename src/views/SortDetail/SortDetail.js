import React, { Component } from 'react'
import { sortGoods } from '../../store'
import querystring from "querystring"
import { connect } from 'react-redux'
import {filterPrice}from '../../filters/filter'
import { Link } from "react-router-dom"
import './SortDetail.css'
import Header from '../../components/Header/Header'
 class SortDetail extends Component {
     constructor(){
         super()
         this.state = {
            name:''
         }
     }
    componentDidMount(){
        const name = querystring.parse(this.props.location.search.slice(1)).name
        this.setState({
            name:name
        })
    }
    render() {
        const {goodsDetail} = this.props
        if(goodsDetail.length===0){
            return null
        }
        return (
            <div>
                <Header ViewName={this.state.name} Go='true'></Header>
                <div className='sortdetail'>
                    {
                        goodsDetail.map(item=>{
                            return (
                                <div key={item.id} className='sortdetailImg'>
                                    <span><img src={item.img} alt=""/></span>
                                    <span className='imgRight'>
                                        {item.goodsname}
                                        <span className='sortprice'>{'￥'+filterPrice(item.price)}</span>
                                        <button className='buynow'><Link to={"/detail?id=" + item.id}>立即抢购</Link></button>
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        goodsDetail:sortGoods(state),
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SortDetail)