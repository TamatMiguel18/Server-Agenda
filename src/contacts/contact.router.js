// importar dependecias 
import {Router} from "express";
import { getAllContacts, createContact } from "./contact.controller.js";


import { validateCreateContact } from "../../midedlewares/contact-validators.js";
const router = Router();

// Rutas GET
router.get("/", getAllContacts);
// Rutas POST
router.post("/", validateCreateContact, createContact);
//Rutas PUT

//Rutas DELETE

export default router;