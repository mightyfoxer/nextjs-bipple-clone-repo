import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { ChannelType, MemberRole } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the name is "general" before creating the server
    if (name === "general") {
      return new NextResponse("Name cannot be 'general'", { status: 400 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [
            {
              name: "Announcements",
              profileId: profile.id,
              type: ChannelType.TEXT,
            },
            { name: "general", profileId: profile.id, type: ChannelType.TEXT },
            {
              name: "Voice chat",
              profileId: profile.id,
              type: ChannelType.AUDIO,
            },
            {
              name: "Marketplace",
              profileId: profile.id,
              type: ChannelType.TEXT,
            }, // Custom implementation planned
            {
              name: "Sneak-peeks",
              profileId: profile.id,
              type: ChannelType.TEXT,
            },
            { name: "Team", profileId: profile.id, type: ChannelType.TEXT }, // Custom implementation planned
          ],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    if (!server.id) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
