import Link from "next/link";
import React from "react";

type Props = {};

const Guide = (props: Props) => {
  const options = [
    {
      title: "Enregistrer une Attestation",
      description:
        "Cliquez ici pour enregistrer une nouvelle attestation. Les  informations requises sont celles sur l'attestation",
      buttonTitle: "Nouvel Enregistrement",
      link: "/enregistrement",
    },
    {
      title: "Modifier un Enregistrement",
      description:
        "Cliquez ici pour modifier un enregistrement existant. Les  informations requises sont les informations du nouvel acheteur",
      buttonTitle: "Modifier un Enregistrement",
      link: "/recaps",
    },
    {
      title: "Rechercher par Nom",
      description:
        "Entrez le nom d'un Attributaire pour avoir les Etats concernant ce nom",
      buttonTitle: "Trouver",
      link: "/recaps/listesnom",
    },
    {
      title: "Rechercher par Ilot & Lot",
      description:
        "Entrez un Ilot et Lot pour avoir les Etats concernant ces informations",
      buttonTitle: "Trouver",
      link: "/recaps/lot",
    },
    {
      title: "Rechercher par Reference",
      description:
        "Entrez un numero de Reference d'une attestion pour avoir l'Etats",
      buttonTitle: "Trouver",
      link: "/recaps/listesref",
    },
    {
      title: "Afficher Tout",
      description:
        "Vous Affichez la liste complete des enregistrements dans la base de donnée",
      buttonTitle: "Afficher",
      link: "/recaps",
    },
  ];

  return (
    <div className="md:max-w-5xl mx-auto flex md:flex-row flex-col items-center gap-4 justify-center flex-wrap py-10 px-6">
      {options.map((option, index) => (
        <div
          key={index}
          className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {option.title}
            </h5>
          </a>
          <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
            {option.description}
          </p>
          <Link href={option.link}>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              {option.buttonTitle}
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                {/* <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                /> */}
              </svg>
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Guide;
