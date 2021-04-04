import { getChatsList } from "../../../util/dasbot";

export default async (req, res) => {
  const chats = await getChatsList();
  res.json(chats);
};
