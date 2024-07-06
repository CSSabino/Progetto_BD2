import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

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
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

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
            <label>Username:</label>

            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />

            <label>Email address:</label>

            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password:</label>

            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <label>Confirm password:</label>

            <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
            />

            <button type="submit" disabled={isLoading}>Sign up</button>
            {errorMatchin && <p>{errorMatchin}</p>}
            {error && <div>{error}</div>}
        </form>
    )
}

export default Signup;