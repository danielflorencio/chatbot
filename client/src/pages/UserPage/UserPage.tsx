import ChatsContainer from "../../components/ChatsContainer";
import Sidebar from "../../components/Sidebar";
import { Suspense } from "react";
import { verifyPageAccessPermission } from "../../helpers/loginHelpers";
export default function UserPage(){
    
    verifyPageAccessPermission();

    return(
        <Suspense>
            <Sidebar>
                <ChatsContainer/>    
            </Sidebar>  
        </Suspense>
    )
}