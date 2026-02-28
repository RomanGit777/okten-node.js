import React, { useEffect, useState } from "react";
import axios from "axios";

export const App = () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get("/api/users").then(({ data : users }) => setUsers(users));
    }, []);

    return (
        <div>
            <h1>Users!!</h1>
            {users.map(user => (JSON.stringify(user)))}
        </div>
    );
};
