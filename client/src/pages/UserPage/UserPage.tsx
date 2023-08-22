import { Suspense, useEffect } from "react";
import { fetchMessages } from "../../features/sessionControl/chatSlice";
import { useUserEmail } from "../../hooks";
import { store } from "../../store";
import ResponsiveDrawer from "../../components/ResponsiveDrawer.tsx";
import { Outlet } from "react-router-dom";

export default function UserPage(){
    
    const email = useUserEmail();

    useEffect(() => {
        console.log('Main useEffect being called.')
        store.dispatch(fetchMessages(email));
    }, [email]);

    return( 
        <Suspense>
            <ResponsiveDrawer>
                <Outlet/>
            </ResponsiveDrawer>  
        </Suspense>
    )
}