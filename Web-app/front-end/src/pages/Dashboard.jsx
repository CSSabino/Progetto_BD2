import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuthContext } from '../hooks/useAuthContext';
import EditProfileForm from '../components/EditProfileForm';
import UserReviews from '../components/UserReviews';
import SmartphoneOperation from '../components/SmartphoneOperations';


function Dashboard() {
    const { user } = useAuthContext()
    const userLogged = user.user

    return (
        <div className="dashboard">
          <Sidebar />
          
          <div className='content'>
            <p>Ciao {userLogged.username}, benvenuto sul portale "Phone Comparison"</p>
            {userLogged.isAdmin && (
            <p>In qualità di admin, puoi effettuare operazioni ci inserimento, cancellazione ed aggiornamento degli smartphone presenti in piattaforma!</p>
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