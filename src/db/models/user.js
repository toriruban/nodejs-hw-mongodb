import { model, Schema } from 'mongoose';

const usersSchema = new Schema (
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true, versionKey: false }, 
);

usersSchema.set('toObject', {
    transform: (doc, ret) => {
      if (ret.createdAt) {
        ret.createdAt = new Date(ret.createdAt).toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' });
      }
      if (ret.updatedAt) {
        ret.updatedAt = new Date(ret.updatedAt).toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' });
      }
      return ret;
    }
  });
  
  usersSchema.methods.toJSON = function () {
    const obj = this.toObject();  
    delete obj.password;
    return obj;
  };
  
export const User = model('users', usersSchema);