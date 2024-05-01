const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const chatController = {
  index: async (req, res) => {
    const userId = req.user.id;

    try {
      const activeChats = await prisma.$queryRaw(Prisma.sql`
        SELECT 
            C.id AS chatId,
            U.username AS participantUsername,
            U.id AS participantUserId,
            M.content AS lastMessage
        FROM
            Chat C
        JOIN
            Participant P1 ON C.id = P1.chatId
        JOIN
            Participant P2 ON C.id = P2.chatId AND P1.userId != P2.userId
        JOIN
            User U ON P2.userId = U.id
        JOIN
            Message M ON C.id = M.chatId
        WHERE
            P1.userId = ${userId} 
            AND M.id = (
                SELECT MAX(M2.id) 
                FROM Message M2
                WHERE M2.chatId = C.id
            )
            AND P2.userId != ${userId}
        GROUP BY
            C.id, U.username, M.content
        ORDER BY
            C.id DESC;
      `);

      const chatIds = activeChats.map((chat) => chat.chatId);

      let messages = [];
      if (chatIds.length > 0) {
        messages = await prisma.$queryRaw(Prisma.sql`
        SELECT 
          Message.*,
          User.username AS participantUsername,
          User.profileImage AS participantProfileImage
        FROM Message
        JOIN User ON Message.userId = User.id
        WHERE Message.chatId IN (${Prisma.join(chatIds)})
        ORDER BY Message.id ASC
      `);
      }

      const chats = activeChats.map((chat) => {
        let chatMessages = messages.filter((msg) => msg.chatId === chat.chatId);
        return {
          participantUserId: chat.participantUserId,
          participantUsername: chat.participantUsername,
          chatId: chat.chatId,
          messages: chatMessages,
          lastMessage: chat.lastMessage,
        };
      });

      res.status(200).json({
        data: chats,
        page: 1,
        total: chats.length,
        last_page: 1,
      });
    } catch (error) {
      console.error("Error fetching active chats:", error);
      res.status(500).json({ error: "Unable to fetch active chats" });
    }
  },
};

module.exports = chatController;
