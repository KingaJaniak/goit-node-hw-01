const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function generateId() {
  return Date.now().toString();
}

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error("Error reading contacts:", error);
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const filtered = contacts.filter((c) => c.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(filtered, null, 2));
  return contacts.length !== filtered.length;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: generateId(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
