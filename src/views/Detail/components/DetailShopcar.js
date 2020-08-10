import React, { Component } from 'react'
import { Tag,Toast } from 'antd-mobile';
import './detailshopcar.css'
import { reqShopCar } from '../../../utils/requset';
export default class DetailShopcar extends Component {
    constructor(){
        super()
        this.state = {
            arr:[]
        }
    }
    selects(selected, item) {
        if(selected){
            this.state.arr.push(item)
            this.setState({
                arr:this.state.arr
            })
        }else{
            let index = this.state.arr.indexOf(item)
            this.state.arr.splice(index,1)
            this.setState({
                arr:this.state.arr
            })
        }
    }
    putShopCar(val){
        sessionStorage.getItem('islogin')
        reqShopCar({uid:sessionStorage.getItem('islogin'),goodsid:this.props.msg.id,num:1}).then(res=>{
            if(res.data.code===200){
                Toast.success(res.data.msg,1)
                this.props.content(val)
            }else{
                Toast.fail(res.data.msg,1)
            }
        })
    }
    render() {
        const { msg } = this.props
        return (
            <div className='DetailShopcar'>
                <div className='shopcarback'>
                    <span><img src={msg.img} alt="" /><span className='shopName'>{msg.goodsname}</span></span>
                    <div><h2>{msg.specsname}</h2></div>
                    <div className='specsattrBox'>
                        {
                            JSON.parse(msg.specsattr).map(item => {
                                return <Tag style={{marginLeft:'0.3rem',marginTop:'0.2rem',width:'1.6rem',height:'0.8rem'}} key={item} onChange={(selected) => this.selects(selected, item)}>{item}</Tag>
                            })
                        }
                    </div>
                    <button onClick={()=>this.putShopCar('none')}>加入购物车</button>
                </div>
            </div>
        )
    }
}
