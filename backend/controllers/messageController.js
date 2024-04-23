const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const messageController = {
  store: async (req, res, io) => {
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
    const userId = req.user.id;
    const { content, receiverId } = req.body;

    try {
      let [chat] = await prisma.$queryRaw(
        Prisma.sql`SELECT * FROM Chat 
                    WHERE id IN (
                      SELECT chatId FROM Participant WHERE userId IN (${userId}, ${receiverId})
                      GROUP BY chatId
                      HAVING COUNT(DISTINCT userId) = 2
                    )
                    LIMIT 1;`
      );

      if (!chat) {
        // Insert new chat
        await prisma.$executeRaw(
          Prisma.sql`INSERT INTO Chat (type, createdAt, updatedAt) VALUES ('private', ${currentDate}, ${currentDate});`
        );
        const [insertChatResult] = await prisma.$queryRaw(
          Prisma.sql`SELECT LAST_INSERT_ID() as insertId;`
        );
        const newChatId = insertChatResult.insertId;
        [chat] = await prisma.$queryRaw(
          Prisma.sql`SELECT * FROM Chat WHERE id = ${newChatId};`
        );

        // Insert participants
        await prisma.$executeRaw(
          Prisma.sql`INSERT INTO Participant (userId, chatId, joinedAt) VALUES (${userId}, ${newChatId}, ${currentDate}), (${receiverId}, ${newChatId}, ${currentDate});`
        );
      }

      let msgStatus = "read";
      await prisma.$executeRaw(
        Prisma.sql`INSERT INTO Message (content, chatId, userId, status)
                    VALUES (${content}, ${chat.id}, ${userId}, ${msgStatus});`
      );

      io.emit("newMessage", { content, chatId: chat.id, userId });

      res
        .status(201)
        .json({ message: { content, chatId: chat.id, userId }, chat });
    } catch (error) {
      res.status(400).json({ error: "Unable to send message -" + error });
    }
  },
};

module.exports = messageController;
