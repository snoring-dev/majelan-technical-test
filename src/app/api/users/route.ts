import * as fs from "fs";
import users from "@/data/mockData.json";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  // add some delay to show loading state!
  // @TODO: delete this in production
  await new Promise((r) => setTimeout(r, 2000));

  // return all users
  return NextResponse.json(users);
}

export async function PATCH(req: Request) {
  // add some delay to show loading state!
  // @TODO: delete this in production
  await new Promise((r) => setTimeout(r, 2000));
  
  try {
    const { userId, username } = await req.json();

    if (!userId || !username) {
      return new NextResponse("userId & username are required", {
        status: 401,
      });
    }

    const position = users.findIndex((u) => u.id === userId);

    if (position === -1) {
      return new NextResponse("User not found", {
        status: 404,
      });
    }

    const updatedUser = { ...users[position], name: username };
    delete users[position];
    const updatedUsers = [...users.filter(u => u !== null), updatedUser];

    try {
      const appDir = path.resolve("./");
      const filePath = `${appDir}/src/data/mockData.json`;

      fs.writeFileSync(filePath, "");
      fs.writeFileSync(filePath, JSON.stringify(updatedUsers), "utf-8");
      console.log("File updated successfully.");
    } catch (e) {
      console.error(e);
    }

    return NextResponse.json(updatedUsers);
  } catch (e: any) {
    console.log("[USERS_PATCH]", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
