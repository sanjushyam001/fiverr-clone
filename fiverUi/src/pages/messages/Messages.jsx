import React from 'react'
import { useQuery } from "@tanstack/react-query"
import { Link } from 'react-router-dom'
import "./Messages.scss"
import newRequest from "../../utils/newRequest";
import moment from "moment"
const Message = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });


  console.log(error);
  return (
    <div className='messages'>
      {
        isLoading ? ("Loading .. ") : error ? ("error") :
          (<div className="container">
            <div className="title">
              <h1>Messages</h1>

            </div>
            <table>
              <tr>
                <th>Buyer</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>

              {
                data.map((c) => (
                  <tr className='active' key={c.id}>
                    <td>
                      {currentUser.isSeller ? c.buyerId : c.sellerId}
                    </td>
                    <td><Link to="/message/123" className="link">{c?.lastMessage?.substring(0, 100)}...</Link></td>
                    <td>{moment(c.updatedAt).fromNow()}</td>
                    <td>
                      <button>Mark as read</button>
                    </td>

                  </tr>
                ))
              }


            </table>
          </div>)
      }
    </div>
  )
}

export default Message
