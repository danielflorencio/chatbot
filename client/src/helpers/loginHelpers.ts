import { SessionState } from "../features/sessionControl/sessionSlice";
import { redirect } from "react-router-dom";
export function verifyPageAccessPermission(){
  const token = localStorage.getItem('token');
  if (!token){
    alert('You cannot access this page. Log in first.')
    window.location.href = '/'
  }
}

export function redirectToUserPage(){
  const token = localStorage.getItem('token');
  console.log('redirectToUserPage function called.')
  if (token){
     redirect("/user-page");
    // window.location.href = '/user-page'
  }
}

export async function fetchUserLoginStatus(): Promise<SessionState>{
  const token = localStorage.getItem('token');
  if (token) {
    const response = await fetch('http://localhost:3000/api/verifyStatus', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    });
    const data = await response.json();
    if (data.status === 'ok'){
      (async () => { // Now we need to fetch the user data in order to send it to global state, and it will be the initial state.
        return {userIsLogged: true, token: token, connectionError: false, isLoading: false}
      })
    }
  }
  return {userIsLogged: false, token: token, connectionError: true, isLoading: false, userData: {email: '', firstName: ''}}
};