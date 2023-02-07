import ChatsContainer from "../../components/ChatsContainer";
import Sidebar from "../../components/Sidebar";
import { Suspense } from "react";
export default function UserPage(){
    return(
        <Suspense>
            <Sidebar>
                <ChatsContainer/>    
            </Sidebar>  
        </Suspense>
    )
}