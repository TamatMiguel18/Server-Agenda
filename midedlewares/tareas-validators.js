import { body, param } from "express-validator";
import { checkValidators } from "./check-validators";

export const validateCreateField = [
    body("TareaName")
        .trim()
        .notEmpty()
        .withMessage("El nombre de la tarea es requerido")
        .isLength({ min: 2, max: 100 })
        .withMessage("El nombre debe tener entre 2 y 100 caracteres"),
    body("TareaDescription")
        .trim()
        .notEmpty()
        .withMessage("La descripción de la tarea es requerida")
        .isLength({ min: 10, max: 500 })
        .withMessage("La descripción debe tener entre 10 y 500 caracteres"),
    body("TareaPriority")
        .notEmpty()
        .withMessage("La prioridad de la tarea es requerida")
        .isIn(["baja", "media", "alta"])
        .withMessage("La prioridad debe ser 'baja', 'media' o 'alta'"),

    checkValidators
];