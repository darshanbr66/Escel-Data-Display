import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserTable.css"; // Assuming you have a CSS file for styling

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [editedUsers, setEditedUsers] = useState({});
  const [newUser, setNewUser] = useState({ name: "", addressLine1: "", addressLine2: "" });

  // Fetch users from the backend when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:3002/api/fetch-users")
      .then((response) => {
        setUsers(response.data.data);
        console.log(response);
      })
      .catch((error) => console.error("Error fetching users:", error));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleEdit = (id, field, value) => {
    setEditedUsers({
      ...editedUsers,
      [id]: {
        ...editedUsers[id],
        [field]: value,
      },
    });
  };

  const handleUpdateAll = () => {
    const updates = Object.keys(editedUsers).map((id) => ({
      slNo: parseInt(id),
      ...editedUsers[id],
    }));

    axios
      .put("http://localhost:3002/api/update-users", updates)
      .then((response) => {
        console.log(response.data.message);
        // Update the table data after a successful update
        setUsers(response.data.data);
        setEditedUsers({});
      })
      .catch((error) => console.error("Error updating users:", error));
  };

  const handleNewUserChange = (field, value) => {
    setNewUser({
      ...newUser,
      [field]: value,
    });
  };

  const handleAddUser = () => {
    axios
      .post("http://localhost:3002/api/add-user", newUser)
      .then((response) => {
        console.log(response.data.message);
        // Refresh the user list and reset the form
        fetchUsers();
        setNewUser({ name: "", addressLine1: "", addressLine2: "" });
      })
      .catch((error) => console.error("Error adding user:", error));
  };

  return (
    <div className="user-table-container">
      <h2 className="title">User Management</h2>

      {/* Filter */}
      <input
        type="text"
        placeholder="Filter by name"
        value={filter}
        onChange={handleFilterChange}
        className="filter-input"
      />

      {/* Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Name</th>
            <th>Address Line 1</th>
            <th>Address Line 2</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => user.name.toLowerCase().includes(filter.toLowerCase()))
            .map((user) => (
              <tr key={user.slNo}>
                <td>{user.slNo}</td>
                <td>
                  <input
                    type="text"
                    defaultValue={user.name}
                    onChange={(e) => handleEdit(user.slNo, "name", e.target.value)}
                    className="editable-input"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    defaultValue={user.addressLine1}
                    onChange={(e) => handleEdit(user.slNo, "addressLine1", e.target.value)}
                    className="editable-input"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    defaultValue={user.addressLine2}
                    onChange={(e) => handleEdit(user.slNo, "addressLine2", e.target.value)}
                    className="editable-input"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Add User Form */}
      <div className="add-user-form">
        <h3>Add New User</h3>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => handleNewUserChange("name", e.target.value)}
          className="add-user-input"
        />
        <input
          type="text"
          placeholder="Address Line 1"
          value={newUser.addressLine1}
          onChange={(e) => handleNewUserChange("addressLine1", e.target.value)}
          className="add-user-input"
        />
        <input
          type="text"
          placeholder="Address Line 2"
          value={newUser.addressLine2}
          onChange={(e) => handleNewUserChange("addressLine2", e.target.value)}
          className="add-user-input"
        />
        <button onClick={handleAddUser} className="add-user-button">
          Add User
        </button>
      </div>

      
      <button onClick={handleUpdateAll} className="update-all-button">
        Save
      </button>
    </div>
  );
};

export default UserTable;
