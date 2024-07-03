import { connectToDB } from "@/app/config/mongodb";
import Enregistrement from "@/app/models/EnregistrementModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { id } = reqBody;

  try {
    await connectToDB();
    const data = await Enregistrement.findById(id);
    if (data) {
      return NextResponse.json({
        message: "Enregistrement trouvé..",
        success: true,
        data,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
