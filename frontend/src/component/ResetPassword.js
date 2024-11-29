import React, { useState } from 'react';
import axios from 'axios';

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = () => {
        axios.post('http://localhost:8888/reset-password', { email, code, newPassword })
            .then(response => {
                // Handle success (e.g., redirect to login)
                alert('Password has been reset successfully.');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error resetting your password.');
            });
    };

    return (
        <div className="reset-password">
            <h3>Reset Password</h3>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter reset code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleSubmit}>Reset Password</button>
        </div>
    );
}

export default ResetPassword;