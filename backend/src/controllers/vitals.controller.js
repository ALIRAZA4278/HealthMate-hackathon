import Vitals from '../models/Vitals.model.js';

export const getVitals = async (req, res) => {
  try {
    const vitals = await Vitals.find({ userId: req.user.userId })
      .sort({ date: -1 })
      .limit(50);

    res.json({ vitals });
  } catch (error) {
    console.error('Error fetching vitals:', error);
    res.status(500).json({ error: 'Failed to fetch vitals' });
  }
};

export const addVitals = async (req, res) => {
  try {
    const { date, bloodPressure, bloodSugar, weight, heartRate, temperature, notes } = req.body;

    if (!date) {
      return res.status(400).json({ error: 'Date is required' });
    }

    const vitals = await Vitals.create({
      userId: req.user.userId,
      date: new Date(date),
      bloodPressure,
      bloodSugar,
      weight,
      heartRate,
      temperature,
      notes,
    });

    res.status(201).json({
      message: 'Vitals added successfully',
      vitals,
    });
  } catch (error) {
    console.error('Error adding vitals:', error);
    res.status(500).json({ error: 'Failed to add vitals' });
  }
};

export const updateVitals = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, bloodPressure, bloodSugar, weight, heartRate, temperature, notes } = req.body;

    const vitals = await Vitals.findOne({ _id: id, userId: req.user.userId });

    if (!vitals) {
      return res.status(404).json({ error: 'Vitals record not found' });
    }

    // Update fields
    if (date) vitals.date = new Date(date);
    if (bloodPressure) vitals.bloodPressure = bloodPressure;
    if (bloodSugar !== undefined) vitals.bloodSugar = bloodSugar;
    if (weight !== undefined) vitals.weight = weight;
    if (heartRate !== undefined) vitals.heartRate = heartRate;
    if (temperature !== undefined) vitals.temperature = temperature;
    if (notes !== undefined) vitals.notes = notes;

    await vitals.save();

    res.json({
      message: 'Vitals updated successfully',
      vitals,
    });
  } catch (error) {
    console.error('Error updating vitals:', error);
    res.status(500).json({ error: 'Failed to update vitals' });
  }
};

export const deleteVitals = async (req, res) => {
  try {
    const { id } = req.params;

    const vitals = await Vitals.findOne({ _id: id, userId: req.user.userId });

    if (!vitals) {
      return res.status(404).json({ error: 'Vitals record not found' });
    }

    await Vitals.deleteOne({ _id: id });

    res.json({ message: 'Vitals deleted successfully' });
  } catch (error) {
    console.error('Error deleting vitals:', error);
    res.status(500).json({ error: 'Failed to delete vitals' });
  }
};
