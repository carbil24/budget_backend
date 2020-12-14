import { Schema, model } from "mongoose";

const ruleSchema = new Schema(
  {
    description: String,
  },
  {
    versionKey: false,
  }
);

ruleSchema.virtual("Group", {
  ref: "GroupRule",
  localField: "_id",
  foreignField: "ruleId",
});

export default model("Rule", ruleSchema);
