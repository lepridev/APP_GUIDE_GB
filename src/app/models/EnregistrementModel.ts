import { Schema, model, models } from "mongoose";

const EnregistrementSchema = new Schema({
  reference: {
    type: String,
  },
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  profession: {
    type: String,
  },
  adresse: {
    type: String,
  },
  contact: {
    type: String,
  },
  lotissement: {
    type: String,
  },
  ilot: {
    type: String,
  },
  lot: {
    type: String,
  },
  category: {
    type: String,
  },
  superficie: {
    type: String,
  },
  Observation: {
    type: String,
  },
  file: {
    type: String,
  },
  isFirstBuyer: {
    type: String,
  },
  antecedant: {
    type: Array,
  },
});

const Enregistrement =
  models.Enregistrement || model("Enregistrement", EnregistrementSchema);

export default Enregistrement;
