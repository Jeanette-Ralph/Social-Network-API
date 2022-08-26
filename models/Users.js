const { Schema, model } = require('mongoose');
const usersSchema = require('./Thoughts');


const usersSchema = new Schema(

    {
        username: {
            type: String,
            required: true,
            max_length: 50,
        },

        email: {
            type: String,
            required: true,
            max_length: 50,
        },

        friend_count: {
            trpe: Number,
        },

        thoughts: [thoughts],
        friends: [friends]
    },

    {
        toJSON: {
            getters: true,
        },
    }
)

const Users = model('users', usersSchema);

module.exports = Users;