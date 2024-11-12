// UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}/role`);
        const snapshot = await get(userRef);
        const userRole = snapshot.exists() ? snapshot.val() : 'free';
        setRole(userRole);
        console.log("Usuario logueado con rol:", userRole); // Añade este console.log
      } else {
        setUser(null);
        setRole(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ user, role }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
