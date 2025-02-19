import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/dbConfig"
import User from "@/models/User.model"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email Or Password Required" },
        { status: 400 }
      )
    }
    await connectToDatabase()

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email Is Already Registerd" },
        { status: 400 }
      )
    }
    await User.create({
      email,
      password,
    })
    return NextResponse.json(
      { message: "User Registerd Successfully" },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed To Register User", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed To Register User", details: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
