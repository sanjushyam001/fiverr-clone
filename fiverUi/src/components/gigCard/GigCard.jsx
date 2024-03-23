import React from 'react'
import "./GigCard.scss"
import { Link } from 'react-router-dom'
const GigCard = ({ item }) => {
    return (
        <Link to="/gig/123" className='link'>
            <div className='gigCard'>
                <img src={item.img} alt="" srcset="" />
                <div className="info">
                    <div className="user">
                        <img src={item.pp} alt="" srcset="" />
                        <span>{item.username}</span>
                    </div>
                    <p>{item.desc}</p>
                    <div className="star">
                        <img src="./img/star.png" alt="" srcset="" />
                        <span>{item.star}</span>
                    </div>
                </div>
                <hr />
                <div className="details">
                    <img src="./img/heart.png" alt="" srcset="" />
                    <div className="price">
                        <span>STARTING AT</span>
                        <h2>${item.price}</h2>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default GigCard
