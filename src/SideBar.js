import React from 'react'
import clothing from './assets/figma-img/clothing.svg'
import trending from './assets/figma-img/new.svg'
import bag from './assets/figma-img/accessories.svg'
import event from './assets/figma-img/event&gift.svg'
import diamond from './assets/figma-img/diamond.svg'
import acce from './assets/figma-img/event&gift.svg'
import './SideBar.css'

const SideBar = () => {
    return (
        <div className="side-bar-home column">
                <h4 className="findwhat">Bạn tìm ?</h4>
            <div className="topic-label">
                <div>
                    <img src={trending} />
                    <a className="sidebar-text" href="/items">New</a>

                </div>
                <div>
                    <img src={clothing} />
                    <a className="sidebar-text">Quần áo</a>
                </div>
                <div>
                    <img src={bag} />
                    <a className="sidebar-text" style={{ marginLeft: '10px' }}>Túi</a>
                </div>
                <div style={{ marginRight: '20px' }}>
                    <img className="" src={acce} />
                    <a className="sidebar-text">Phụ kiện</a>
                </div>
            </div>
        </div>
    )
}

export default SideBar
