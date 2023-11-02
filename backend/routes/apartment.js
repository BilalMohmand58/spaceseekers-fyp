import express from "express";
import {
  createApartment,
  deleteApartment,
  getAllApartments,
  getApartment,
  updateApartment,
} from "../controllers/apartment.js";

const router = express.Router();

//Create
router.post("/", createApartment);
//Update
router.put("/:id", updateApartment);
//Delete
router.delete("/:id", deleteApartment);
//Get
router.get("/:id", getApartment);
//Get All
router.get("/", getAllApartments);

export default router;
