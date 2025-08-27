import { model, Schema } from 'mongoose';

const usersSchema = new Schema (
    {
        name: { type: string, required: true },
        email: { type: string, unique: true, required: true },
        password: { type: string, required: true },
    },
    { timestamps: true, versionKey: false }, 
);

export const User = model('users',usersSchema);