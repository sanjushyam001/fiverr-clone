import createError from "../utils/CreateError.js";
import Gig from "../models/gig.model.js";
export const createGig = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError(403, "Only seller can create gig"));
  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });
  try {
    const saveGig = await newGig.save();
    res.status(201).json(saveGig);
  } catch (error) {
    next(error);
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    // const gig = await Gig.findOne({ _id: req.params.id });
    // console.log("=========== START FETCHED GIG ========");
    // console.log(gig._doc);
    // console.log("=========== END FETCHED GIG ========");
    if (gig.userId !== req.userId)
      return next(createError(403, "Only you can delete your gig"));

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getGig = async (req, res, next) => {
  console.log("GET GIG INVOKED !!!!!!!");
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) next(createError(404, "Gig not found!"));
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};

export const getGigs = async (req, res, next) => {
  console.log("getGigs invoked");
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(gigs);
  } catch (error) {
    next(error);
    console.log(error);
  }
};
