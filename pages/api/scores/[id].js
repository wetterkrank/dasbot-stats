import { getChatScores } from "../../../util/dasbot";

export default async (req, res) => {
  const id = parseInt(req.query.id);
  const chatScores = await getChatScores(id);
  res.json(chatScores);
};
