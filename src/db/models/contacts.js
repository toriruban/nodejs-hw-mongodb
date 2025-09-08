import { model, Schema, Types } from 'mongoose';

const contactsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
        },
        isFavourite: {
            type: Boolean,
            default: false,
        },
        contactType: {
            type: String,
            enum: ['work', 'home', 'personal'],
            required: true,
            default: 'personal',
        },
        userId: { 
            type: Types.ObjectId,
            ref: 'users',
            required: true,
        },
        photo: { 
            type: String,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
)

contactsSchema.set('toJSON', {
    transform: (doc, ret) => {
      if (ret.createdAt) {
        ret.createdAt = new Date(ret.createdAt).toLocaleString('uk-UA');
      }
      if (ret.updatedAt) {
        ret.updatedAt = new Date(ret.updatedAt).toLocaleString('uk-UA');
      }
      return ret;
    }
  });

export const ContactsCollection = model('contacts', contactsSchema);