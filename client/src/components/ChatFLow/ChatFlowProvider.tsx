import { ReactFlowProvider } from "reactflow";
import ChatFlow from "./ChatFlow";

export default function ChatFlowProvider(){
  return (
    <ReactFlowProvider>
      <ChatFlow/>
    </ReactFlowProvider>
  );
};