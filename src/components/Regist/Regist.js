import React, { Component } from 'react'
import './regist.css'
import {Link} from 'react-router-dom'
export default class Regist extends Component {
    render() {
        return (
            <div className='regist'>
                <Link to='/register'>注册</Link>
            </div>
        )
    }
}
