import { useCallback } from "react";
import ReactFlow, {
  Node,
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  ConnectionMode
} from "reactflow";

import CustomNode from "./FlowComponents/CustomNode";

import "reactflow/dist/style.css";
import { Box } from "@mui/material";
import StepNode from "./FlowComponents/StepNode";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "step",
    data: { label: "Node 1" },
    position: { x: 250, y: 5 }, 
  },
  { id: "2", type: 'step', data: { label: "Node 2" }, position: { x: 100, y: 100 } },
  { id: "3", type: 'step', data: { label: "Node 3" }, position: { x: 400, y: 100 } },
  // {
    // id: "4",
    // type: "custom",
    // data: { label: "Custom Node" },
    // position: { x: 400, y: 200 }
  // }
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3" }
];

const nodeTypes = {
  custom: CustomNode,
  step: StepNode
};

export default function ChatFlows(){
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  return (
    <Box sx={{height: '90vh', width: '100vw', marginBottom: '5vh', border: '1px solid green'}}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      connectionMode={ConnectionMode.Loose}
      style={{border: '1px solid #ccc', height: '100%', width: '100%'}}
    >
      <Background 
        gap={12}
        size={2}
        color="#ccc"
      />
      <Controls/>
    </ReactFlow>
    </Box>
  );
};