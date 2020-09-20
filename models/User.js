const { Schema, model } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+\@.+\..+/]
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ]
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;