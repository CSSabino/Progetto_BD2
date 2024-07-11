import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/phoneDetails.css'

function PhoneDetails() {
  const { id } = useParams();

  const [smartphone, setSmartphone] = useState([]);
  const [error, setError] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [reviewError, setReviewError] = useState('');
  useEffect(() => {
    
    const fetchPhoneDetails = async () => {
      try {
        const response = await fetch(`/api/smartphoneOperations/id/${id}`);
        const data = await response.json();
        setSmartphone(data);
      } catch (err) {
        setError('Error fetching phone details');
      }
    };

    fetchPhoneDetails();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comment) {
      setReviewError('Rating and comment are required.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    if (!token) {
      setReviewError('You must be logged in to submit a review.');
      return;
    }

    try {
      const response = await fetch('/api/smartphoneOperations/addReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          smartphoneId: id,
          rating,
          comment
        })
      });

      const data = await response.json();
      if (response.ok) {
        setSmartphone(data);
        setRating('');
        setComment('');
        setReviewError('');
      } else {
        setReviewError(data.error || 'Failed to add review.');
      }
    } catch (err) {
      setReviewError('Failed to add review.');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!smartphone) return <p>No smartphone found</p>;


  return (
    <div className="phone-details-container">
      <div className="phone-details-box">
        <h1>{smartphone.model}</h1>
        <p>Brand: {smartphone.brand_name}</p>
        <p>Price: ${smartphone.price}</p>
        <p>Rating: {smartphone.rating}</p>
        <p>Internal memory: {smartphone.internal_memory} GB</p>
        <p>5G: {smartphone.has_5g}</p>
        <p>NFC: {smartphone.has_nfc}</p>
        <p>Ir_blaster: {smartphone.has_ir_blaster}</p>
        <p>Processor Brand: {smartphone.processor_brand}</p>
        <p>Number of Cores: {smartphone.num_cores}</p>
        <p>Processor Speed: {smartphone.processor_speed}</p>
        <p>Battery Capacity: {smartphone.battery_capacity}</p>
        <p>Fast Charging Available: {smartphone.fast_charging_available}</p>
        <p>RAM Capacity: {smartphone.ram_capacity}</p>
        <p>Screen Size: {smartphone.screen_size}</p>
        <p>Refresh Rate: {smartphone.refresh_rate}</p>
        <p>Resolution: {smartphone.resolution}</p>
        <p>Number of Rear Cameras: {smartphone.num_rear_cameras}</p>
        <p>Number of Front Cameras: {smartphone.num_front_cameras}</p>
        <p>Operating System: {smartphone.os}</p>
        <p>Primary Rear Camera: {smartphone.primary_camera_rear}</p>
        <p>Primary Front Camera: {smartphone.primary_camera_front}</p>
        <p>Extended Memory Available: {smartphone.extended_memory_available}</p>
      </div>

      <h2>Reviews</h2>
      {smartphone.reviews && smartphone.reviews.length > 0 ? (
        smartphone.reviews.map((review) => (
          <div key={review._id} className="review">
            <p><strong>{review.user_username}</strong></p>
            <p>Rating: {review.rating}</p>
            <p>{review.comment}</p>
            <p>{new Date(review.review_date).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}

      <h3>Add a Review</h3>
      {reviewError && <p style={{ color: 'red' }}>{reviewError}</p>}
      <form onSubmit={handleReviewSubmit} className="review-form">
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="10"
            required
          />
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default PhoneDetails;
