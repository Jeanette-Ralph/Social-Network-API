const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema({

    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },

    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },

    username: {
        type: String,
        required: true,
    },

    createdAt: {
        timestamp: {
            type: Date,
            default: Date.now
        },
    },
});

const thoughtSchema = new Schema(

    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },

        createdAt: {
            timestamp: {
                type: Date,
                default: Date.now
            },
        },

        username: {
            type: String,
            required: true,
        },

        reactions: [reactionSchema]

    },

    {
        timestamps: true,
        toJSON: {
            getters: true,
        },
    }
)



const Thought = model('thought', thoughtSchema);

module.exports = Thought;