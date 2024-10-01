import React, { useState, useEffect } from 'react';

const UserForm = ({ saveUser, selectedUser }) => {
  const [user, setUser] = useState({ name: '', email: '', company: { name: '' } });

  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser);
    } else {
      setUser({ name: '', email: '', company: { name: '' } });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser(user);
  };

  return (
    <div className="mb-4">
      <h2>{selectedUser ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" id="name" name="name" value={user.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" id="email" name="email" value={user.email} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="company" className="form-label">Company</label>
          <input type="text" id="company" name="company" value={user.company.name} onChange={e => setUser({ ...user, company: { name: e.target.value } })} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-success">{selectedUser ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default UserForm;
