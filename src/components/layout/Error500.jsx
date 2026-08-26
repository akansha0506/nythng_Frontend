"use client";

import SecondaryButton from "@/components/ui/SecondaryButton";

export default function Error500() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold primaryText mb-4">
        Something went wrong on our end.
      </h1>

      <p className="text-gray-600 mb-8 max-w-md">
        We&apos;re working on fixing it. Please try again in a little while, or
        return to the home page.
      </p>

      <SecondaryButton text="Go back home" to="/" />
    </div>
  );
}