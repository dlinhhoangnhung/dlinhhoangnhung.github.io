// We also have methods for retrieving data from server.
// In the case we access protected resources, the HTTP request needs  header.
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('userInfo'));

  if (user && user.token) {
    return { 'Authorization': `${user.token}` };
  } else {
    return {};
  }
}

//   The code above checks Local Storage for user item. 
//   If there is a logged in user with accessToken (JWT), return HTTP Authorization header. 
//   Otherwise, return an empty object.