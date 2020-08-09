import React, { Component } from 'react'
import u_img from '../../../../assets/img/img/home/logo.jpg'
import { SearchBar } from 'antd-mobile';
import './header.css'

export default class Header extends Component {
    componentDidMount() {
        this.autoFocusInst.focus();
    }
    render() {
        return (
            <div className='header'>
                <div className='logo'><img src={u_img} alt="" /></div>
                <div className='search'><SearchBar placeholder="寻找商品" ref={ref => this.autoFocusInst = ref} /></div>
            </div>
        )
    }
}

