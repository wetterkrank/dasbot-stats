import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { id } = req.query;
  const { db } = await connectToDatabase();

  const projection = { _id: 0, chat_id: 0 };
  const chatScores = await db
    .collection("scores")
    .find({ chat_id: parseInt(id) })
    .project(projection)
    .toArray()

  res.json(chatScores);
};
