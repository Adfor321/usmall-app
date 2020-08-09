import React, { Component } from 'react'
import Header from './components/Header/Header'
import Banner from './components/Banner/Banner'
import Kill from './components/Kill/Kill'
import Link from './components/Link/Link'
import { reqBanner } from '../../utils/requset'
class Home extends Component {
    constructor() {
        super()
        this.state = {
            bannerImg: [],
        }
    }
    componentDidMount() {
        reqBanner().then(res => {
            this.setState({
                bannerImg: res.data.list
            })
        })
    }
    render() {
        const {bannerImg} = this.state
        return (
            <div>
                <div><Header></Header></div>
                <div>
                    <Banner banners={bannerImg}></Banner>
                </div>
                <div><Kill></Kill></div>
                <div><Link></Link></div>
            </div>
        )
    }
}
export default Home