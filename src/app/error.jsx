"use client";

import Error500 from "@/components/layout/Error500";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <Error500 />;
}