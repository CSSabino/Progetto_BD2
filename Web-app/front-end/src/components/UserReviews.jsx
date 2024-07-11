import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const UserReviews = () => {
  const { user, loading } = useAuthContext();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchReviews = async () => {
        try {
          const response = await fetch('/api/userOperations/getListReviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }
        });
          
        const data = await response.json();

        if(response.ok){
          console.log(data.listReview);
          setReviews(data.listReview)
        }

        if(!response.ok){
          setError(data.error);
        }

        } catch (err) {
          setError(err);
        }
      };
      fetchReviews();
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading reviews</p>;

  return (
    <div>
      <h2>My Reviews</h2>
      {reviews.length > 0 && (
        <ul>
        {reviews.map((review) => (
          <><Link to={`/phone/${review.smartphoneId_reviewed}`}>Link to smartphone</Link><span><br></br>Rating: {review.rating}
            <br></br>
            Comment: {review.comment}</span><br></br><br></br></>
        
        ))}
      </ul>
      )}
      {reviews.length <= 0 && (
        <p>Non hai ancora recensioni</p>
      )}
    </div>
  );
};

export default UserReviews;
