import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const Searchbar = () => {
  return (
    <div className="flex flex-row items-center justify-center px-2 bg-background-secondary border border-[#DCDCDD] rounded-lg dark:border-none">
      <Image width={20} height={20} alt="" src="/icons/search-icon.svg" />
      <Input
        className="border-none shadow-none focus:outline-none text-black dark:text-white"
        placeholder="Search"
      />
    </div>
  );
};

export default Searchbar;
