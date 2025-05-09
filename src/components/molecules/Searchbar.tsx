import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import mobileNavbarStore from "@/context/MobileNavbarStore";

const Searchbar = () => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const { setIsMobileNavbarOpen } = mobileNavbarStore();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = (e.target as HTMLInputElement).value;
      router.push(`/market?search=${value}`);
      setIsMobileNavbarOpen(false);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center px-2 bg-background-secondary border border-[#DCDCDD] rounded-lg dark:border-none">
      <Image width={20} height={20} alt="" src="/icons/search-icon.svg" />
      <Input
        className="border-none shadow-none focus:outline-none text-black dark:text-white"
        placeholder="Search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      {value && (
        <p
          className="font-poppins text-[14px] font-medium pr-2 cursor-pointer"
          onClick={() => {
            router.push("/market");
            setValue("");
          }}
        >
          x
        </p>
      )}
    </div>
  );
};

export default Searchbar;
