import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await mongooseConnect();
  const { users } = req.body;

  if (!Array.isArray(users) || users.length === 0) {
    return res.status(400).json({ message: "Users array is required." });
  }

  try {
    const createdUsers = [];

    for (const { name, email, password } of users) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log(`User with email ${email} already exists.`);
        continue; // Skip existing users
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashedPassword });
      createdUsers.push(newUser);
    }

    return res.status(201).json({
      message: `${createdUsers.length} user(s) created successfully.`,
      users: createdUsers,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
