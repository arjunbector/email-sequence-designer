import mongoose, { Schema, Document } from 'mongoose';

interface IPosition {
  x: number;
  y: number;
}

interface INodeData {
  subject?: string;
  body?: string;
  recipient?: string;
  duration?: number;
  unit?: string;
  sourceName?: string;
  onChange?: any; // We'll exclude this when converting to JSON
}

interface INode {
  id: string;
  type: string;
  position: IPosition;
  data: INodeData;
  measured?: {
    width: number;
    height: number;
  };
}

interface IEdge {
  id: string;
  source: string;
  target: string;
  type: string;
}

export interface ISequence extends Document {
  name: string;
  description?: string;
  nodes: INode[];
  edges: IEdge[];
  createdAt: Date;
  updatedAt: Date;
}

const PositionSchema = new Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true }
}, { _id: false });

const NodeDataSchema = new Schema({
  subject: String,
  body: String,
  recipient: String,
  duration: Number,
  unit: String,
  sourceName: String
}, { _id: false, strict: false });

const MeasuredSchema = new Schema({
  width: Number,
  height: Number
}, { _id: false });

const NodeSchema = new Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  position: { type: PositionSchema, required: true },
  data: { type: NodeDataSchema, required: true },
  measured: { type: MeasuredSchema }
}, { _id: false });

const EdgeSchema = new Schema({
  id: { type: String, required: true },
  source: { type: String, required: true },
  target: { type: String, required: true },
  type: { type: String, required: true }
}, { _id: false });

const SequenceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  nodes: [NodeSchema],
  edges: [EdgeSchema]
}, {
  timestamps: true
});

export default mongoose.model<ISequence>('Sequence', SequenceSchema);
