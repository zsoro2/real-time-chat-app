const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const messageController = {
  store: async (req, res, io) => {
    const { content, userId, receiverId } = req.body;

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
        const insertChatResult = await prisma.$executeRaw(
          Prisma.sql`INSERT INTO Chat (type) VALUES ('private');`
        );
        const newChatId = insertChatResult.insertId;

        // Insert participants
        await prisma.$executeRaw(
          Prisma.sql`INSERT INTO Participant (userId, chatId) VALUES (${userId}, ${newChatId}), (${receiverId}, ${newChatId});`
        );

        // Fetch the newly created chat with participants
        [chat] = await prisma.$queryRaw(
          Prisma.sql`SELECT * FROM Chat WHERE id = ${newChatId};`
        );
      }
      let msgStatus = 'read';
      // Add message to the chat using raw SQL, regardless of whether the chat is new or existing
      await prisma.$executeRaw(
        Prisma.sql`INSERT INTO Message (content, chatId, userId, status)
                    VALUES (${content}, ${chat.id}, ${userId}, ${msgStatus});`
      );

      io.emit('newMessage',  { content, chatId: chat.id, userId });

      res
        .status(201)
        .json({ message: { content, chatId: chat.id, userId }, chat });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Unable to send message -" + error });
    }
  },
};

module.exports = messageController;
