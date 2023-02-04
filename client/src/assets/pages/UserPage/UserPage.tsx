import ChatsContainer from "../../../components/ChatsContainer";
// import Sidebar from "../../../components/Sidebar";
import { useEffect } from "react";
import jwt from "jsonwebtoken";

export default function UserPage(){
    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     if (token) {
    //       const user = jwt.decode(token)
    //       if (!user){
    //         localStorage.removeItem('token')
    //         window.location.href = '/sign-in'
    //       }
    //       console.log("user: ", user)
    //     } else{
    //         window.location.href = '/sign-in'
    //     }
    //   }, [])

    return(
        <>
            {/* <Sidebar/>   */}
            <ChatsContainer/>
        </>
    )
}