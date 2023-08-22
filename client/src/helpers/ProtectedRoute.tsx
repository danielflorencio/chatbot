import { Navigate } from "react-router-dom"
import { useAppDispatch, useLoginStatus } from "../hooks"
import { VerifyUserIsLogged, fetchUserLoginStatus } from "./loginHelpers";
import { useEffect, useState } from "react";
// import { verifyLoginStatus } from "../features/sessionControl/sessionSlice";

export default function ProtectedRoute({children}: {children: JSX.Element}){

    // const [isSignedIn, setIsSignedIn] = useState<Promise<boolean>>();

    const dispatch = useAppDispatch();

    // dispatch(verifyLoginStatus());

    const isSignedIn = useLoginStatus();
    // const isSignedIn = true;

    // useEffect(() => {
    //     (async () => {
    //         let userLoginStatus:Promise<boolean> = await VerifyUserIsLogged();
    //         setIsSignedIn(userLoginStatus);
    //     })();
    // }, [])
    console.log('LOGIN STATUS: ', useLoginStatus());

    // console.log('VERIFY LOGIN STATUS FUNCTION: ', await VerifyUserIsLogged());

    if(!isSignedIn){
        return <Navigate to={'/login'}/>
    }

    return children
}