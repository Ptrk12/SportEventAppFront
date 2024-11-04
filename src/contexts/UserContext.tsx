import { createContext, useState, ReactNode, useEffect } from 'react';
import api from '../requests/req';
import authHeader from '../services/auth-header';

type User = {
  email: string;
  money: number;
};

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean; 
  fetchUserInfo: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserInfo = async () => {
    try {
      const response = await api.get('/user/user-info',{headers :authHeader()});
      const userData = response.data;
      setUser({ email: userData.email, money: userData.money });
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const initUserInfo = async () => {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        await fetchUserInfo(); 
      }
      setIsLoading(false); 
    };

    initUserInfo();
  }, []);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user)); 
    fetchUserInfo();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); 
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading, fetchUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
