import Image from "next/image";
import React from "react";

type Props = {};

const Spinner = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-start md:justify-center h-screen">
      <Image
        src={"/assets/12-dots-scale-rotate.svg"}
        width={100}
        height={100}
        alt="chargement"
      />
    </div>
  );
};

export default Spinner;
