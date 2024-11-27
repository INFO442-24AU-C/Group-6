import React, { useEffect, useState } from 'react';
import { auth, database } from '../index';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

function Notification({ eventIds }) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const unsubscribe = watchOtherRSVPs(eventIds);
        return () => unsubscribe.forEach(unsub => unsub()); 
    }, [eventIds]);

    const watchOtherRSVPs = (eventIds) => {
        return eventIds.map(eventId => {
            const q = query(collection(database, "RSVP"), where("eventId", "==", eventId), where("userId", "!=", auth.currentUser.uid));
            return onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === "added") {
                        const data = change.doc.data();
                        setNotifications(notifs => [...notifs, `${data.userName} is attending ${data.eventName} as well!`]);
                    }
                });
            });
        });
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
