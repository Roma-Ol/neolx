const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { genSalt, hash } = require('bcrypt');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(?:\+38)?0\d{9}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid Ukrainian phone number!`,
      },
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      // @es
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    role: {
      type: String,
      enum: ['admin', 'manager'],
      default: 'manager',
      required: [true, 'Role is required'],
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    telegramChatId: { type: String },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: 'created_at' } },
);

userSchema.pre('save', async function () {
  if (this.$isNew) {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    this.role = 'manager'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
