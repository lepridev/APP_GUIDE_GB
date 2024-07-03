"use client";

import SmallSpinner from "@/components/SmallSpinner";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};
type DataType = {
  _id: string;
  reference: string;
  name: string;
  lastname: string;
  lotissement: string;
  ilot: string;
  lot: string;
  category: string;
  superficie: string;
};

const EnregistrementsParRef = (props: Props) => {
  const [reference, setReference] = useState("");
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/search/ref", { reference });
      setData(res.data?.data ?? null);

      setError(null);
    } catch (error) {
      setError("Une erreur s'est produite lors de la recherche.");
    } finally {
      setLoading(false);
    }
  };

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
        <h2 className="text-2xl mb-5">Retrouver par Ref</h2>
        <form onSubmit={handleSearch}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex datas-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                {/* <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                /> */}
              </svg>
            </div>
            <input
              type="search"
              name="search"
              id="default-search"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Entrer la Reference de l'Attestation"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
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
                data && (
                  <tr
                    key={data._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {data.reference}
                    </th>
                    <td className="px-6 py-4">
                      {" "}
                      {`${data.name} ${" "}${data.lastname}`}
                    </td>
                    <td className="px-6 py-4">{data.lotissement}</td>
                    <td className="px-6 py-4">{data.ilot}</td>
                    <td className="px-6 py-4">{data.lot}</td>
                    <td className="px-6 py-4">{data.category}.</td>
                    <td className="px-6 py-4">{data.superficie}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/enregistrement/edit/${data._id}`}
                        className="mr-4 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Réattribuer
                      </Link>

                      <Link
                        href={`/recaps/${data._id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Afficher
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EnregistrementsParRef;
