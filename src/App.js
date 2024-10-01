import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/userList';
import UserForm from './components/userForm'; 
import'./style.css';
const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch all users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleSaveUser = async (user) => {
    if (user.id) {
      try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
        setUsers(users.map(u => u.id === user.id ? response.data : u));
      } catch (error) {
        console.error('Error updating user', error);
      }
    } else {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', user);
        setUsers([...users, response.data]);
      } catch (error) {
        console.error('Error adding user', error);
      }
    }
    setSelectedUser(null);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  return (
    <div className="container">
      <h1>User CRUD App</h1>
      <UserForm saveUser={handleSaveUser} selectedUser={selectedUser} />
      <UserList users={users} editUser={handleEditUser} deleteUser={handleDeleteUser} />
    </div>
  );
};

export default App;
