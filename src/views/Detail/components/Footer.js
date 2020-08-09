import React, { Component } from 'react'

export default class Footer extends Component {
    clickShop(val){
        this.props.onShop(val)
    }
    render() {
        return (
            <div className='detailFoot'>
                <span className='back'></span>
                <span className='goshopcar' onClick={()=>this.clickShop("block")}>加入购物车</span>
            </div>
        )
    }
}
