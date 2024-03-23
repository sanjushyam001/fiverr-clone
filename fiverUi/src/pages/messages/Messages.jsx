import React from 'react'
import { Link } from 'react-router-dom'
import "./Messages.scss"
const Message = () => {
  const message = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci cupiditate a quaerat maxime maiores vitae voluptatibus numquam esse placeat eveniet dolorum architecto neque error fugit magni, fuga voluptate obcaecati libero? Sunt fuga similique quidem cupiditate excepturi perspiciatis minus laborum vitae, dignissimos officia at ipsam veritatis molestiae! Accusantium repellat aliquam consequuntur.`
  return (
    <div className='messages'>
      <div className="container">
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
          <tr className='active'>
            <td>
              John Doe
            </td>
            <td><Link to="/message/123" className="link">{message.substring(0, 100)}...</Link></td>
            <td>1 Day ago</td>
            <td>
              <button>Mark as read</button>
            </td>

          </tr>
          <tr className='active'>
            <td>
              John Doe
            </td>
            <td><Link to="/message/123" className="link">{message.substring(0, 100)}...</Link></td>
            <td>1 Day ago</td>
            <td>
              <button>Mark as read</button>
            </td>

          </tr>
          <tr>
            <td>
              John Doe
            </td>
            <td><Link to="/message/123" className="link">{message.substring(0, 100)}...</Link></td>
            <td>1 Day ago</td>

          </tr>
          <tr>
            <td>
              John Doe
            </td>
            <td><Link to="/message/123" className="link">{message.substring(0, 100)}...</Link></td>
            <td>1 Day ago</td>


          </tr>
          <tr>
            <td>
              John Doe
            </td>
            <td><Link to="/message/123" className="link">{message.substring(0, 100)}...</Link></td>
            <td>1 Day ago</td>


          </tr>
          <tr>
            <td>
              John Doe
            </td>
            <td><Link to="/message/123" className="link">{message.substring(0, 100)}...</Link></td>
            <td>1 Day ago</td>


          </tr>
        </table>
      </div>
    </div>
  )
}

export default Message
