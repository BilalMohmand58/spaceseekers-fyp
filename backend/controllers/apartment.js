import Apartment from "../models/Apartment.js";

// Create Apartment
export const createApartment = async (req, res, next) => {
  const newApartment = new Apartment(req.body);

  try {
    const savedApartment = await newApartment.save();
    res.status(200).send(savedApartment);
  } catch (error) {
    next(error);
  }
};

// Update Apartment
export const updateApartment = async (req, res, next) => {
  try {
    const updatedApartment = await Apartment.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedApartment);
  } catch (error) {
    next(error);
  }
};

// Delete Apartment
export const deleteApartment = async (req, res, next) => {
  try {
    await Apartment.findByIdAndDelete(req.params.id);
    res.status(200).send("Apartment Has Been Deleted!");
  } catch (error) {
    next(error);
  }
};

// Get Single Apartment
export const getApartment = async (req, res, next) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    res.status(200).send(apartment);
  } catch (error) {
    next(error);
  }
};

// Get All Apartments
export const getAllApartments = async (req, res, next) => {
  try {
    const allApartments = await Apartment.find();
    res.status(200).send(allApartments);
  } catch (error) {
    next(error);
  }
};
