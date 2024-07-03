import { connectToDB } from "@/app/config/mongodb";
import Enregistrement from "@/app/models/EnregistrementModel";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  const {
    id,
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

    const updateDoc = await Enregistrement.findByIdAndUpdate(id, {
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

    if (updateDoc) {
      return NextResponse.json({
        message: "Modification effectué avec succès",
        success: true,
        updateDoc,
        status: 200,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      error: error.massage,
    });
  }
}
