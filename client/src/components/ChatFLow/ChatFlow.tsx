import { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, { Node, addEdge, Background, Edge, Connection, useNodesState, useEdgesState, Controls, ConnectionMode, useOnSelectionChange } from "reactflow";
import { FlowsData } from "../../data/flows";
import "reactflow/dist/style.css";
import { Box } from "@mui/material";
import StepNode from "./Nodes/StepNode";
import StepMenu from "./StepMenu"; 
import { Option, Step } from "../../types/Step";
import OptionNode from "./Nodes/OptionNode";
import { generateUUID } from "../../helpers/uuidGenerator";

const newFirstNode: Node = {
  id: '0',
  type: 'step',
  data: {
    label: 'node',
    lastStepId: null, 
    nodeTitle: 'Hey',
    messages: [],
    // messages: [...FlowsData[0].steps[0].messages],
    // options: FlowsData[0].steps[0].options !== undefined ? [...FlowsData[0].steps[0].options] : []
    options: []
  },
  position: {x: FlowsData[0].steps[0].NodeXPosition, y: FlowsData[0].steps[0].NodeYPosition}
}

let newInitialNodes: Node[] = [newFirstNode];

export default function ChatFlow(){
  
  const [selectedStep, setSelectedStep] = useState<Step | null | undefined>(null);

  useEffect(() => {
    const fetchFlowData = async () => {
    }
    fetchFlowData();
  }, [])

  const nodeTypes = useMemo(() => ({ step: StepNode , option: OptionNode}), []);

  const [nodes, setNodes, onNodesChange] = useNodesState(newInitialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {

  }, [])
  
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  const [open, setOpen] = useState(true);

  function SelectionChangeLogger() {
    useOnSelectionChange({
      onChange: ({ nodes, edges }) => {
        // console.log('changed selection', nodes, edges)
        // console.log('Node to be selected: ', nodes[0])
        console.log('selected step ID: ', selectedStep?.id)
        console.log('node on selection Change: ', nodes[0])
        if(nodes.length === 1 && nodes[0].type === 'step'){
            const newSelectedStep: Step = {
              id: nodes[0].id, 
              conditionType: 'choice',
              messages: !!nodes[0].data.messages ? [...nodes[0].data.messages] : [],
              options: !!nodes[0].data.options ? nodes[0].data.options.map((option: Option) => {return {optionCTA: option.optionCTA, referenceNextStepId: option.referenceNextStepId}}) : [],
              NodeXPosition: nodes[0].position.x,
              NodeYPosition: nodes[0].position.y
            }

            // This function looks into all the loaded steps of the current flow...
            // Then it compares the current selected node's id with all the step's id's in the flow. 

            if(newSelectedStep){
              setSelectedStep(newSelectedStep);   
            } 
        } else{
          setSelectedStep(null);
        }
    },
    });
  
    return null;
  }

  SelectionChangeLogger();

  const addNewStep = (currentSelectedParentNodeId: string) => {
    const selectedParentNode: Node<any, string | undefined> | undefined = nodes.find((node) => node.id === currentSelectedParentNodeId);
    if(selectedParentNode){

      const newNodeId = generateUUID();

      const newChildNode: Node = {
        id: generateUUID(),
        position: {
          x: !!selectedParentNode.width ? (selectedParentNode.width / 4) : 0,
          y: (selectedParentNode.data.options.length + 1)*60
        },
        type: 'option',
        data: {
          label: 'node',
          optionCTA: 'CTA',
          referenceNextStepId: newNodeId
        },
        extent: 'parent',
        parentNode: selectedParentNode.id,
        selectable: false
      }

      const newNode: Node = {
        id: newNodeId,
        position: {x: selectedParentNode.position.x + 300, y: (selectedParentNode.position.y + newChildNode.position.y)},
        type: 'step',
        data: {
          label: 'node',
          nodeTitle: 'node 2',
          lastStepId: currentSelectedParentNodeId,
          // messages: !!selectedStep && !!selectedStep.messages ? [...selectedStep.messages] : [],
          messages: [],
          options: [],
        }
      }

      const newEdge: Edge = {
        id: edges.length.toString(),
        source: newChildNode.id,
        target: newNode.id,
        zIndex: 999999999999999999
      }

      let newNodesState: Node[] = [...nodes];
    
      const selectedParentNodeIndex: number = newNodesState.findIndex((node) => node.id === selectedParentNode.id)

      newNodesState[selectedParentNodeIndex] = {
        ...newNodesState[selectedParentNodeIndex],
        data: {
          ...newNodesState[selectedParentNodeIndex].data, 
          // Each time a new step is created, a new Option object is passed down to the parent node (the current selected one).    
          options: [...newNodesState[selectedParentNodeIndex].data.options, {optionCTA: 'New Option CTA', referenceNextStepId: newNode.id}],
          heightMultiplier: selectedParentNode.data.options.length + 1
        }
      }

      if(selectedStep){
        const newSelectedStepState: Step = {
          ...selectedStep, 
          options: [...newNodesState[selectedParentNodeIndex].data.options]
        };
        setSelectedStep(newSelectedStepState);
      }

      setEdges([...edges, newEdge])
      setNodes([...newNodesState, newChildNode, newNode])
    }
  }

  const addNewChoice = (parentNodeId: string) => {

  }

  const addResponseToTheStep = (response: string, nodeId: string) => {
    
    const selectedNode: Node<any, string | undefined> | undefined = nodes.find((node) => node.id === nodeId);
    
    if(selectedNode){

      let newNodesState: Node[] = [...nodes];

      const nodeToBeChangedIndex: number = nodes.findIndex((node) => node.id === nodeId);

      newNodesState[nodeToBeChangedIndex] = {
        ...newNodesState[nodeToBeChangedIndex],
        data: {
          ...newNodesState[nodeToBeChangedIndex].data,
          // messages: [...newNodesState[nodeToBeChangedIndex].data.messages, response]
          messages: [...newNodesState[nodeToBeChangedIndex].data.messages, response]
        }
      }
      
      if(selectedStep){
        const newSelectedStepState: Step = {
          ...selectedStep, 
          messages: [...newNodesState[nodeToBeChangedIndex].data.messages],
        };
        setSelectedStep(newSelectedStepState);
      }
      setNodes(newNodesState)
    }
  }

  return (
    <Box sx={{height: '90vh', width: '100%', margin: 0}}>
        {selectedStep ? <StepMenu open={open} addResponseToTheStep={addResponseToTheStep} selectedStep={selectedStep} addNewStep={addNewStep} /> : null}
        <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        connectionMode={ConnectionMode.Loose}
        style={{border: '1px solid #ccc', height: '100%', width: '100%', zIndex: 0}}
        >
        <Background 
            gap={12}
            size={1.5}
            color="#ccc"
        />
        <Controls/>
        </ReactFlow>
    </Box>
  );
};