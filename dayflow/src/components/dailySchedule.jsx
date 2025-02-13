import React from "react";
import '../app.css';

function DailySchedule() {
    return (
    <table className="calendar-table" id="table">
        <tbody>
        <tr>
            <td>6:00am</td>
            <td id="6am"></td>
        </tr>
        <tr>
            <td>6:30am</td>
            <td id="63am"></td>
        </tr>
        <tr>
            <td>7:00am</td>
            <td id="7am"></td>
        </tr>
        <tr>
            <td>7:30am</td>
            <td id="73am"></td>
        </tr>
        <tr>
            <td>8:00am</td>
            <td id="8am"></td>
        </tr>
        <tr>
            <td>8:30am</td>
            <td id="83am"></td>
        </tr>
        <tr>
            <td>9:00am</td>
            <td id="9am"></td>
        </tr>
        <tr>
            <td>9:30am</td>
            <td id="93am"></td>
        </tr>
        <tr>
            <td>10:00am</td>
            <td id="10am"></td>
        </tr>
        <tr>
            <td>10:30am</td>
            <td id="103am"></td>
        </tr>
        <tr>
            <td>11:00am</td>
            <td id="11am"></td>
        </tr>
        <tr>
            <td>11:30am</td>
            <td id="113am"></td>
        </tr>
        <tr>
            <td>12:00pm</td>
            <td id="12pm"></td>
        </tr>
        <tr>
            <td>12:30pm</td>
            <td id="123pm"></td>
        </tr>
        <tr>
            <td>1:00pm</td>
            <td id="1pm"></td>
        </tr>
        <tr>
            <td>1:30pm</td>
            <td id="13pm"></td>
        </tr>
        <tr>
            <td>2:00pm</td>
            <td id="2pm"></td>
        </tr>
        <tr>
            <td>2:30pm</td>
            <td id="23pm"></td>
        </tr>
        <tr>
            <td>3:00pm</td>
            {/*Existing event from database*/}
            <td className="event" id="3pm">Class</td>
        </tr>
        <tr>
            <td>3:30pm</td>
            <td className="event" id="33pm">Class</td>
        </tr>
        <tr>
            <td>4:00pm</td>
            <td className="event" id="4pm">Class</td>
        </tr>
        <tr>
            <td>4:30pm</td>
            <td className="event" id="43pm">Class</td>
        </tr>
        <tr>
            <td>5:00pm</td>
            <td id="5pm"></td>
        </tr>
        <tr>
            <td>5:30pm</td>
            <td id="53pm"></td>
        </tr>
        <tr>
            <td>6:00pm</td>
            <td id="6pm"></td>
        </tr>
        <tr>
            <td>6:30pm</td>
            <td id="63pm"></td>
        </tr>
        <tr>
            <td>7:00pm</td>
            <td id="7pm"></td>
        </tr>
        <tr>
            <td>7:30pm</td>
            <td id="73pm"></td>
        </tr>
        <tr>
            <td>8:00pm</td>
            <td id="8pm"></td>
        </tr>
        </tbody>
    </table>
);
}

export default DailySchedule;