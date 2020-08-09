import React from 'react'
import './Kill.css'
import imgs from '../../../../assets/img/img/home/1.jpg'
let data = ['限时抢购','积分商城','联系我们','商品分类']
export default function Kill() {
    return (
        <div className='kill'>
            {data.map(item=>{
                return (
                    <span key={item} className='killImg'> <img src={imgs} alt=""/><p>{item}</p></span>
                )
            })}
        </div>
    )
}
