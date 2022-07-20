import React from "react";
import { useAppContext } from "context";

export const useUser = () => {
  const [user] = useAppContext();
  if (!user?.fusionAuthUser) return { error: true };

  const { fullName, username, imageUrl: avatar } = user?.fusionAuthUser;

  return {
    ...user,
    fullName,
    username,
    avatar,
    error: user?.futionAuthUser ? false : true,
    firstName: fullName?.includes(" ") ? fullName?.split(" ")[0] : null,
    lastName: fullName?.includes(" ") ? fullName?.split(" ")[1] : null,
  };
};
