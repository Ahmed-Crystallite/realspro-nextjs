import { connectToDatabase } from "@/lib/dbConfig"
import { authOptions } from "@/lib/options"
import Videos, { IVideos } from "@/models/Video.model"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    await connectToDatabase()
    const videos = await Videos.find({}).sort({ createdAt: -1 }).lean()
    if (!videos || videos.length === 0) {
      return NextResponse.json([], { status: 200 })
    }
    return NextResponse.json(videos)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed To Fatch Videos" },
      { status: 500 }
    )
  }
}
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    await connectToDatabase()
    const body: IVideos = await request.json()
    if (
      !body.title ||
      !body.description ||
      !body.viderUrl ||
      !body.thumbnailUrl
    ) {
      return NextResponse.json(
        { error: "Missing Reqired Fields" },
        { status: 401 }
      )
    }

    const videoData = {
      ...body,
      controls: body.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformations?.quality ?? 100,
      },
    }
    const newVideo = await Videos.create(videoData)
    return NextResponse.json(newVideo)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed To Fatch Create A Video" },
      { status: 500 }
    )
  }
}
