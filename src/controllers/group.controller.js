import Group from "../models/Group";
import GroupMember from "../models/GroupMember";
import Member from "../models/Member";
import User from "../models/User";

export const createGroup = async (req, res) => {
  const currentUser = await User.findById(req.userId);
  const { name, members, rulesSet } = req.body;

  const newGroup = new Group({ name });

  const member = await Member.findOne({ email: savedUser.email });

  newGroup.members = members.length + 1;
  newGroup.createdBy = currentUser._id;
  newGroup.rulesSet = false;

  const groupSaved = await newGroup.save();

  await GroupMember.update(
    {
      groupId: groupSaved._id,
      memberId: member._id,
      joined: true,
      rulesAccepted: false,
    },
    {},
    { upsert: true }
  );

  for (const member of members) {
    const anotherMember = await Member.create({
      email: member,
      name: "No Name",
    });
    await GroupMember.update(
      {
        groupId: groupSaved._id,
        memberId: anotherMember._id,
        joined: false,
        rulesAccepted: false,
      },
      {},
      { upsert: true }
    );
  }

  res.status(201).json(groupSaved);
};

export const getGroups = async (req, res) => {
  const groups = await Group.find();
  res.status(200).json(groups);
};

export const getGroupById = async (req, res) => {
  const group = await Group.findById(req.params.groupId);
  res.status(200).json(group);
};

export const updateGroupById = async (req, res) => {
  const updatedGroup = await Group.findByIdAndUpdate(
    req.params.groupId,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedGroup);
};

export const deleteGroupById = async (req, res) => {
  await Group.findByIdAndDelete(req.params.group);
  res.status(204).json();
};
