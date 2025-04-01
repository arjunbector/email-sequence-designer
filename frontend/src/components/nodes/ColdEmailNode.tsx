
import React, { useState } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Mail } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export interface ColdEmailNodeData {
  subject: string;
  body: string;
  recipient: string;
  label?: string;
  onChange: (id: string, data: Partial<ColdEmailNodeData>) => void;
}

const ColdEmailNode = ({ id, data }: NodeProps<ColdEmailNodeData>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [subject, setSubject] = useState(data?.subject || '');
  const [body, setBody] = useState(data?.body || '');
  const [recipient, setRecipient] = useState(data?.recipient || '');

  const handleSave = () => {
    data?.onChange(id, { subject, body, recipient });
    setIsEditing(false);
  };

  return (
    <div className="node-cold-email">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2 text-node-cold-email mb-1">
        <Mail size={16} />
        <strong>Cold Email</strong>
      </div>
      
      {isEditing ? (
        <div className="node-form">
          <Input 
            placeholder="Recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="text-xs"
          />
          <Input 
            placeholder="Subject" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="text-xs"
          />
          <Textarea 
            placeholder="Email body..." 
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="text-xs min-h-[80px]"
          />
          <Button size="sm" onClick={handleSave} className="mt-1">Save</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {recipient && <div className="text-xs"><span className="font-semibold">To:</span> {recipient}</div>}
          {subject && <div className="text-xs"><span className="font-semibold">Subject:</span> {subject}</div>}
          {body ? (
            <div className="text-xs max-h-[60px] overflow-hidden text-ellipsis">{body}</div>
          ) : (
            <div className="text-xs italic text-gray-500">No content yet</div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="mt-1">Edit</Button>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default ColdEmailNode;
