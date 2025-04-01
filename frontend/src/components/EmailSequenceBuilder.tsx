import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  Connection,
  Edge,
  Node,
  ConnectionLineType,
  NodeTypes,
  OnNodesChange,
  OnEdgesChange,
} from '@xyflow/react';
import { Plus, Trash2, Save, Download, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { sequenceApi } from '@/services/api';

import ColdEmailNode from './nodes/ColdEmailNode';
import WaitNode from './nodes/WaitNode';
import LeadSourceNode from './nodes/LeadSourceNode';
import { ColdEmailNodeData } from './nodes/ColdEmailNode';
import { WaitNodeData } from './nodes/WaitNode';
import { LeadSourceNodeData } from './nodes/LeadSourceNode';

// Define node types
const nodeTypes: NodeTypes = {
  coldEmail: ColdEmailNode,
  wait: WaitNode,
  leadSource: LeadSourceNode,
};

interface FlowParams {
  nodes: Node[];
  edges: Edge[];
}

export default function EmailSequenceBuilder() {
  const idCounter = useRef(0);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [sequenceName, setSequenceName] = useState('New Sequence');

  // Load sequences on mount
  useEffect(() => {
    const loadSequences = async () => {
      try {
        const sequences = await sequenceApi.getAllSequences();
        if (sequences.length > 0) {
          // Load the most recent sequence
          const latestSequence = sequences[0];
          setNodes(latestSequence.nodes);
          setEdges(latestSequence.edges);
          setSequenceName(latestSequence.name);
        }
      } catch (error) {
        toast.error('Failed to load sequences');
        console.error('Error loading sequences:', error);
      }
    };

    loadSequences();
  }, []);

  const saveSequence = async () => {
    try {
      // Clean up nodes by removing the onChange function and any undefined values
      const cleanNodes = nodes.map(node => ({
        ...node,
        data: Object.fromEntries(
          Object.entries(node.data)
            .filter(([key, value]) => key !== 'onChange' && value !== undefined)
        )
      }));

      // Clean up edges
      const cleanEdges = edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type
      }));

      await sequenceApi.createSequence({
        name: sequenceName,
        nodes: cleanNodes,
        edges: cleanEdges
      });
      
      toast.success('Sequence saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save sequence');
    }
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds)),
    [setEdges]
  );

  // Handle node data changes
  const handleNodeDataChange = useCallback(
    (nodeId: string, newData: any) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                ...newData,
              },
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );
  
  // Add new node to canvas
  const addNode = (type: 'coldEmail' | 'wait' | 'leadSource') => {
    const id = `${type}-${idCounter.current}`;
    const newNode: Node = {
      id,
      type,
      position: { x: 250, y: 100 },
      data: {
        onChange: handleNodeDataChange,
      },
    };
    
    // Initialize node specific data
    if (type === 'coldEmail') {
      newNode.data.subject = '';
      newNode.data.body = '';
      newNode.data.recipient = '';
    } else if (type === 'wait') {
      newNode.data.duration = 1;
      newNode.data.unit = 'days';
    } else if (type === 'leadSource') {
      newNode.data.sourceName = '';
    }
    
    idCounter.current += 1;
    setNodes((nodes) => [...nodes, newNode]);
    uiToast({
      title: "Node added",
      description: `Added new ${type} node to the canvas`,
    });
  };
  
  // Export flow as JSON
  const exportFlow = () => {
    const flow = { nodes, edges };
    const dataStr = JSON.stringify(flow, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'email-sequence-flow.json');
    linkElement.click();
    
    toast("Flow exported successfully!");
  };
  
  // Import flow from JSON file
  const importFlow = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      fileReader.readAsText(event.target.files[0], "UTF-8");
      fileReader.onload = e => {
        try {
          const content = e.target?.result as string;
          const flow = JSON.parse(content) as FlowParams;
          setNodes(flow.nodes);
          setEdges(flow.edges);
          toast("Flow imported successfully!");
        } catch (error) {
          console.error('Error importing flow', error);
          toast("Error importing flow. Invalid format.");
        }
      };
    }
  };
  
  // Delete selected nodes
  const deleteSelectedNodes = () => {
    setNodes((nodes) => nodes.filter((node) => !node.selected));
    setEdges((edges) => edges.filter((edge) => 
      !edge.selected && 
      nodes.some((node) => node.id === edge.source) && 
      nodes.some((node) => node.id === edge.target)
    ));
    toast("Selected nodes deleted");
  };

  return (
    <div className="w-full h-[calc(100vh-64px)]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        className="bg-flow-bg"
      >
        <Controls />
        <MiniMap />
        <Background />
        
        <Panel position="top-left" className="bg-white p-3 rounded-md shadow-md flex gap-2 flex-wrap">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => addNode('leadSource')} className="flex items-center gap-1">
              <Plus size={16} /> Lead Source
            </Button>
            <Button variant="outline" onClick={() => addNode('coldEmail')} className="flex items-center gap-1">
              <Plus size={16} /> Cold Email
            </Button>
            <Button variant="outline" onClick={() => addNode('wait')} className="flex items-center gap-1">
              <Plus size={16} /> Wait
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={deleteSelectedNodes} className="flex items-center gap-1">
              <Trash2 size={16} /> Delete
            </Button>
            <Button variant="outline" onClick={saveSequence} className="flex items-center gap-1">
              <Save size={16} /> Save
            </Button>
            <Button variant="outline" onClick={exportFlow} className="flex items-center gap-1">
              <Download size={16} /> Export
            </Button>
            <Button variant="outline" className="flex items-center gap-1" asChild>
              <label>
                <Upload size={16} /> Import
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".json" 
                  onChange={importFlow}
                />
              </label>
            </Button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};
