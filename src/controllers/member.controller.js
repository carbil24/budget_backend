import Member from "../models/Member";

export const createMember = async (req, res) => {
  const { email, name } = req.body;
  const newMember = new Member({ email, name });
  const memberSaved = await newMember.save();
  res.status(201).json(memberSaved);
};

export const getMembers = async (req, res) => {
  const members = await Member.find();
  res.status(200).json(members);
};

export const getMemberById = async (req, res) => {
  const member = await Member.findById(req.params.memberId);
  res.status(200).json(member);
};

export const updateMemberById = async (req, res) => {
  const updatedMember = await Member.findByIdAndUpdate(
    req.params.memberId,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedMember);
};

export const deleteMemberById = async (req, res) => {
  await Member.findByIdAndDelete(req.params.member);
  res.status(204).json();
};
