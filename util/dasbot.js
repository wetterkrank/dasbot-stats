import { connectToDatabase } from "./mongodb";

export async function getChatsList() {
  const { db } = await connectToDatabase();
  
  const chats = await db
    .collection("chats")
    .find({})
    .sort({ last_seen: -1 })
    .toArray();
  
  return {
    props: {
      chats: JSON.parse(JSON.stringify(chats)), // TODO: Check if the bug's fixed
    },
  };
}

export async function getChat(id) {
  const { db } = await connectToDatabase();

  const chat = await db
    .collection("chats")
    .find({ chat_id: id })
    .toArray() // Note the array here, required for .json() helper
  return chat;
}

export async function getChatScores(id) {
  const { db } = await connectToDatabase();

  const projection = { _id: 0, chat_id: 0 };
  const chatScores = await db
    .collection("scores")
    .find({ chat_id: id })
    .project(projection)
    .toArray()
  return chatScores;
}
