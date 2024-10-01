import React from 'react';

const UserList = ({ users, editUser, deleteUser }) => {
  return (
    <div>
      <h2>User List</h2>
      <ul className="list-group">
        {users.map(user => (
          <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center user-card">
            <div>
              <strong>{user.name}</strong> <span>({user.email})</span>
              <p>{user.company.name}</p>
            </div>
            <div>
              <button className="btn btn-primary btn-sm me-2" onClick={() => editUser(user)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
