"use client";

import SmallSpinner from "@/components/SmallSpinner";
import Spinner from "@/components/Spinner";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};
interface DataItem {
  _id: string;
  reference: string;
  name: string;
  lastname: string;
  lotissement: string;
  ilot: number;
  lot: number;
  category: string;
  superficie: string;
}

const EnregistrementsParNom = (props: Props) => {
  const [info, setInfo] = useState({
    ilot: "",
    lot: "",
  });
  const [data, setData] = useState<DataItem[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    const { ilot, lot } = info;

    try {
      setLoading(true); // Début du chargement
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/search/lot`,
        { ilot, lot }
      );

      if (res.data) {
        setData(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  console.log("data", data);

  return (
    <div className="p-3 md:p-7">
      <Link href={"/guide"}>
        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Retour Accueil
        </button>
      </Link>
      <div className=" py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="text-2xl mb-5">Retrouver par Ilot et Lot</h2>
        <form onSubmit={handleSearch} className="max-w-sm mx-auto ">
          <div className="mb-7">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ilot
            </label>
            <input
              type="number"
              id="ilot"
              name="ilot"
              onChange={(e) => setInfo({ ...info, ilot: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Entrer le numero d'Ilot"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Lot
            </label>
            <input
              type="number"
              id="lot"
              name="lot"
              onChange={(e) => setInfo({ ...info, lot: e.target.value })}
              placeholder="Le numero du lot"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Trouver
          </button>
        </form>
      </div>

      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-7">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-green-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  N° Reference
                </th>
                <th scope="col" className="px-6 py-3">
                  Nom
                </th>
                <th scope="col" className="px-6 py-3">
                  Lotissement
                </th>
                <th scope="col" className="px-6 py-3">
                  Ilot
                </th>
                <th scope="col" className="px-6 py-3">
                  Lot
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Superficie
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    <SmallSpinner />
                  </td>
                </tr>
              ) : (
                data?.map((item) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.reference}
                    </th>
                    <td className="px-6 py-4">
                      {" "}
                      {`${item.name} ${" "}${item.lastname}`}
                    </td>
                    <td className="px-6 py-4">{item.lotissement}</td>
                    <td className="px-6 py-4">{item.ilot}</td>
                    <td className="px-6 py-4">{item.lot}</td>
                    <td className="px-6 py-4">{item.category}.</td>
                    <td className="px-6 py-4">{item.superficie}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/enregistrement/edit/${item._id}`}
                        className="mr-4 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Réattribuer
                      </Link>

                      <Link
                        href={`/recaps/${item._id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Afficher
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EnregistrementsParNom;
