import React from 'react';
import {useNavigate} from "react-router-dom";

export function Task() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform any form validation or data processing here
        navigate('/calendar');
    };

    return (
        <main>
            <table width="100%" id="task">
                <tbody>
                <tr>
                    <td style="text-align: center; vertical-align: middle">
                        <div className="info-box">
                            <p style="margin: 20px 10px 10px 10px">
                                You can use this page to create tasks that don't necessarily need a time frame, but just
                                need to be finished.
                            </p>
                        </div>

                        {/*TODO: Change this to POST once I have a backend*/}

                        <form method="get" onSubmit={handleSubmit}>
                            <div className="field">
                                <label>
                                    <input type="text" placeholder="task title" required/>
                                </label>
                            </div>
                            <NavLink to="calendar">
                                <button type="submit">Submit</button>
                            </NavLink>
                        </form>
                    </td>
                    <td>
                        <ul>
                            {/*This is all from the database-->*/}
                            <li><input type="checkbox" id="item1"/><label htmlFor="item1">Essay</label></li>
                            <li><input type="checkbox" id="item2"/><label htmlFor="item2">Call mom</label></li>
                            <li><input type="checkbox" id="item3"/><label htmlFor="item3">Math</label></li>
                        </ul>
                    </td>
                </tr>
                </tbody>
            </table>
        </main>
    );
}