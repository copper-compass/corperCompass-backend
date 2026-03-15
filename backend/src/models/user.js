import mongoose from 'mongoose';
import argon2 from 'argon2';

const hashOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16, //64mb
  parallelism: 4,
  timeCost: 3,

}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return next();
  this.password = await argon2.hash(this.password, hashOptions);
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await argon2.verify(this.password, enteredPassword);
};

const User = mongoose.model('User', userSchema);
export default User;
