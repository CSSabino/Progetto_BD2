import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

import '../style/modal.css'

const EditUserModal = ({ isOpen, onClose }) => {
    const { user } = useAuthContext();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.user.name);
            setSurname(user.user.surname);
            setError(null)
        }
    }, []);

    useEffect(() => {
        if (user) {
            let userStorage = JSON.parse(localStorage.getItem('user'))
            setName(userStorage.user.name);
            setSurname(userStorage.user.surname);
            setError(null)
        }
    }, [onClose]);


    const handleUpdateUser = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/userOperations/updateUserData', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
                body: JSON.stringify({ name, surname })
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.error)
                return;
            }

            if (response.ok) {

                let userStorage = JSON.parse(localStorage.getItem('user'))

                userStorage.user.name = data.user.name
                userStorage.user.surname = data.user.surname

                localStorage.setItem('user', JSON.stringify(userStorage))

            }

        } catch (error) {
            console.error('Error update user:', error);
            setError(error)
        }

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Update user data</h2>
                <form onSubmit={handleUpdateUser}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <br></br>
                    <label>
                        Surname:
                        <input
                            type="text"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            required
                        />
                    </label>

                    <br></br>
                    <br></br>


                    {error && <p>{error}</p>}

                    <button type="submit">Update</button>

                </form>
            </div>
        </div>
    );
};

export default EditUserModal;
