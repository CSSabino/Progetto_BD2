import React from 'react';
import { FaStar } from "react-icons/fa";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

function Review({ review }) {

    return (
        <div key={review._id} className="review">
            <p><strong>{review.user_username}</strong></p>
            <p>
                {[...Array(review.rating)].map((_, i) => (
              <FaStar key={i} className='icon-star'/>
            ))}
            ({review.rating})
            </p>
            <p className='comment'>"{review.comment}"</p>
            <p>{formatDistanceToNow(new Date(review.review_date), { addSuffix: true })}</p>
        </div>
    );
}

export default Review;
