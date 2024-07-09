import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const EditProfileForm = () => {
  const { user } = useAuthContext();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');  
  const [error, setError] = useState(null)  
  const [isLoading, setIsLoading] = useState(null)

  useEffect(() => {
    if (user) {
      setName(user.user.name);
      setSurname(user.user.surname);
      setError(null)
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/userOperations/updateUserData', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`},
        body: JSON.stringify({name, surname})
      });
      const data = await response.json();

      if(!response.ok){
        setIsLoading(false)
        setError(data.error)
      }

      if(response.ok){

        let userStorage = JSON.parse(localStorage.getItem('user'))
      
        userStorage.user.name = data.user.name
        userStorage.user.surname = data.user.surname
      
        localStorage.setItem('user', JSON.stringify(userStorage)) 

        setIsLoading(false)
      }     
    } catch (error) {
      console.error('Error updare user:', error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Profile</h2>
      <label>
        Name:
        <input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Surname:
        <input type="text" placeholder="Enter surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
      </label>      
      {error && <div>{error}</div>}
      <button type="submit" disabled={isLoading}>Update</button>
    </form>
  );
};

export default EditProfileForm;
