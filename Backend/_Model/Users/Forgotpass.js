const mongoose = require("mongoose");

const ForgotpassSchema = new mongoose.Schema({
    ForgotpassId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
   email: String,
   randomcode: { type: String, required: true },
   time: { type: Date, default: Date.now}
});

const ForgotpassModel = mongoose.model("Forgotpass", ForgotpassSchema);

module.exports = ForgotpassModel;