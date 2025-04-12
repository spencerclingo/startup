import React from 'react';
import '../app.css';

function DailySchedule({ events }) {
    // Helper function to find events for a specific time slot
    const getEventsForTimeSlot = (time) => {
        return events.filter((event) => {
            const startTime = parseTime(event.start_time);
            const endTime = parseTime(event.end_time);
            const currentTime = parseTime(time);

            return currentTime >= startTime && currentTime < endTime;
        });
    };

    // Helper function to parse time (e.g., '6:00am') into minutes since midnight
    const parseTime = (time) => {
        const [hour, minutePart] = time.split(":");
        const minutes = parseInt(minutePart.slice(0, 2), 10);
        const isAM = time.includes("am");

        let hours = parseInt(hour, 10);
        if (!isAM && hours !== 12) {
            hours += 12; // Convert PM times to 24-hour format
        }
        if (isAM && hours === 12) {
            hours = 0; // Convert 12 AM to midnight
        }

        return hours * 60 + minutes; // Return total minutes since midnight
    };

    return (
        <table className="calendar-table" id="table">
            <tbody>
            {[
                '6:00am', '6:30am',
                '7:00am', '7:30am',
                '8:00am', '8:30am',
                '9:00am', '9:30am',
                '10:00am', '10:30am',
                '11:00am', '11:30am',
                '12:00pm', '12:30pm',
                '1:00pm', '1:30pm',
                '2:00pm', '2:30pm',
                '3:00pm', '3:30pm',
                '4:00pm', '4:30pm',
                '5:00pm', '5:30pm',
                '6:00pm', '6:30pm',
                '7:00pm', '7:30pm',
                '8:00pm', '8:30pm',
                '9:00pm'
                /* Add more times as needed */
            ].map((time) => (
                <tr key={time}>
                    <td>{time}</td>
                    <td id={time.replace(':', '').replace(' ', '')}>
                        {getEventsForTimeSlot(time).map((event, index) => (
                            <div key={index}>{event.event_name}</div>
                        ))}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default DailySchedule;
