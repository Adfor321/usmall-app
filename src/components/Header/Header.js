import React, { Component } from 'react'
import './header.css'
import Regist from '../Regist/Regist'
import GoBack from '../GoBack/GoBack'
export default class Header extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            show: false,
            Goback:false,
        }
    }
    componentDidMount() {
        this.setState({
            name: this.props.ViewName,
            show:this.props.show,
            Goback:this.props.Go
        })
    }
    render() {
        return (
            <div className='head'>
                <div className='heads'>
                    {this.state.name}

                </div>

                <div className='regist'>
                    {
                        this.state.show ? <Regist></Regist> : null
                    }
                </div>
                <div className='goback'>
                    {
                        this.state.Goback ? <GoBack></GoBack> : null
                    }
                </div>
            </div>
        )
    }
}
