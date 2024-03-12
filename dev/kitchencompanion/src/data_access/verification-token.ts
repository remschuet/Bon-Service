import { db } from "@/db/prisma_db";

export async function getVerificationToken(token: string) {
    try {
        await db.verificationToken.findUnique({
            data: {
                token,
            },
        });
    } catch (e) {
        return null;
    }
}
