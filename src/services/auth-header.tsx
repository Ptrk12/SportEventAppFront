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