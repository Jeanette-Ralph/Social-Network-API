const { Schema, model } = require('mongoose');

const usersSchema = new Schema(

    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: [true, "Email required"],
            validate: {
                validator: validateEmail = (email) => {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);
                },
                message: "Please enter a valid email."
            },
        },

        friends:
            [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                }
            ],

        thoughts:
            [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Thought',
                }
            ]
    },

    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
)

usersSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const Users = model('users', usersSchema);

module.exports = Users;