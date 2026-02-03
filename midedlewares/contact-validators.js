import { body } from "express-validator";
import { checkValidators } from "./check-validators.js";

export const validateCreateContact = [
  body("contactName")
    .trim()
    .notEmpty().withMessage("El nombre del contacto es requerido")
    .isLength({ min: 2, max: 100 }).withMessage("El nombre debe tener entre 2 y 100 caracteres"),

  body("contactCell")
    .trim()
    .notEmpty().withMessage("El número del contacto es requerido")
    .isLength({ min: 8, max: 15 }).withMessage("El número debe tener entre 8 y 15 caracteres"),

  checkValidators
];
