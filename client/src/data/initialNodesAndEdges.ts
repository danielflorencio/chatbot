import { useMemo } from "react";
import { FlowsData } from "./flows";
import { Edge, Node } from "reactflow";
import StepNode from "../components/ChatFLow/Nodes/StepNode";

const nodeTypes = useMemo(() => ({ step: StepNode }), []);

export const newInitialNodes: Node[] = FlowsData[0].steps.map((step) => {
    return {
        id: step.id,
        type: 'step', // After defining your new node type, you can use it by using the type node option.
        data: {
        label: 'node',
        lastStepId: step.lastStepId !== undefined ? step.lastStepId : null,
        messages: [...step.messages],
        options: step.options !== undefined ? [...step.options] : null
        },
        position: { x: step.NodeXPosition, y: step.NodeYPosition},
        extent: 'parent'
    }
})
  
export const initialEdges: Edge[] = [
{ id: "e1-2", source: "1", target: "2", animated: true },
{ id: "e1-3", source: "1", target: "3" }
];