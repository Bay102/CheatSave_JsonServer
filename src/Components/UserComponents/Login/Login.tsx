import React, { useState } from 'react';
import styles from './Login.module.css';
import { useAuthProvider } from '../../../Providers/AuthProvider';
import { toast } from 'react-toastify';
import { useAppProvider } from '../../../Providers/AppProvider';

export const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const { user, logIn, logOut } = useAuthProvider();
  const { setShowNav, setDisplay } = useAppProvider();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      logOut();
    }
    if (username && userPassword) {
      logIn({ username: username, password: userPassword }).catch((e) => {
        toast.error(e.message);
      });
      setShowNav(false);
      setDisplay('');
    } else toast.error('Silly! You didnt type anything!');
  };

  return (
    <>
      <form onSubmit={handleLogin} action="">
        <div className={styles.login_container}>
          <div className={styles.login_inputs}>
            <h2>Sign In</h2>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Username"
              type="text"
            />
            <input
              onChange={(e) => setUserPassword(e.target.value)}
              value={userPassword}
              placeholder="Password"
              type="password"
              // maxLength={6}
            />
            <button type="submit">Sign In</button>
          </div>
        </div>
      </form>
    </>
  );
};
