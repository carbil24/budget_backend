import { Schema, model } from "mongoose";

const groupRuleSchema = new Schema({
  groupId: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  ruleId: {
    type: Schema.Types.ObjectId,
    ref: "Rule",
    required: true,
  },
});

export default model("GroupRule", groupRuleSchema);
