"use client";

import { tokenService } from "@/lib/auth-token";
import { fetchUser } from "@/lib/redux/auth/auth.thunks";
import { useAppDispatch } from "@/lib/redux/hooks";

import { useEffect } from "react";

export const useAuthInit = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = tokenService.getToken();

    if (token) {
      dispatch(fetchUser());
    }
  }, [dispatch]);
};
