import ChatsContainer from "../../components/ChatsContainer";
import Sidebar from "../../components/Sidebar";
import { Suspense, useEffect, useState } from "react";
import { verifyPageAccessPermission } from "../../helpers/loginHelpers";
import CustomerSimulator from "../../components/CustomerSimulator";
import { fetchMessages } from "../../features/sessionControl/chatSlice";
import { useUserEmail } from "../../hooks";
import { store } from "../../store";
import BotsPage from "../../components/Bots";
import ChatFlow from "../../components/ChatFLow/Index";

export default function UserPage(){
    
    const email = useUserEmail();

    verifyPageAccessPermission();

    useEffect(() => {
        console.log('Main useEffect being called.')
        store.dispatch(fetchMessages(email));
    }, [email]);
    
    const [renderedComponent, setRenderedComponent] = useState([<ChatsContainer/>, <CustomerSimulator/>, <BotsPage/>, <ChatFlow/>]);
    const [renderedComponentId, setRenderedComponentId] = useState<number>(0);

    return( 
        <Suspense>
            <Sidebar setRenderedComponentId={setRenderedComponentId}>
                {renderedComponent[renderedComponentId]}
            </Sidebar>  
        </Suspense>
    )
}