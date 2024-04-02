import React from 'react'
import "./GigCard.scss"
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom'
import newRequest from '../../utils/newRequest';
const GigCard = ({ item }) => {
    const { isLoading, error, data } = useQuery({
        queryKey: [item.userId],
        queryFn: () =>
            newRequest
                .get(
                    `/users/${item.userId}`
                )
                .then((res) => {
                    return res.data;
                }),
    });
    console.log("------------USER DATA -----------");
    console.log("USER DATA ", data);
    return (
        <Link to={`/gig/${item._id}`} className='link'>
            <div className='gigCard'>
                <img src={item.cover} alt="" srcset="" />
                <div className="info">
                    {
                        isLoading ? ("Loading .. ")
                            : error ? ("something went wrong ")
                                : (
                                    <div className="user">
                                        <img src={data.img || "./img/check.png"} alt="" srcset="" />
                                        <span>{data.username}</span>
                                    </div>
                                )
                    }
                    <p>{item.desc}</p>
                    <div className="star">
                        <img src="./img/star.png" alt="" srcset="" />
                        <span>{!isNaN(item.totalStars / item.starNumber)
                            && Math.round((item.totalStars / item.starNumber))}</span>
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
