import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, database } from '../index';
import { doc, setDoc, getDoc } from "firebase/firestore";
import "./ExploreEvent.css";

function ExploreEvent() {
    const [events, setEvents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [rsvpedEventIds, setRsvpedEventIds] = useState(new Set());
    const navigate = useNavigate();

    async function fetchEvents(category = "") {
        try {
            let url = `https://app.ticketmaster.com/discovery/v2/events.json?dmaId=385&apikey=9PrNGB9k7uy3dln6mBGBtGxL6vMXW86B`;
            if (category) {
                url += `&classificationName=${encodeURIComponent(category)}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            const fetchedEvents = data._embedded?.events || [];
            setEvents(fetchedEvents);

            if (auth.currentUser) {
                const rsvpedIds = await fetchRSVPStatus(fetchedEvents.map(event => event.id));
                setRsvpedEventIds(new Set(rsvpedIds));
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    async function fetchRSVPStatus(eventIds) {
        const rsvpedIds = [];
        for (const eventId of eventIds) {
            const rsvpDocRef = doc(database, "RSVP", `${auth.currentUser.uid}_${eventId}`);
            const rsvpDocSnap = await getDoc(rsvpDocRef);
            if (rsvpDocSnap.exists()) {
                rsvpedIds.push(eventId);
            }
        }
        return rsvpedIds;
    }

    function handleCategoryChange(category) {
        setSelectedCategory(category);
        fetchEvents(category);
    }

    async function handleRSVP(eventId, eventName) {
        if (!auth.currentUser) {
            alert("Please log in to RSVP");
            return;
        }

        // Check if user has already RSVP'd for this event
        if (rsvpedEventIds.has(eventId)) {
            alert(`You have already RSVP'd for the event: ${eventName}`);
            return;
        }

        const rsvpRef = doc(database, "RSVP", `${auth.currentUser.uid}_${eventId}`);
        setDoc(rsvpRef, {
            userId: auth.currentUser.uid,
            eventId: eventId,
            eventName: eventName,
        }, { merge: true })
        .then(() => {
            setRsvpedEventIds((prev) => new Set(prev).add(eventId)); // Add eventId to the set
            alert("RSVP successful!");
            navigate('/Myevent');
        })
        .catch((error) => {
            console.error("Error writing document:", error);
        });
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="home mt-2">
            <div className="container">
                <div className="row g-2 mb-3">
                    <div className="col-12 col-md-auto">
                        <button
                            className={`btn ${selectedCategory === '' ? 'btn-dark' : 'btn-outline-secondary'}`}
                            onClick={() => handleCategoryChange('')}
                        >
                            All
                        </button>
                    </div>
                    <div className="col-12 col-md-auto">
                        <button
                            className={`btn ${selectedCategory === 'music' ? 'btn-dark' : 'btn-outline-secondary'}`}
                            onClick={() => handleCategoryChange('music')}
                        >
                            Music
                        </button>
                    </div>
                    <div className="col-12 col-md-auto">
                        <button
                            className={`btn ${selectedCategory === 'sports' ? 'btn-dark' : 'btn-outline-secondary'}`}
                            onClick={() => handleCategoryChange('sports')}
                        >
                            Sports
                        </button>
                    </div>
                    <div className="col-12 col-md-auto">
                        <button
                            className={`btn ${selectedCategory === 'arts & theatre' ? 'btn-dark' : 'btn-outline-secondary'}`}
                            onClick={() => handleCategoryChange('arts & theatre')}
                        >
                            Theater
                        </button>
                    </div>
                </div>
            </div>

            <div className="container py-4">
                <div className="row row-cols-2 row-cols-md-4 g-4">
                    {events.length > 0 ? events.map(event => (
                        <div key={event.id} className="card g-4">
                            <img src={event.images[0]?.url || ''} alt={event.name} className="card-img-top" />
                            <div className="card-body">
                                <h3 className="card-title">{event.name}</h3>
                                <p className="card-text mb-3">{new Date(event.dates.start.localDate).toLocaleDateString()}</p>
                                <div className="button-container mt-auto">
                                    <a href={event.url} target="_blank" rel="noopener noreferrer" className="btn btn-success">Get Tickets</a>
                                    <button 
                                        onClick={() => handleRSVP(event.id, event.name)} 
                                        className={`btn btn-primary ${!auth.currentUser ? 'disabled-btn' : ''}`}
                                        disabled={!auth.currentUser} // Disable if not logged in
                                    >
                                        RSVP
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : <p>No events found for this category.</p>}
                </div>
            </div>
        </div>
    );
}

export default ExploreEvent;


