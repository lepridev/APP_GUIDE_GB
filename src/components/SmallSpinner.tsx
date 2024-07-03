import Image from "next/image";
import React from "react";

type Props = {};

const SmallSpinner = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-start md:justify-center h-[100px]">
      <Image
        src={"/assets/12-dots-scale-rotate.svg"}
        width={80}
        height={80}
        alt="chargement"
      />
    </div>
  );
};

export default SmallSpinner;
