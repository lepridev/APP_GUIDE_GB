"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const UpdaEnregistrement = ({ params }: any) => {
  const { id } = params;
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/search");
      if (res) {
        setData(res.data?.data);
        console.log(res.data?.data);
        console.log("All Data fetch...");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [enregistrement, setEnregistrement] = useState({
    reference: "",
    name: "",
    lastname: "",
    profession: "",
    adresse: "",
    contact: "",
    lotissement: "",
    ilot: 0,
    lot: 0,
    category: "",
    superficie: 0,
    observation: "",
    file: "",
    isFirstBuyer: "",
    antecedant: {
      vendeur: "",
      contactvendeur: "",
      adresseVendeur: "",
    },
  });

  const [distantData, setDistantData] = useState({
    reference: "",
    name: "",
    lastname: "",
    profession: "",
    adresse: "",
    contact: "",
    lotissement: "",
    ilot: 0,
    lot: 0,
    category: "",
    superficie: 0,
    observation: "",
    file: "",
    isFirstBuyer: "",
    antecedant: [
      {
        vendeur: "",
        contactvendeur: "",
        adresseVendeur: "",
      },
    ],
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setDistantData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleAntecedantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDistantData((prevState) => ({
      ...prevState,
      antecedant: [
        {
          ...prevState.antecedant[0],
          [name]: value,
        },
      ],
    }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(enregistrement);
    let dataTosend = {
      ...distantData,
      // reference: distantData.reference,
      // category: distantData.category,
      // ilot: distantData.ilot,
      // lot: distantData.lot,
      // lotissement: distantData.lotissement,
      // superficie: distantData.superficie,
      // antecedant: {
      //   vendeur: distantData.name,
      //   contactvendeur: distantData.contact,
      //   adresseVendeur: distantData.adresse,
      // },
      id: id,
    };
    console.log("dataTosend", dataTosend);

    try {
      const res = await axios.post("/api/add/update", dataTosend);
      if (res) {
        getAllData();
        router.push("/recaps");
        console.log("res", res);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const getDataByID = async () => {
    try {
      const res = await axios.post("/api/search/id", { id: id });
      if (res.data) {
        console.log("res.data.data", res.data.data);
        setDistantData(res.data.data);
      }
    } catch (error) {}
  };

  // console.log("dataTosend", dataTosend);

  useEffect(() => {
    getDataByID();
  }, [id]);

  console.log("distantData", distantData?.antecedant[0]);
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Modifier l&apos;enregistrement
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="reference"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  N° de Réference de l&apos;attestation
                </label>
                <input
                  type="text"
                  name="reference"
                  id="reference"
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="N° Reference"
                  value={distantData?.reference}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nom
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Nom"
                  required
                  onChange={handleChange}
                  value={distantData?.name}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="lastname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Prénoms
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Prénoms"
                  required
                  onChange={handleChange}
                  value={distantData?.lastname}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="profession"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Profession
                </label>
                <input
                  type="text"
                  name="profession"
                  id="profession"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Profession"
                  required
                  onChange={handleChange}
                  value={distantData?.profession}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="adresse"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Adresse
                </label>
                <input
                  type="text"
                  name="adresse"
                  id="adresse"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Adresse"
                  required
                  onChange={handleChange}
                  value={distantData?.adresse}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="contact"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contacts
                </label>
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Contacts"
                  required
                  onChange={handleChange}
                  value={distantData?.contact}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="lotissement"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nom du lottissement
                </label>
                <input
                  type="text"
                  name="lotissement"
                  id="lotissement"
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Nom du lottissement"
                  required
                  onChange={handleChange}
                  value={distantData?.lotissement}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="ilot"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  N° Ilot
                </label>
                <input
                  type="text"
                  name="ilot"
                  id="ilot"
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Ilot"
                  required
                  onChange={handleChange}
                  value={distantData?.ilot}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="lot"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  N° Lot
                </label>
                <input
                  type="text"
                  name="lot"
                  id="lot"
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="N° Lot"
                  required
                  onChange={handleChange}
                  value={distantData?.lot}
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  onChange={handleChange}
                  value={distantData?.category}
                  id="category"
                  name="category"
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option>Choisisez la category</option>
                  <option value="ACD" selected>
                    ACD
                  </option>
                  <option value="ATT">ATT Villageoise</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="superficie"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Superficie (m2)
                </label>
                <input
                  type="number"
                  name="superficie"
                  id="superficie"
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="400"
                  required
                  onChange={handleChange}
                  value={distantData?.superficie}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="observation"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Observation
                </label>
                <textarea
                  id="observation"
                  name="observation"
                  rows={8}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Laisser un commentaire"
                  value={distantData?.observation}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="file"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Document d&apos;identité
                </label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  value={distantData?.file}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900 px-5 py-10 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                ></input>
              </div>
              <div>
                <label
                  htmlFor="isFirstBuyer"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Premier Acheteur
                </label>
                <select
                  value={distantData?.isFirstBuyer}
                  onChange={handleChange}
                  id="isFirstBuyer"
                  name="isFirstBuyer"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option>Choisisez</option>
                  <option value="Oui">Oui</option>
                  <option value="Non" selected>
                    Non
                  </option>
                </select>
              </div>
              <h2>ANTECEDANT</h2>
              <div className="sm:col-span-2">
                <label
                  htmlFor="reference"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Vendu par
                </label>
                <input
                  type="text"
                  name="vendeur"
                  id="vendeur"
                  className=" @border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Nom du vendeur"
                  required
                  onChange={handleAntecedantChange}
                  value={distantData?.antecedant[0].vendeur}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="contactvendeur"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contact du vendeur
                </label>
                <input
                  type="text"
                  name="contactvendeur"
                  id="contactVendeur"
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Contact du vendeur"
                  required
                  onChange={handleAntecedantChange}
                  value={distantData?.antecedant[0].contactvendeur}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="adresseVendeur"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Adresse du vendeur
                </label>
                <input
                  type="text"
                  name="adresseVendeur"
                  id="adresseVendeur"
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Adresse du vendeur"
                  required
                  onChange={handleAntecedantChange}
                  value={distantData?.antecedant[0]?.adresseVendeur}
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between items-center">
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Modifier l&apos;enregistrement
              </button>
              <Link href={"/guide"}>
                <button
                  type="submit"
                  className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  Annuler
                </button>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UpdaEnregistrement;
