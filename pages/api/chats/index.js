import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const chats = await db
    .collection("chats")
    .find({})
    .sort({ last_seen: -1 })
    .toArray();

  res.json(chats);
};

