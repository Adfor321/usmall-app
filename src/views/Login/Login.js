import React, { Component } from 'react'
import './login.css'
import qs from 'qs'
import Header from '../../components/Header/Header'
import { List, InputItem, Button, Toast } from 'antd-mobile'
import { reqLogin } from '../../utils/requset'

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            user: {
                phone: '',
                password: ''
            }
        }
    }
    componentDidMount() {
        if (sessionStorage.getItem("islogin")) {
            this.props.history.push('/index/home')
        }
    }
    change(e, key) {
        this.setState({
            user: {
                ...this.state.user,
                [key]: e
            }
        })

    }

    goIndex() {

        this.props.history.push('/index/home')

    }
    login() {
        reqLogin(this.state.user).then(res => {
            if (res.data.code === 200) {
                Toast.success('登录成功', 1)
                sessionStorage.setItem('user', qs.stringify(res.data.list))
                this.goIndex()

            } else {
                Toast.fail(res.data.msg, 1)
            }
        })
    }
    render() {
        const { phone, password } = this.state.user
        return (
            <div className='login'>
                <Header ViewName='登录' show='true'></Header>
                <div className='main'>
                    <List>
                        <InputItem
                            placeholder="请输入账号" value={phone} className='phone'
                            onChange={(e) => this.change(e, 'phone')}
                        >账号</InputItem>
                        <InputItem
                            placeholder="请输入密码" value={password} className='password' type='password'
                            onChange={(e) => this.change(e, 'password')}
                        >密码</InputItem>
                    </List>
                    <Button type="primary" style={{ background: "orange" }} onClick={() => this.login()}>登录</Button>
                </div>
            </div>
        )
    }
}
