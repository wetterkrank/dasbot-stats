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
      chats: JSON.parse(JSON.stringify(chats)),
    },
  };
}