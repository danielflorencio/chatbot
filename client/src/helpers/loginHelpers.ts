import { SessionState } from "../features/sessionControl/sessionSlice";
// import { useAppDispatch } from "../hooks";
// import { useAppSelector } from '../../../hooks';

// const userData = useAppSelector(state => state.)
// const dispatch = useAppDispatch()


// function verifyLoginStatus(){
//   const token = localStorage.getItem('token')
//   let returnValue = false;
//   if(token){
//     (async () => {
//       const response = await fetch('http://localhost:3000/api/verifyStatus', {
//         method: 'POST',
//         headers: {
//           'Content-type': 'application/json',
//         },
//         body: JSON.stringify({
//           token: token
//         })
//       })
//       const data = await response.json()
//       if (data.status !== 'ok'){
//         returnValue = false
//         window.location.href = '/sign-in'
//       } else{
//         returnValue = true
//       }
//     })();
// }
// }



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


// export async function logUserIn(email: string, password: string){
//   const response = await fetch('http://localhost:3000/api/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       email,
//       password
//     })
//   })
//   const data = await response.json() 
//   if(data.user){
//     localStorage.setItem('token', data.user)
//     dispatch(setLoggedUser(email))    
//     window.location.href = '/user-page'
//   } else{
//     alert('Please check your username and password!')
//   }
// }

