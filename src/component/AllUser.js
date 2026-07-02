import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/viewUsers"); // Change port if required
      setUsers(res.data);
    } catch (err) {
      console.log(err);
      setError("Unable to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          fontSize: "22px",
        }}
      >
        Loading Users...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          color: "red",
          fontSize: "22px",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        width: "90%",
        margin: "30px auto",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        All Users
      </h1>

      {users.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>No Users Found</h2>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#007bff",
                color: "#fff",
              }}
            >
              <th style={styles.th}>S.No</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Created At</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>
                  {new Date(user.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  th: {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "center",
  },
  td: {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "center",
  },
};

export default ViewUsers;