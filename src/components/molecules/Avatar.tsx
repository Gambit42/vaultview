import React from "react";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import Text from "@/components/atoms/Text";

const Avatar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex flex-row space-x-2 items-center justify-center font-poppins">
      <div className="w-[35px] h-[35px] rounded-full bg-red-900" />
      <div className="flex flex-col">
        <Text as="p" styleVariant="T4">
          {user?.email}
        </Text>
      </div>
    </div>
  );
};

export default Avatar;
