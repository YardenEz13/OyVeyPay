import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import '../styles/Navbar.css';
import { logout } from '../api/auth';

export const Navbar = () => {
const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate();

const handleLogout = async () => {
try {
await logout();
navigate('/auth');
} catch (error) {
console.error('Logout failed:', error);
}
};

return (
<nav className="navbar">
<Link to="/" className="navbar-logo">
<img src="/images/logo.webp" alt="Logo" width={30} height={50} />
</Link>

<div className={`navbar-links ${isOpen ? 'open' : ''}`}>
<NavLink
to="/"
className={({ isActive }) => (isActive ? 'active' : '')}
onClick={() => setIsOpen(false)}
>
Home
</NavLink>
<NavLink
to="/expenses"
className={({ isActive }) => (isActive ? 'active' : '')}
onClick={() => setIsOpen(false)}
>
Expenses
</NavLink>
<NavLink
to="/incomes"
className={({ isActive }) => (isActive ? 'active' : '')}
onClick={() => setIsOpen(false)}
>
Incomes
</NavLink>
<NavLink
to="/auth"
onClick={handleLogout}
>
Logout
</NavLink>
</div>
<div className="hamburger" onClick={() => setIsOpen(!isOpen)}
>
<span className="bar"></span>
<span className="bar"></span>
<span className="bar"></span>
</div>
</nav>
);
};