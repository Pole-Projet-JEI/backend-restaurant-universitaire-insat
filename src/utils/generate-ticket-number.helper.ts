import { randomBytes } from "crypto";

export function generateRandomTicketNumber(): string {
  console.log("hello");
  try {
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomPart = randomBytes(4).toString("hex").toUpperCase();
    return `${datePart}-${randomPart}`;
  } catch (error) {
    throw new Error("Failed to generate ticket number: " + error.message);
  }
}
