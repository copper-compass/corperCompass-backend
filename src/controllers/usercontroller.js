import Profile from '../models/Profile.js';

// @desc    Create or update user profile
// @route   PUT /api/users/profile
export const updateProfile = async (req, res, next) => {
  try {
    const { postedState, phone, preferences } = req.body;
    const profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { postedState, phone, preferences },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
export const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate('user', 'name email');
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    next(error);
  }
};
