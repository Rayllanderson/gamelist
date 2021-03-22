export default function authHeader() {
  const userToken = localStorage.getItem('@GameList:token');
  if (userToken) {
    return { 'Authorization': 'Bearer ' + userToken };
  } else {
    return {};
  }
}