import { createContext, useState } from 'react';

const ReviewsContext = createContext();

const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([
    { author: "John Doe", rating: 4, review: "Great place! The landlord was very responsive.", tags: ["Close to campus", "Pet friendly", "Free parking"] },
    { author: "Jane Smith", rating: 5, review: "Loved living here! The maintenance was quick to respond.", tags: ["Safe neighborhood", "Great amenities"] },
    { author: "Alice Brown", rating: 3, review: "Decent place, but a bit noisy at night.", tags: ["Good price", "Near public transport"] },
    { author: "Bob Johnson", rating: 2, review: "Had issues with the landlord, slow to fix things.", tags: ["Affordable", "Lots of space"] }
  ]);

  const addReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export { ReviewsProvider, ReviewsContext };

