import React from 'react'

const LoginForm = ({
    onSubmit,
    username,
    password,
    setUsername,
    setPassword
}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                username
                <input
                    type='text'
                    value={username}
                    name='Username'
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type='password'
                    value={password}
                    name='Password'
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type='submit'>login</button>
        </form>
    )
}

export default LoginForm
