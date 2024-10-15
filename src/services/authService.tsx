import api from '../requests/req';

const login = (email: string, password: string) => {
  return api.post('/login', {
    email,
    password,
  })
  .then((response: any) => {
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data; 
  });
};

const register = (email:string, password:string) => {
  return api.post('/register',{
    email,
    password
  })
  .then((response:any)=>{
    if(response.status === 200){
      return true;
    }else{
      return false;
    }
  })
}

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const authService = {
  login,
  logout,
  getCurrentUser,
  register
};

export default authService;
