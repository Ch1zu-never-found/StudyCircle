import { useEffect, useState } from 'react';

const PROFILES = ['none', 'visual', 'dyslexic', 'adhd', 'auditory'];

export default function Profile() {
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('http://localhost:5000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()).then(setUser);
  }, []);

  async function updateProfile(profile) {
    const token = localStorage.getItem('token');
    await fetch('http://localhost:5000/api/auth/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ disability_profile: profile }),
    });
    setUser(u => ({ ...u, disability_profile: profile }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!user) return <p>Please <a href="/login">log in</a> to view your profile.</p>;

  return (
    <div className="profile-page">
      <h1>Welcome, {user.name}</h1>
      <p>{user.email}</p>
      <fieldset>
        <legend>Disability profile</legend>
        {PROFILES.map(p => (
          <label key={p} style={{ display: 'block' }}>
            <input
              type="radio"
              name="profile"
              checked={user.disability_profile === p}
              onChange={() => updateProfile(p)}
            />
            {p}
          </label>
        ))}
      </fieldset>
      {saved && <p role="status">Saved.</p>}
    </div>
  );
}