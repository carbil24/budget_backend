import { Schema, model } from "mongoose";

const memberSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

memberSchema.virtual("Group", {
  ref: "GroupMember",
  localField: "_id",
  foreignField: "memberId",
});

export default model("Member", memberSchema);
