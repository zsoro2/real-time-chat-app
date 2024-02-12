const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const chatController = {
  index: async (req, res) => {
    const userId = req.user.id;

    try {
      const activeChatIds = await prisma.$queryRaw(Prisma.sql`
        SELECT Chat.id
        FROM Chat
        JOIN Participant ON Chat.id = Participant.chatId
        WHERE Participant.userId = ${userId}
        GROUP BY Chat.id
      `);

      const chatIds = activeChatIds.map((chat) => chat.id);

      const messages = await prisma.$queryRaw(Prisma.sql`
        SELECT 
          Message.*,
          User.username AS senderUsername, 
          User.profileImage AS senderProfileImage
        FROM Message
        JOIN User ON Message.userId = User.id
        WHERE Message.chatId IN (${Prisma.join(chatIds)})
        ORDER BY Message.id ASC
      `);

      const chats = chatIds.map((chatId) => {
        return {
          chatId,
          messages: messages,
        };
      });

      res.json(chats);
    } catch (error) {
      console.error("Error fetching active chats:", error);
      res.status(500).json({ error: "Unable to fetch active chats" });
    }
  },
};

module.exports = chatController;
