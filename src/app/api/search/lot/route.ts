import { connectToDB } from "@/app/config/mongodb";
import Enregistrement from "@/app/models/EnregistrementModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { lot, ilot } = reqBody;

  try {
    await connectToDB();

    // Recherche à partir de l'ilot et du lot
    const data = await Enregistrement.find({ ilot: ilot, lot: lot });

    if (data && data.length > 0) {
      return NextResponse.json({
        message: "Enregistrement trouvé.",
        success: true,
        data,
      });
    } else {
      return NextResponse.json({
        message: "Aucun enregistrement trouvé.",
        success: false,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
