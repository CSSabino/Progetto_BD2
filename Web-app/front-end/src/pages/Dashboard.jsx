import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuthContext } from '../hooks/useAuthContext';
import EditProfileForm from '../components/EditProfileForm';
import UserReviews from '../components/ListReviewsUser';
import SmartphoneOperation from '../components/SmartphoneOperations';


function Dashboard() {
    const { user } = useAuthContext()
    const userLogged = user.user

    return (
        <div className="dashboard">
          <Sidebar />
          
          <div className='content'>
            <h3>Hi {userLogged.username}, welcome on the "Phone Comparison" platform!</h3>
            {userLogged.isAdmin && (
            <h3>As an admin, you can carry out operations such as inserting, deleting and updating smartphones on the platform!</h3>
            )}
          </div>

          <div className="content">
            <Routes>
              <Route path="/profile" element={<EditProfileForm />} />
              <Route path="/reviews" element={<UserReviews />} />
              <Route path="/smartphoneOperations" element={<SmartphoneOperation />} />
            </Routes>
          </div>

        </div>
      );

}

export default Dashboard;