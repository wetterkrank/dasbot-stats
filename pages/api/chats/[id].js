import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { id } = req.query;
  const { db } = await connectToDatabase();

  const chat = await db
    .collection("chats")
    .find({ chat_id: parseInt(id) })
    .toArray() // Note the array here, required for .json() helper

  res.json(chat);
};

