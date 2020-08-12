import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { TabBar } from 'antd-mobile';
import './index.css'
//路由
import Home from '../Home/Home'
import Mine from '../Mine/Mine'
import ShopCar from '../ShopCar/ShopCar'
import Sort from '../Sort/Sort'

//图片
import home_onimg from '../../assets/img/tab_home_hig.png'
import homeimg from '../../assets/img/tab_home_nor.png'
import cart from '../../assets/img/tab_shopping_nor.png'
import cart_on from '../../assets/img/tab_shopping_hig.png'
import sort_on from '../../assets/img/tab_menu_hig.png'
import sort from '../../assets/img/tab_menu_nor.png'
import me from '../../assets/img/tab_me_nor.png'
import me_on from '../../assets/img/tab_me_hig.png'
import DefRoute from '../../utils/DefRoute'
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullScreen: false,
            paths:'',
        };
    }
    componentDidMount(){
        this.setState({
            paths:this.props.history.location.pathname
        })
        
    }
    onView(url) {
        this.props.history.push(url)
        this.setState({
            paths:this.props.history.location.pathname
        })
    }

    render() {
        return (
            <div className='index'>
                <Switch>
                    <Route path='/index/home' component={Home}></Route>
                    <Route path='/index/sort' component={Sort}></Route>
                    <Route path='/index/shopcar' component={ShopCar}></Route>
                    <DefRoute path='/index/mine' component={Mine}></DefRoute>
                </Switch>
                <div className='footer'>
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#33A3F4"
                        barTintColor="white"
                    >
                        <TabBar.Item
                            title="首页"
                            key="home"
                            icon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(' + homeimg + ') center center /  21px 21px no-repeat'
                            }}
                            />
                            }
                            selectedIcon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(' + home_onimg + ') center center /  21px 21px no-repeat'
                            }}
                            />
                            }
                            selected={this.state.paths === '/index/home'}
                            onPress={() => {
                                this.onView('/index/home')
                            }}
                            data-seed="logId"
                        >
                        </TabBar.Item>
                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(' + sort + ') center center /  21px 21px no-repeat'
                                }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(' + sort_on + ') center center /  21px 21px no-repeat'
                                }}
                                />
                            }
                            title="分类"
                            key="sort"
                            selected={this.state.paths === '/index/sort'}
                            onPress={() => {
                                this.onView('/index/sort')
                            }}
                            data-seed="logId1"
                        >
                            
                        </TabBar.Item>
                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(' + cart + ') center center /  21px 21px no-repeat'
                                }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(' + cart_on + ') center center /  21px 21px no-repeat'
                                }}
                                />
                            }
                            title="购物车"
                            key="shopCar"
                            selected={this.state.paths === '/index/shopcar'}
                            onPress={() => {
                                this.onView('/index/shopcar')
                            }}
                        >
                        </TabBar.Item>
                        <TabBar.Item
                            icon={{ uri: me }}
                            selectedIcon={{ uri: me_on }}
                            title="我的"
                            key="my"
                            selected={this.state.paths === '/index/mine'}
                            onPress={() => {
                                this.onView('/index/mine')
                            }}
                        >
                        </TabBar.Item>
                    </TabBar>
                </div>
            </div>
        )
    }
}
