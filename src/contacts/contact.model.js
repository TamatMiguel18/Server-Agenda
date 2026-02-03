"use strict";

import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  contactName: {
    type: String,
    required: true,
    trim: true,
    maxLength: [
      100,
      "En monbre del Contacto no puede tener mas de 100 caracteres",
    ],
  },
    contactCell: {
    type: String,
    required: [true, "El numero de contacto es requerido"],
  },
});
//indices para optimizar busquedas
contactSchema.index({ isActive: 1 });
contactSchema.index({ contactName: 1 });
contactSchema.index({ contactName: 1, isActive: 1 });

export default mongoose.model("Contact", contactSchema);