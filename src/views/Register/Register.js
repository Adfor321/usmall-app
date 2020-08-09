import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import './register.css'
import { List, InputItem,Button,Toast} from 'antd-mobile'
import { reqRegister } from '../../utils/requset'
export default class Register extends Component {
    constructor() {
        super()
        this.state = {
            user: {
                phone: '',
                password: '',
                nickname:''
            }
        }
    }
    change(e,key) {
        this.setState({
            user:{
                ...this.state.user,
                [key]:e
            }
        })

    }
    goLogin(){
        this.props.history.push('/login')
    }
    reg(){
        reqRegister(this.state.user).then(res=>{
            if(res.data.code===200){
                Toast.success('注册成功',1)
                this.goLogin()
            }else{
                Toast.fail(res.data.msg,1)
            }
        })
    }
    render() {
        const {phone,password,nickname} = this.state.user
        return (
            <div>
                <Header ViewName='注册' Go='true'></Header>
                <div className='main'>
                <List>
                        <InputItem
                            placeholder="请输入手机号" value={phone} className='phone'
                            onChange={(e) => this.change(e,'phone')}
                        >手机号</InputItem>
                        <InputItem
                            placeholder="请输入昵称" value={nickname} className='password' type='password'
                            onChange={(e) => this.change(e,'nickname')}
                        >昵称</InputItem>
                        <InputItem
                            placeholder="请输入密码" value={password} className='password' type='password'
                            onChange={(e) => this.change(e,'password')}
                        >密码</InputItem>
                    </List>
                    <Button type="primary" style={{background:"orange"}} onClick={()=>this.reg()}>注册</Button>
                </div>
            </div>
        )
    }
}
