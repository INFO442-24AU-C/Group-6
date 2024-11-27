import React, { useState, useEffect } from 'react';
import { auth, database } from '../index';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Notification from './Notification'; 
import './Myevent.css';

function MyEvent() {
    const [myEvents, setMyEvents] = useState([]);
    const [eventIds, setEventIds] = useState([]); 

    useEffect(() => {
        fetchMyEvents();
    }, [auth.currentUser]);

    async function fetchMyEvents() {
        if (auth.currentUser) {
            const q = query(collection(database, "RSVP"), where("userId", "==", auth.currentUser.uid));
            try {
                const querySnapshot = await getDocs(q);
                const events = [];
                const ids = []; 
                for (const doc of querySnapshot.docs) {
                    const data = doc.data();
                    ids.push(data.eventId); 
                    const eventDetails = await fetchEventDetails(data.eventId);
                    if (eventDetails) {
                        events.push({
                            name: data.eventName,
                            image: eventDetails.images[0].url,
                            date: new Date(eventDetails.dates.start.localDate).toLocaleDateString()
                        });
                    }
                }
                setMyEvents(events);
                setEventIds(ids);
            } catch (error) {
                console.error("Error fetching RSVP'd events:", error);
            }
        }
    }

    async function fetchEventDetails(eventId) {
        const apiKey = "9PrNGB9k7uy3dln6mBGBtGxL6vMXW86B";
        const url = `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${apiKey}`;
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error("Error fetching event details:", error);
            return null;
        }
    }

    return (
        <div className="app-container">
            <div className="container">
            <aside>
                <Notification eventIds={eventIds} /> 
            </aside>
                <main>
                    <section className="welcome">
                        <h1>Welcome to My Event</h1>
                    </section>
                    <section className="upcoming">
                        <h2>Upcoming Events</h2>
                        <div className="events-container">
                            {myEvents.length > 0 ? myEvents.map((event, index) => (
                                <div key={index} className="event-card">
                                    <img src={event.image} alt={event.name} className="event-image"/>
                                    <h3>{event.name}</h3>
                                    <p>{event.date}</p>
                                </div>
                            )) : <p>You have not RSVP'd to any events.</p>}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default MyEvent;



