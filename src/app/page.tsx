import Accueil from "@/components/Home";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:p-24 p-10">
      <Accueil />
    </main>
  );
}
