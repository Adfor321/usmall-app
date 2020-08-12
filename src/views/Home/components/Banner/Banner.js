import React, { Component } from 'react'
import { Carousel } from 'antd-mobile';
import './banner.css'
export default class Banner extends Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }
    render() {
        const { banners } = this.props
        return (
            <div>
                <div className='banner'>
                    {
                        banners.length&&<Carousel autoplay infinite >
                            {
                                banners.map(item => {
                                    return <img
                                        key={item.id}
                                        src={item.img}
                                        alt=""
                                    />
                                })
                            }
                        </Carousel>
                    }
                </div>
            </div>
        )
    }
}
