"use client";

import { tokenService } from "@/lib/auth-token";
import { useAppDispatch } from "@/redux/hooks";
import { fetchUser } from "@/redux/auth/auth.thunks";
import { useEffect } from "react";
import { setAuthResolved } from "@/redux/auth/auth.slice";

export const useAuthInit = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = tokenService.getToken();

    if (token) {
      dispatch(fetchUser());
    } else {
      dispatch(setAuthResolved());
    }
  }, [dispatch]);
};
