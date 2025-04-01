import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Sequence from '../models/sequence.model';

const router = Router();

// Get all sequences
router.get('/', async (req, res) => {
  try {
    const sequences = await Sequence.find().sort({ updatedAt: -1 });
    res.json(sequences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sequences', error });
  }
});

// Get sequence by ID
router.get('/:id', async (req, res) => {
  try {
    const sequence = await Sequence.findById(req.params.id);
    if (!sequence) {
      return res.status(404).json({ message: 'Sequence not found' });
    }
    res.json(sequence);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sequence', error });
  }
});

// Create new sequence
router.post('/',
  [
    body('name').notEmpty().trim(),
    body('nodes').isArray(),
    body('edges').isArray(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const sequence = new Sequence(req.body);
      await sequence.save();
      res.status(201).json(sequence);
    } catch (error) {
      res.status(500).json({ message: 'Error creating sequence', error });
    }
  }
);

// Update sequence
router.put('/:id', async (req, res) => {
  try {
    const sequence = await Sequence.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!sequence) {
      return res.status(404).json({ message: 'Sequence not found' });
    }
    res.json(sequence);
  } catch (error) {
    res.status(500).json({ message: 'Error updating sequence', error });
  }
});

// Delete sequence
router.delete('/:id', async (req, res) => {
  try {
    const sequence = await Sequence.findByIdAndDelete(req.params.id);
    if (!sequence) {
      return res.status(404).json({ message: 'Sequence not found' });
    }
    res.json({ message: 'Sequence deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sequence', error });
  }
});

export default router;
