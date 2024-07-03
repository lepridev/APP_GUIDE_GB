import { connectToDB } from "@/app/config/mongodb";
import Enregistrement from "@/app/models/EnregistrementModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const reqBody = await req.json();
    const { reference } = reqBody;

    const data = await Enregistrement.findOne({ reference });
    if (data) {
      return NextResponse.json({
        message: "Enregistrement trouvé.",
        success: true,
        data,
      });
    } else {
      return NextResponse.json({
        message: "Aucun enregistrement trouvé pour la référence fournie.",
        success: false,
      });
    }
  } catch (error) {
    console.error("Erreur lors de la recherche de l'enregistrement:", error);
    return NextResponse.json({
      error:
        "Une erreur s'est produite lors de la recherche de l'enregistrement.",
      success: false,
    });
  }
}
