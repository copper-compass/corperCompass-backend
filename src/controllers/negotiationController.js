import Negotiation from '../models/Negotiation.js';
import Message from '../models/Message.js';
import User from '../models/User.js'; // Added so we can look up an Admin

const validateId = (id, res) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400);
    throw new Error('Invalid ID format');
  }
};

export const startNegotiation = async (req, res, next) => {
  try {
    const { lodge, proposedPrice, landlord } = req.body;
    if (!lodge || !proposedPrice) {
      res.status(400);
      throw new Error('Lodge and proposedPrice are required');
    }
    validateId(lodge, res);

    // BUG FIX: Automatically assign an admin if no landlord is specified
    let assignedLandlord = landlord;
    if (!assignedLandlord) {
      const admin = await User.findOne({ role: 'admin' });
      if (admin) assignedLandlord = admin._id;
    }

    const negotiation = await Negotiation.create({
      lodge,
      corper: req.user._id,
      landlord: assignedLandlord,
      proposedPrice,
    });
    res.status(201).json(negotiation);
  } catch (error) {
    next(error);
  }
};

export const getMyNegotiations = async (req, res, next) => {
  try {
    const negotiations = await Negotiation.find({
      $or: [{ corper: req.user._id }, { landlord: req.user._id }],
    })
      .populate('lodge', 'name')
      .populate('corper landlord', 'name email');
    res.json(negotiations);
  } catch (error) {
    next(error);
  }
};

export const getNegotiationById = async (req, res, next) => {
  try {
    validateId(req.params.id, res);
    const negotiation = await Negotiation.findById(req.params.id)
      .populate('lodge', 'name area')
      .populate('corper landlord', 'name email')
      .populate({ path: 'messages', populate: { path: 'sender receiver', select: 'name email' } });
    
    if (!negotiation) {
      res.status(404);
      throw new Error('Negotiation not found');
    }
    
    // Admins can view all, otherwise must be a participant
    if (
      req.user.role !== 'admin' &&
      negotiation.corper._id.toString() !== req.user._id.toString() &&
      (!negotiation.landlord || negotiation.landlord._id.toString() !== req.user._id.toString())
    ) {
      res.status(403);
      throw new Error('Not authorized');
    }
    res.json(negotiation);
  } catch (error) {
    next(error);
  }
};

export const updateNegotiation = async (req, res, next) => {
  try {
    validateId(req.params.id, res);
    const negotiation = await Negotiation.findById(req.params.id);
    
    if (!negotiation) {
      res.status(404);
      throw new Error('Negotiation not found');
    }
    
    if (req.user.role !== 'admin' && (!negotiation.landlord || negotiation.landlord.toString() !== req.user._id.toString())) {
      res.status(403);
      throw new Error('Not authorized');
    }
    
    const { status, counterPrice } = req.body;
    if (status) negotiation.status = status;
    if (counterPrice) negotiation.proposedPrice = counterPrice;
    await negotiation.save();
    res.json(negotiation);
  } catch (error) {
    next(error);
  }
};

export const addNegotiationMessage = async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) {
      res.status(400);
      throw new Error('Message content required');
    }
    validateId(req.params.id, res);

    const negotiation = await Negotiation.findById(req.params.id);
    if (!negotiation) {
      res.status(404);
      throw new Error('Negotiation not found');
    }

    let receiverId;
    if (negotiation.corper.toString() === req.user._id.toString()) {
      receiverId = negotiation.landlord;
      
      // BUG FIX / SELF-HEALING: If landlord is missing on an existing negotiation, patch it now
      if (!receiverId) {
        const admin = await User.findOne({ role: 'admin' });
        if (admin) {
          receiverId = admin._id;
          negotiation.landlord = admin._id; // Permanently fix this document
        }
      }
    } else if (negotiation.landlord && negotiation.landlord.toString() === req.user._id.toString()) {
      receiverId = negotiation.corper;
    } else if (req.user.role === 'admin') {
       receiverId = negotiation.corper;
    } else {
      res.status(403);
      throw new Error('Not part of this negotiation');
    }

    if (!receiverId) {
      res.status(400);
      throw new Error('No receiver defined. Could not assign an admin.');
    }

    const message = await Message.create({ sender: req.user._id, receiver: receiverId, content });
    negotiation.messages.push(message._id);
    await negotiation.save();

    const populated = await Message.findById(message._id).populate('sender receiver', 'name email');
    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
};