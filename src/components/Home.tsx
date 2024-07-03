"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const Accueil = (props: Props) => {
  const router = useRouter();
  return (
    <div>
      <h1 className="text-3xl font-semibold py-4 space-y-1 text-center">
        Bienvenue <br />
        Guide Lottissement <br /> GBOUGBO BREKE
      </h1>
      <div className="w-full flex-col flex md:flex-row items-center justify-center">
        <div className="flex items-center justify-center p-2 md:p-7 h-[2OOpx] md:w-2/5 border-4 rounded-lg border-blue-600">
          <Image
            src={"/assets/lotissement.jpeg"}
            alt="lotissement gbougbo"
            width={400}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div className="md:w-3/5 flex items-center justify-center p-7 h-[2OOpx] w-full">
          <form className="w-full md:max-w-lg mx-auto ">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Votre email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="votre-email@gmail.com"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Votre mot de passe
              </label>
              <input
                type="password"
                id="password"
                placeholder="Votre  mot de passe"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Connexion
            </button>
          </form>
        </div>
      </div>
      <button
        onClick={() => router.push("/guide")}
        className="py-2 px-5 bg-red-400 rounded-md text-white text-sm cursor-pointer"
      >
        GUIDE
      </button>
    </div>
  );
};

export default Accueil;
