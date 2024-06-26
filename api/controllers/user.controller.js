import User from "../models/user.model.js";
import createError from "../utils/CreateError.js";
export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "you can delete only your account"));
  }

  await User.findByIdAndDelete(req.params.id);
  res.send("deleted");
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(createError(404, "user not found"));
  }
  res.status(200).send(user);
};
