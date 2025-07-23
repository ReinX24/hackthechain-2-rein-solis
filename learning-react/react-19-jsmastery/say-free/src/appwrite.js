import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(PROJECT_ID);

const database = new Databases(client);

export const addNewMessage = async (username, newMessage) => {
  try {
    await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      username: username,
      message_content: newMessage,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllMessages = async (cursor = null, limit = 5) => {
  try {
    const queries = [Query.orderDesc("$createdAt"), Query.limit(limit)];
    if (cursor) queries.push(Query.cursorAfter(cursor));

    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      queries
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};
