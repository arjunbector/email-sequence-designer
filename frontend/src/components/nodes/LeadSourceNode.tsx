
import React, { useState } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Users } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface LeadSourceNodeData {
  sourceName: string;
  label?: string;
  onChange: (id: string, data: Partial<LeadSourceNodeData>) => void;
}

const LeadSourceNode = ({ id, data }: NodeProps<LeadSourceNodeData>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [sourceName, setSourceName] = useState(data?.sourceName || '');

  const handleSave = () => {
    data?.onChange(id, { sourceName });
    setIsEditing(false);
  };

  return (
    <div className="node-lead-source">
      <div className="flex items-center gap-2 text-node-lead-source mb-1">
        <Users size={16} />
        <strong>Lead Source</strong>
      </div>
      
      {isEditing ? (
        <div className="node-form">
          <Input 
            placeholder="Source name" 
            value={sourceName}
            onChange={(e) => setSourceName(e.target.value)}
            className="text-xs"
          />
          <Button size="sm" onClick={handleSave} className="mt-1">Save</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {sourceName ? (
            <div className="text-md font-medium">{sourceName}</div>
          ) : (
            <div className="text-xs italic text-gray-500">No source defined</div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="mt-1">Edit</Button>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};

export default LeadSourceNode;
