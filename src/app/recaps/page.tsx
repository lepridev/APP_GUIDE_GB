"use client";

import SmallSpinner from "@/components/SmallSpinner";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

const ListeDesEnregistrements = (props: Props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/search`
      );
      if (res) {
        setData(res.data?.data);
        console.log("Data fetched:", res.data?.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
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
              data.map((item: any) => (
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
                    {`${item.name} ${item.lastname}`}
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
                      href={`/enregistrement/update/${item._id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Modifier
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
  );
};

export default ListeDesEnregistrements;
