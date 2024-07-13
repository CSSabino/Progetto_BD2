import React, { useEffect, useState } from 'react';

import UserReview from './UserReview';

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

          if (response.ok) {
            console.log(data.listReview);
            setReviews(data.listReview)
          }

          if (!response.ok) {
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
        <div className='userlist'>

          {reviews.map((review) => (

            <><UserReview review={review} /></>

          ))}
          
          </div>
      )}
          {reviews.length <= 0 && (
            <p>No reviews yet</p>
          )}
        </div>
      );
};

      export default UserReviews;
