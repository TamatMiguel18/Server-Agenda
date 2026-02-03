// importamos las dependecias
import Contact from "./contact.model.js"

// Get Controller
export const getAllContacts = async (req, res) => {
  try {
    // datos que vienen de la query
    const { page = 1, limit = 10, isActive = true } = req.query;

    // variable que utilizaremos para filtrar
    // Como se realiza el filtrado por isActive

    const filters = { isActive };
    // opciones de paginación
    const options = {
      // convertimos a numero
      page: parseInt(page),
      // convertimos a numero
      limit: parseInt(limit),
      // ordenar por decha de creación
      sort: { createAt: -1 },
    };

    // Realizamos la consulta al Schema Contact
    const contacts = await Contact.find(filters)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(options.sort);

    // contedo de documetos de consulta
    const total = await Contact.countDocuments(filters);

    // respueta

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        limit: limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.stack,
    });
  }
};

// POST: Crear un contacto
export const createContact = async (req, res) => {
  try {
    const contactData = {
      contactName: req.body.contactName,
      contactCell: req.body.contactCell,
    };

    const contact = new Contact(contactData);
    await contact.save();

    res.status(201).json({
      success: true,
      message: "Contacto creado exitosamente",
      data: contact
    });

  } catch (error) {
    console.error("ERROR CREATE CONTACT:", error);
    // Si es error de validación de Mongoose
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Errores de validación en el modelo",
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: "Error al crear el contacto",
      error: error.message
    });
  }
};
