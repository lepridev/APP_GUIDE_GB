import { connectToDB } from "@/app/config/mongodb";
import Enregistrement from "@/app/models/EnregistrementModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  const {
    reference,
    name,
    lastname,
    profession,
    adresse,
    contact,
    lotissement,
    ilot,
    lot,
    category,
    superficie,
    Observation,
    file,
    isFirstBuyer,
    antecedant,
  } = reqBody;

  try {
    await connectToDB();
    console.log(reqBody);

    const saveDoc = await new Enregistrement({
      reference,
      name,
      lastname,
      profession,
      adresse,
      contact,
      lotissement,
      ilot,
      lot,
      category,
      superficie,
      Observation,
      file,
      isFirstBuyer,
      antecedant,
    });
    const sevedDoc = await saveDoc.save();
    if (sevedDoc) {
      return NextResponse.json({
        message: "Enregistrement effectué avec succès",
        success: true,
        sevedDoc,
        status: 200,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      error: error.massage,
    });
  }
}
