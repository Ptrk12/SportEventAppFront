import { createContext, useState, ReactNode, useEffect } from 'react';

type User = {
  firstName: string;
  lastName: string;
};

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean; // Add this to indicate loading
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
    setIsLoading(false); 
  }, []);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user)); 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); 
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
