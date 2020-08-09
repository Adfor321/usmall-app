import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import { reqSortList, sorts,reqSortgoods } from '../../store'
import { connect } from 'react-redux'
import { Tabs } from 'antd-mobile';
import './sort.css'
class Sort extends Component {
    constructor() {
        super()
        this.state = {
            sortKey:0,
            sortItem:[]
        }
    }
    componentDidMount() {
        this.props.reqSort()

    }
    tabClick(tab,index){
        this.setState({
            sortKey:index
        })
    }
    sortDetail(id,name){
        this.props.reqGoods(id)
        this.props.history.push('/SortDetail?name='+name)
    }
    render() {
        const { sorts } = this.props
        const {sortKey}= this.state
        if (!sorts.length) {
            return <div></div>
        }
        let tabs = sorts.map(item => {
            return { title: item.catename, key: item.id }
        })
        return (
            <div>
                <Header ViewName='分类'></Header>
                <div className='sort'>
                    <Tabs tabs={tabs}
                        initialPage={'12'}
                        tabBarPosition="left"
                        tabDirection="vertical"
                        onTabClick={(tab,index)=>this.tabClick(tab,index)}
                    >
                    </Tabs>
                </div>
                <div className='sortShow' >
                        {
                            sorts[sortKey].children.map(item=>{
                                return (
                                    <div key={item.id} className='sortImg' onClick={()=>this.sortDetail(item.pid,item.catename)}>
                                        <span>
                                            <img src={item.img} alt=""/>
                                            <i>{item.catename}</i>
                                        </span>
                                    </div>
                                )
                            })
                        }
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return { sorts: sorts(state) }
}
const mapDispatchToProps = (dispatch) => {
    return {
        reqSort: () => dispatch(reqSortList()),
        reqGoods:(id)=>dispatch(reqSortgoods(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sort)