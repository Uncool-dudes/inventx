import db from "@/db"; // Adjust this import based on your db configuration
import { Users } from "@/db/schema"; // Adjust this import based on your schema location

export type insertUser = typeof Users.$inferInsert;

export async function insertUser(user: insertUser) {
  try {
    const insertedUser = await db
      .insert(Users)
      .values({
        ...user,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: Users.id,
        set: {
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
          updatedAt: new Date(),
        },
      })
      .returning();

    return {
      success: true,
      message: "User upserted successfully",
      user: insertedUser[0],
    };
  } catch (error) {
    console.error("Error in insertUser:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      error,
    };
  }
}
