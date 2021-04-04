import { getChat } from "../../../util/dasbot";

export default async (req, res) => {
  const id = parseInt(req.query.id);
  const chat = await getChat(id);
  res.json(chat);
};
