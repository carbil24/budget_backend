import { Schema, model } from "mongoose";

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: {
      type: Number,
      required: true,
    },
    createdBy: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    rulesSet: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

groupSchema.virtual("Member", {
  ref: "GroupMember",
  localField: "_id",
  foreignField: "groupId",
});

groupSchema.virtual("Rule", {
  ref: "GroupRule",
  localField: "_id",
  foreignField: "groupId",
});

export default model("Group", groupSchema);
