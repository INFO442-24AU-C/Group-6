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
                    const personalizedNotification = `Thank you and congrats on RSVPing for ${data.eventName}.
                        Check your inbox the week of the event to receive a check-in location and instructions 
                        for your mission. We look forward to connecting with you!`;
                    allNotifications.push(personalizedNotification);

                    // const userName = await fetchUserName(data.userId);
                    // allNotifications.push(`${userName} is also attending ${data.eventName}`);
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
                notifications.map((note, index) => 
                    <div key={index} className="border border-dark bg-white p-3 mb-3 rounded">
                        {note}
                    </div>)
            ) : (
                <p>No new notifications.</p>
            )}
        </div>
    );
}

export default Notification;




