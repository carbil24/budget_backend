import { Schema, model } from "mongoose";

const groupMemberSchema = new Schema({
  groupId: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  memberId: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  joined: {
    type: Boolean,
    required: true,
  },
  rulesAccepted: {
    type: Boolean,
    required: true,
  },
});

export default model("GroupMember", groupMemberSchema);
