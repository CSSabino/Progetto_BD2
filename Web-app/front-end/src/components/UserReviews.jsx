import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

const UserReviews = () => {
  const { user, loading } = useAuthContext();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchReviews = async () => {
        try {
          const response = await axios.get(`/api/users/${user.id}/reviews`);
          setReviews(response.data);
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
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>{review.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserReviews;
