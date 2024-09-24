const roleData = require("./rolesData"); // Import your role data
const Roles = require("../models/Roles"); // Adjust the path as necessary for your Role model

async function insertRec(role) {
  try {
    // Insert the role into the database
    await Roles.create(role);
    console.log(`Inserted role: ${role.title}`);
  } catch (error) {
    console.error(`Error inserting role ${role.title}:`, error.message);
  }
}

async function process() {
  for (const role of roleData) {
    await insertRec(role); // Insert each role one by one
  }
  console.log("All roles have been processed.");
}

// Call the process function to start inserting roles
process();
