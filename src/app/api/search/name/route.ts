import { connectToDB } from "@/app/config/mongodb";
import Enregistrement from "@/app/models/EnregistrementModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { name } = reqBody;

  try {
    await connectToDB();

    // Utilisation d'une expression régulière pour rechercher le nom indépendamment de la casse
    const data = await Enregistrement.find({
      name: { $regex: new RegExp(name, "i") },
    });

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
