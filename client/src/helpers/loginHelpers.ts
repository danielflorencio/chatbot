import { SessionState } from "../features/sessionControl/sessionSlice";
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



const fetchUserLoginStatus = async (): Promise<SessionState> => {
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
        return {loggedInUser: null, userIsLogged: true, token: token, connectionError: false, isLoading: false}
      }
    }
    return {loggedInUser: null, userIsLogged: false, token: token, connectionError: true, isLoading: false}
  };


export default fetchUserLoginStatus;