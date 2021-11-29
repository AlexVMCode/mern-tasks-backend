 const Role = require('../models/Role');

 const initialSetup = {};

 /**
 * @description Función para crear roles por defecto del sistema
 */
 initialSetup.createRoles = async () => {
    try {
        // Contar documentos de la colección roles.
        const count = await Role.estimatedDocumentCount();
    
        // Validar roles existentes
        if (count > 0) return;
    
        // Crear roles por defecto
        const values = await Promise.all([
          new Role({ name: "user" }).save(),
          new Role({ name: "admin" }).save(),
        ]);
      } catch (error) {
        console.error(error);
      }
};

module.exports = initialSetup;