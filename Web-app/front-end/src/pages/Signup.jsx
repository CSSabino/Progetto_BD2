import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

import '../style/register.css'

const Signup = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMatchin, setErrorMatching] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setErrorMatching('Passwords do not match');
            return;
          }
        
        await signup(name, surname, email, username, password)
    }

    return (
        <div className="register-container">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label>Name:</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <label>Surname:</label>

            <input
                type="text"
                onChange={(e) => setSurname(e.target.value)}
                value={surname}
            />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              </div>
              
              <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" disabled={isLoading}>Sign up</button>
            {errorMatchin && <p>{errorMatchin}</p>}
            {error && <div>{error}</div>}
          </form>
        </div>
      );
}

export default Signup;