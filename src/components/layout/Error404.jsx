import Image from "next/image";
import errorImage from "@/assets/images/error.jpg";
import SecondaryButton from "@/components/ui/SecondaryButton";

export default function Error404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-4">
      <Image
        src={errorImage}
        alt="Error page"
        className="h-[400px] w-auto object-contain"
        priority
      />

      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Oops! The page you are looking for does not exist or has been moved.
      </p>

      <SecondaryButton text="Go back home" to="/" />
    </div>
  );
}