import React, { useState, useEffect } from 'react';
import { auth, database } from '../index';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

function Notification({ eventIds }) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (eventIds.length > 0) {
            fetchNotifications(eventIds);
        }
    }, [eventIds]);

    const fetchNotifications = async (eventIds) => {
        let allNotifications = [];
        for (const eventId of eventIds) {
            const q = query(collection(database, "RSVP"), where("eventId", "==", eventId));
            const querySnapshot = await getDocs(q);
            for (const doc of querySnapshot.docs) {
                const data = doc.data();
                if (data.userId !== auth.currentUser.uid) {
                    
                    const userName = await fetchUserName(data.userId);
                    allNotifications.push(`${userName} is also attending ${data.eventName}`);
                }
            }
        }
        setNotifications(allNotifications);
    };

    const fetchUserName = async (userId) => {
        const userRef = doc(database, "users", userId);
        const userSnap = await getDoc(userRef);
        return userSnap.exists() ? userSnap.data().name : "Unknown User"; 
    };

    return (
        <div>
            <h2>Notifications</h2>
            {notifications.length > 0 ? (
                notifications.map((note, index) => <p key={index}>{note}</p>)
            ) : (
                <p>No new notifications.</p>
            )}
        </div>
    );
}

export default Notification;

