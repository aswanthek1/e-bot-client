import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './Notifications.css'
import { getSession } from '../../../utils/common.utils';
import Header from '../../components/Header/Header';
import axios from 'axios';
import { config } from '../../../config/config';
const socket = io('http://localhost:4000')

const {BACKEND_BASE_URL} = config

const Notification = () => {
    const [notifications, setNotifications] = useState([])
    const { userId, token } = getSession()
    useEffect(() => {
        // Subscribe to notifications
        socket.emit('subscribe', userId);
        socket.on("teamUpdated", (notification) => {
            setNotifications((prev) => [ notification.notification, ...prev]);
        })
    }, [userId])

    useEffect(() => {
        fetchNotifications()
    },[])

    const fetchNotifications = async() => {
        try {
            const {data} = await axios.get(`${BACKEND_BASE_URL}/user/notifications`, {headers: {"authorization": token}})
            console.log(data, 'db notifications')
            setNotifications(data.data)
        } catch (error) {
            console.log(error, 'err')
        }
    }

    return (
        <>
            <Header />
            <div className="notification-list">
                {notifications?.length ? <h1 className='mb-4 text-align-center' >Notifications</h1> : null}
                {notifications?.length ? notifications.map((notification, index) => (
                    <div key={index} className="notification mt-2">
                        {notification.message}
                    </div>
                ))
                : <h2 className='mt-5' >No notifications available</h2>
            }
            </div>
        </>
    )
}

export default Notification;