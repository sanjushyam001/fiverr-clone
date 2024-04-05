import createError from "../utils/CreateError.js";
import Conversation from "../models/conversation.model.js";
export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (error) {
    next(error);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    );
    res.status(201).send(conversations);
  } catch (error) {
    next(error);
  }
};
export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await newConversation.findOne({
      id: req.params.id,
    });
    res.status(200).send(conversation);
  } catch (error) {
    next(error);
  }
};
export const updateConversation = async (req, res, next) => {
  const updateConversation = await Conversation.findByIdAndUpdate(
    {
      id: req.params.id,
    },
    {
      $set: {
        // readBySeller: req.isSeller,
        // readByBuyer: !req.isSeller,

        ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
      },
    },
    { new: true }
  );
  try {
    res.status(200).send(updateConversation);
  } catch (error) {
    next(error);
  }
};
