import FamilyMember from '../models/FamilyMember.model.js';

// Get all family members for logged-in user
export const getAllFamilyMembers = async (req, res) => {
  try {
    const members = await FamilyMember.find({ userId: req.user.userId }).sort({ createdAt: 1 });
    res.json({ success: true, members });
  } catch (error) {
    console.error('Error fetching family members:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch family members' });
  }
};

// Create a new family member
export const createFamilyMember = async (req, res) => {
  try {
    const { name, relation, color, customId } = req.body;

    if (!name || !relation) {
      return res.status(400).json({ success: false, message: 'Name and relation are required' });
    }

    const member = await FamilyMember.create({
      userId: req.user.userId,
      name,
      relation,
      color: color || '#ec4899',
      customId: customId || '',
    });

    res.status(201).json({ success: true, member });
  } catch (error) {
    console.error('Error creating family member:', error);
    res.status(500).json({ success: false, message: 'Failed to create family member' });
  }
};

// Update a family member
export const updateFamilyMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, relation, color, customId } = req.body;

    const member = await FamilyMember.findOne({ _id: id, userId: req.user.userId });

    if (!member) {
      return res.status(404).json({ success: false, message: 'Family member not found' });
    }

    member.name = name || member.name;
    member.relation = relation || member.relation;
    member.color = color || member.color;
    member.customId = customId !== undefined ? customId : member.customId;

    await member.save();

    res.json({ success: true, member });
  } catch (error) {
    console.error('Error updating family member:', error);
    res.status(500).json({ success: false, message: 'Failed to update family member' });
  }
};

// Delete a family member
export const deleteFamilyMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await FamilyMember.findOneAndDelete({ _id: id, userId: req.user.userId });

    if (!member) {
      return res.status(404).json({ success: false, message: 'Family member not found' });
    }

    res.json({ success: true, message: 'Family member deleted successfully' });
  } catch (error) {
    console.error('Error deleting family member:', error);
    res.status(500).json({ success: false, message: 'Failed to delete family member' });
  }
};

// Get a single family member
export const getFamilyMemberById = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await FamilyMember.findOne({ _id: id, userId: req.user.userId });

    if (!member) {
      return res.status(404).json({ success: false, message: 'Family member not found' });
    }

    res.json({ success: true, member });
  } catch (error) {
    console.error('Error fetching family member:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch family member' });
  }
};
