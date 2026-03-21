import Message from '../models/Message.js';

const validateId = (id, res) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400);
    throw new Error('Invalid ID format');
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { receiver, content } = req.body;
    
    if (!receiver || !content) {
      res.status(400);
      throw new Error('Receiver and content are required');
    }

    // Proactive bug fix: Ensure receiver ID is a valid MongoDB format
    validateId(receiver, res);

    // THE FIX FOR BUG #16: Prevent self-messaging
    if (receiver === req.user._id.toString()) {
      res.status(400);
      throw new Error('You cannot send a message to yourself');
    }

    const message = await Message.create({ sender: req.user._id, receiver, content });
    const populated = await Message.findById(message._id).populate('sender receiver', 'name email');
    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
};

export const getMyMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    })
      .populate('sender receiver', 'name email')
      .sort('-createdAt');
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

export const getConversation = async (req, res, next) => {
  try {
    const { userId } = req.params;
    validateId(userId, res); // Added validation

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    })
      .populate('sender receiver', 'name email')
      .sort('createdAt');
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    validateId(req.params.id, res); // Added validation
    
    const message = await Message.findById(req.params.id);
    if (!message) {
      res.status(404);
      throw new Error('Message not found');
    }
    
    if (message.receiver.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }
    
    message.read = true;
    await message.save();
    res.json(message);
  } catch (error) {
    next(error);
  }
};