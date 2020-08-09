import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Header/Header'
import { Checkbox } from 'antd-mobile';
import { reqShopcar,shopcarList} from '../../store'
import selectImg from '../../assets/img/radio_nor.png'
import './shopcar.css'
const CheckboxItem = Checkbox.CheckboxItem
 class ShopCar extends Component {
     constructor(){
         super()
         this.state = {
             select:false
         }
     }
     componentDidMount(){
         this.props.reqShopCarList(sessionStorage.getItem("islogin"))
     }
     change(e){

     }
    render() {
        console.log(this.props)
        return (
            <div>
                <Header ViewName='购物车'></Header>
                <div className='shopCarFooter'>
                    <span>   
                        <img src={selectImg} alt=""/>
                        <p>全选</p>
                    </span>
                </div>
            </div>
        )
    }
}
const mapStatetoProps = (state)=>{
    return {
        shopcarList:shopcarList(state)
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        reqShopCarList:(id)=>dispatch(reqShopcar(id))
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(ShopCar)