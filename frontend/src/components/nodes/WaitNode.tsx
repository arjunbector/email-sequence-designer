
import React, { useState } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Clock } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface WaitNodeData {
  duration: number;
  unit: 'minutes' | 'hours' | 'days';
  label?: string;
  onChange: (id: string, data: Partial<WaitNodeData>) => void;
}

const WaitNode = ({ id, data }: NodeProps<WaitNodeData>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [duration, setDuration] = useState(data?.duration || 1);
  const [unit, setUnit] = useState<'minutes' | 'hours' | 'days'>(data?.unit || 'days');

  const handleSave = () => {
    data?.onChange(id, { duration, unit });
    setIsEditing(false);
  };

  const getDisplayText = () => {
    return `Wait ${duration} ${unit}`;
  };

  return (
    <div className="node-wait">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2 text-node-wait mb-1">
        <Clock size={16} />
        <strong>Delay</strong>
      </div>
      
      {isEditing ? (
        <div className="node-form">
          <div className="flex gap-2">
            <Input 
              type="number" 
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="text-xs"
              min={1}
            />
            <Select value={unit} onValueChange={(val: 'minutes' | 'hours' | 'days') => setUnit(val)}>
              <SelectTrigger className="text-xs">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minutes">Minutes</SelectItem>
                <SelectItem value="hours">Hours</SelectItem>
                <SelectItem value="days">Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button size="sm" onClick={handleSave} className="mt-1">Save</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <div className="text-md font-medium">{getDisplayText()}</div>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="mt-1">Edit</Button>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default WaitNode;
