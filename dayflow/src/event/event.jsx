import React, {useEffect, useState} from 'react';
import '../app.css';
import DailySchedule from '../components/dailySchedule';

export function Event() {
    const [events, setEvents] = useState([]);
    const [friendEmail, setFriendEmail] = useState('');
    const username = localStorage.getItem('username');

    useEffect( () => {
        const f = async () => {
            let data;
            try {
                const response = await fetch('/api/events', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                data = await response.json();
                // console.log(data.msg);
            } catch (error) {
                console.log('Error deleting events: ', error.message);
                console.log(error.stack);
            }

            let storedEvents;
            if (data.msg === "Unauthorized") {
                storedEvents = [];
            } else {
                storedEvents = data;
            }

            setEvents(storedEvents);
        }
        f();
    }, []);

    const timeOptions = [
        "6:00am", "6:30am", "7:00am", "7:30am", "8:00am", "8:30am",
        "9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am",
        "12:00pm", "12:30pm", "1:00pm", "1:30pm", "2:00pm", "2:30pm",
        "3:00pm", "3:30pm", "4:00pm", "4:30pm", "5:00pm", "5:30pm",
        "6:00pm", "6:30pm", "7:00pm", "7:30pm", "8:00pm", "8:30pm", "9:00pm",
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Collect form data
        const formData = new FormData(event.target);
        const newEvent = Object.fromEntries(formData.entries());

        const startTime = parseTime(newEvent.start_time);
        const endTime = parseTime(newEvent.end_time);
        const email = newEvent.email;
        newEvent.username = username;

        if (email) {
            //TODO: This is the websocket stuff
            setFriendEmail(String(email));
        }

        // Validate that end time is later than start time
        if (endTime <= startTime) {
            alert("End time must be later than start time.");
            return; // Prevent form submission
        }

        let data;
        try {
            const response = await fetch('/api/event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });

            data = await response.json();
            console.log(data.msg);
        } catch (error) {
            console.error('Error creating event: ', error)
            return;
        }

        const updatedEvents = [...events, newEvent];
        localStorage.setItem("events", JSON.stringify(updatedEvents));

        // Update state
        setEvents(updatedEvents);

        console.log('Event saved:', newEvent);

        event.target.reset();
    };

    const deleteUsersEvents = async () => {
        // Clear local storage and reset events
        try {
            const response = await fetch('/api/events', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log(data.msg);
        } catch (error) {
            console.log('Error deleting events: ', error.message);
            console.log(error.stack);
            return;
        }

        localStorage.setItem("events", JSON.stringify([]));
        setEvents([]);
        // console.log("Events cleared");
    };

    const parseTime = (time) => {
        const [hour, minutePart] = time.split(":");
        const minutes = parseInt(minutePart.slice(0, 2), 10);
        const isAM = time.includes("am");

        let hours = parseInt(hour, 10);
        if (!isAM && hours !== 12) {
            hours += 12; // Convert PM times to 24-hour format
        }
        if (isAM && hours === 12) {
            hours = 0; // Convert 12:00am to midnight
        }

        return hours * 60 + minutes; // Return total minutes since midnight
    };

    return (
        <div className="container">
            <main className="event_main_container">
                <div className="left-box">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label>
                                    <input type="text" placeholder="Event Name" name="event_name" required
                                           className="event-full-width-container"/>
                                </label>
                            </div>
                            <div className="field">
                                <label>Start Time:</label>
                                <select name="start_time" required className="custom-dropdown">
                                    {timeOptions.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                                {/*<p className="newLine">-</p>*/}
                                <label className="end-time">End Time:</label>
                                <select name="end_time" required className="custom-dropdown">
                                    {timeOptions.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="field">
                                <label>
                                    <input type="text" placeholder="Friend's Email Address" name="email"
                                           className="event-full-width-container"/>
                                </label>
                            </div>
                            <button type="submit" style={{
                                marginTop: '20px',
                                backgroundColor: '#acd6e4',
                                color: 'black',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                width: '209px'
                            }}>Create Event</button>
                        </form>

                        <button onClick={deleteUsersEvents} style={{
                            marginTop: '12px',
                            backgroundColor: '#e4acac',
                            color: 'black',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer',
                            width: '209px'
                        }}>
                            Clear Today's Events
                        </button>

                        <div className="websocket-box">
                            {friendEmail || "Talk to planning friend here"}
                        </div>
                    </div>
                </div>

                <DailySchedule events={events}/> {}

            </main>
        </div>
    );
}