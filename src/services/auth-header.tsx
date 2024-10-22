export default function authHeader(){
  const userString = localStorage.getItem("user");
  if(userString != null){
    const user = JSON.parse(userString);
    if(user && user.accessToken){
      console.log('token')
      return {"Authorization":'Bearer ' + user.accessToken};
    }else{
      return {};
    }
  }
  return {};
}

export function getEmailFromToken(): string {
  const userString = localStorage.getItem("userEmail");

  if (userString) {
    const user = JSON.parse(userString);
    
    if (user) {
      try {
        console.log(user);
        return user;
      } catch (error) {
        
        return "";
      }
    }
  }

  return "";
}

