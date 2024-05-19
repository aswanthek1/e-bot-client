import './Header.css'
import { getSession, logout } from '../../../utils/common.utils';
import { Link, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io("http://localhost:4000");

const Header = () => {

    const { isAdmin, isLoggedIn, userId } = getSession()
    const[notifications, setNotifications] = useState([])
    const navigate = useNavigate()
    const handleLogout = async () => {
        const confirmed = confirm("Are you sure you want to logout?")
        if (confirmed) {
            await logout()
            // navigate("/login")
            window.location.reload()
        }
    }
    useEffect(() => {
        // Subscribe to notifications
        socket.emit('subscribe', userId);
        socket.on("teamUpdated", (notification) => {
            console.log(notification, 'notifation siss')
            setNotifications((prev) => [...prev, notification.notification]);
        })
    }, [userId])
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid header-container">
                <Link to={'/'} className="navbar-brand">
                    {/* <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top"> */}
                    E-BOT
                </Link>
                <div className='header-actions'>
                    {
                        isLoggedIn &&
                        <button
                            type='button'
                            className='btn btn-sm btn-danger'
                            onClick={handleLogout}
                        >Logout</button>
                    }
                    <Link to={'/notifications'} className='btn btn-sm btn-warning'><i className="bi bi-bell-fill"></i><span className="badge text-bg-secondary">{notifications.length}</span></Link>
                </div>
            </div>
        </nav>
    )
}

export default Header;