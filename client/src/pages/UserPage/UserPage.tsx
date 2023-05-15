import ChatsContainer from "../../components/ChatsContainer";
import Sidebar from "../../components/Sidebar";
import { Suspense, useState } from "react";
import { verifyPageAccessPermission } from "../../helpers/loginHelpers";
import CustomerSimulator from "../../components/CustomerSimulator";

export default function UserPage(){
    
    verifyPageAccessPermission();
    
    const [renderedComponent, setRenderedComponent] = useState([<ChatsContainer/>, <CustomerSimulator/>]);
    const [renderedComponentId, setRenderedComponentId] = useState<number>(0);

    return( 
        <Suspense>
            <Sidebar setRenderedComponentId={setRenderedComponentId}>
                {renderedComponent[renderedComponentId]}
            </Sidebar>  
        </Suspense>
    )
}