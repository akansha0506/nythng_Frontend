// "use client";

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   fetchEstimate,
//   setPincode,
// } from "@/redux/slices/deliverySlice";

// import { MapPin, X } from "lucide-react";

// export default function PincodeChecker() {
//   const [isModalOpen, setIsModalOpen] =
//     useState(false);

//   const [inputPin, setInputPin] =
//     useState("");

//   const dispatch = useDispatch();

//   const {
//     value: savedPincode,
//     estimate,
//     loading,
//     error,
//   } = useSelector(
//     (state) => state.pincode
//   );


//   // ==========================================
//   // SAVE PINCODE
//   // ==========================================

//   const handleSave = (e) => {
//     e.preventDefault();

//     // Only 6 digit pincode
//     if (!/^\d{6}$/.test(inputPin)) {
//       return;
//     }

//     dispatch(setPincode(inputPin));

//     dispatch(
//       fetchEstimate(inputPin)
//     );

//     setIsModalOpen(false);
//   };


//   // ==========================================
//   // FETCH ESTIMATE
//   // ==========================================

//   useEffect(() => {
//     if (savedPincode) {
//       dispatch(
//         fetchEstimate(savedPincode)
//       );
//     }
//   }, [dispatch, savedPincode]);


//   return (
//     <div className="relative z-10">

//       {/* ========================================
//           SAVED PINCODE
//       ======================================== */}

//       {savedPincode ? (

//         <div className="flex w-full flex-col justify-between pt-2 text-sm text-[#3d6d6d] sm:flex-row sm:items-center sm:gap-0">

//           <div className="flex w-full flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2">

//             <div className="flex flex-wrap items-center gap-2 text-sm">

//               <MapPin className="h-4 w-4 text-[#3d6d6d]" />

//               <span className="text-[#457980]">
//                 Deliver to{" "}
//                 <strong>
//                   {savedPincode}
//                 </strong>
//               </span>

//               <span className="text-gray-400">
//                 |
//               </span>

//               <span className="text-[#3d6d6d]">
//                 🚚 Delivery in{" "}
//                 <strong>
//                   24–48 hrs
//                 </strong>
//               </span>

//             </div>

//           </div>


//           {/* CHANGE */}

//           <button
//             type="button"
//             onClick={() =>
//               setIsModalOpen(true)
//             }
//             className="mt-2 ml-2 mr-2 cursor-pointer rounded-md border border-[#3d6d6d]/80 px-6 py-1 text-xs transition hover:scale-105 sm:mt-0"
//           >
//             Change
//           </button>

//         </div>

//       ) : (

//         /* ======================================
//            ENTER PINCODE
//         ====================================== */

//         <button
//           type="button"
//           onClick={() =>
//             setIsModalOpen(true)
//           }
//           className="flex cursor-pointer items-center gap-2 rounded-xl px-4 py-3 text-sm text-[#3d6d6d]"
//         >

//           <MapPin className="min-w-[20px]" />

//           <span className="w-full text-center">
//             Enter pincode for delivery estimate
//           </span>

//         </button>
//       )}


//       {/* ========================================
//           MODAL
//       ======================================== */}

//       {isModalOpen && (
//         <Modal
//           handleSave={handleSave}
//           setIsModalOpen={setIsModalOpen}
//           inputPin={inputPin}
//           setInputPin={setInputPin}
//           loading={loading}
//         />
//       )}

//     </div>
//   );
// }


// // =====================================================
// // PINCODE MODAL
// // =====================================================

// const Modal = ({
//   handleSave,
//   setIsModalOpen,
//   inputPin,
//   setInputPin,
//   loading,
// }) => {

//   // ==========================================
//   // LOCK BODY SCROLL
//   // ==========================================

//   useEffect(() => {
//     document.body.style.overflow =
//       "hidden";

//     return () => {
//       document.body.style.overflow =
//         "auto";
//     };
//   }, []);


//   // ==========================================
//   // HANDLE INPUT
//   // ==========================================

//   const handleInputChange = (e) => {
//     const value = e.target.value;

//     // Only numbers
//     const numbersOnly =
//       value.replace(/\D/g, "");

//     // Maximum 6 digits
//     setInputPin(
//       numbersOnly.slice(0, 6)
//     );
//   };


//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-2 backdrop-blur-sm sm:px-4">

//       <form
//         onSubmit={handleSave}
//         className="relative w-full max-w-xs rounded-2xl border border-orange-100 bg-white p-4 shadow-2xl sm:max-w-sm sm:p-6"
//       >

//         {/* ======================================
//             CLOSE MODAL
//         ====================================== */}

//         <button
//           type="button"
//           onClick={() =>
//             setIsModalOpen(false)
//           }
//           className="absolute right-3 top-3 cursor-pointer text-gray-500 transition hover:text-gray-700"
//           aria-label="Close"
//         >
//           <X size={20} />
//         </button>


//         {/* ======================================
//             TITLE
//         ====================================== */}

//         <h2 className="mb-4 text-center text-lg font-semibold text-[#457980] sm:text-xl">
//           Enter Delivery Pincode
//         </h2>


//         {/* ======================================
//             PINCODE INPUT
//         ====================================== */}

//         <div className="relative mb-4 flex w-full items-center justify-center">

//           <input
//             type="text"
//             value={inputPin}
//             onChange={handleInputChange}
//             placeholder="Enter 6-digit pincode"
//             maxLength={6}
//             inputMode="numeric"
//             autoFocus
//             className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-base text-gray-700 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 sm:text-lg"
//           />


//           {/* CLEAR INPUT */}

//           <button
//             type="button"
//             onClick={() =>
//               setInputPin("")
//             }
//             aria-label="Clear pincode"
//             className={`absolute right-2 cursor-pointer text-[#7a1712] transition ${
//               inputPin
//                 ? "visible"
//                 : "invisible"
//             }`}
//           >
//             <X size={18} />
//           </button>

//         </div>


//         {/* ======================================
//             CHECK BUTTON
//         ====================================== */}

//         <button
//           type="submit"
//           disabled={
//             loading ||
//             inputPin.length !== 6
//           }
//           className="w-full cursor-pointer rounded-lg bg-[#61b9b9] px-4 py-2 text-base font-medium text-white transition hover:bg-[#3d6d6d] disabled:cursor-not-allowed disabled:opacity-60 sm:text-lg"
//         >

//           {loading
//             ? "Checking..."
//             : "Check"}

//         </button>

//       </form>

//     </div>
//   );
// };

"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEstimate,
  setPincode,
} from "@/redux/slices/deliverySlice";
import { MapPin, X, Truck } from "lucide-react";

export default function PincodeChecker() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputPin, setInputPin] = useState("");

  const dispatch = useDispatch();

  const {
    value: savedPincode,
    estimate,
    loading,
    error,
  } = useSelector((state) => state.pincode);

  // ==========================================
  // SAVE PINCODE
  // ==========================================

  const handleSave = (e) => {
    e.preventDefault();

    // Only 6 digit pincode
    if (!/^\d{6}$/.test(inputPin)) {
      return;
    }

    dispatch(setPincode(inputPin));
    dispatch(fetchEstimate(inputPin));

    setIsModalOpen(false);
  };

  // ==========================================
  // FETCH ESTIMATE
  // ==========================================

  useEffect(() => {
    if (savedPincode) {
      dispatch(fetchEstimate(savedPincode));
    }
  }, [dispatch, savedPincode]);

  // ==========================================
  // OPEN MODAL
  // ==========================================

  const openModal = () => {
    setInputPin(savedPincode || "");
    setIsModalOpen(true);
  };

  // ==========================================
  // CLOSE MODAL
  // ==========================================

  const closeModal = () => {
    if (!loading) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="relative z-10 w-full">
        {/* =====================================================
            SAVED PINCODE
        ===================================================== */}

        {savedPincode ? (
          <div
            className="
              flex
              w-full
              flex-col
              gap-3
              rounded-xl
              px-2
              py-2
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:gap-4
            "
          >
            {/* LEFT CONTENT */}

            <div
              className="
                flex
                min-w-0
                flex-1
                flex-wrap
                items-center
                gap-x-2
                gap-y-1
                text-xs
                sm:text-sm
              "
            >
              {/* PIN ICON */}

              <MapPin
                className="
                  h-4
                  w-4
                  shrink-0
                  text-[#3d6d6d]
                  sm:h-[18px]
                  sm:w-[18px]
                "
              />

              {/* DELIVERY TEXT */}

              <span className="text-[#457980]">
                Deliver to{" "}
                <strong className="font-semibold text-[#3d6d6d]">
                  {savedPincode}
                </strong>
              </span>

              {/* SEPARATOR */}

              <span className="hidden text-gray-300 sm:inline">
                |
              </span>

              {/* DELIVERY ESTIMATE */}

              <span className="flex items-center gap-1 text-[#3d6d6d]">
                <Truck
                  className="h-3.5 w-3.5"
                  strokeWidth={1.8}
                />

                <span>
                  Delivery in{" "}
                  <strong className="font-semibold">
                    {estimate?.deliveryTime ||
                      "24–48 hrs"}
                  </strong>
                </span>
              </span>
            </div>

            {/* CHANGE BUTTON */}

            <button
              type="button"
              onClick={openModal}
              className="
                w-full
                shrink-0
                cursor-pointer
                rounded-lg
                border
                border-[#3d6d6d]/60
                bg-white
                px-4
                py-2
                text-xs
                font-medium
                text-[#3d6d6d]
                transition-all
                duration-200
                hover:bg-[#3d6d6d]
                hover:text-white
                sm:w-auto
                sm:px-5
              "
            >
              Change
            </button>
          </div>
        ) : (
          /* =====================================================
             ENTER PINCODE
          ===================================================== */

          <button
            type="button"
            onClick={openModal}
            className="
              flex
              w-full
              cursor-pointer
              items-center
              justify-center
              gap-2
              rounded-xl
              px-3
              py-3
              text-center
              text-xs
              font-medium
              text-[#3d6d6d]
              transition-all
              duration-200
              hover:bg-[#f2f8f8]
              sm:px-4
              sm:text-sm
            "
          >
            <MapPin
              className="
                h-4
                w-4
                shrink-0
                sm:h-5
                sm:w-5
              "
            />

            <span>
              Enter pincode for delivery estimate
            </span>
          </button>
        )}
      </div>

      {/* =====================================================
          MODAL
      ===================================================== */}

      {isModalOpen && (
        <PincodeModal
          handleSave={handleSave}
          setIsModalOpen={setIsModalOpen}
          inputPin={inputPin}
          setInputPin={setInputPin}
          loading={loading}
          error={error}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

// =====================================================
// PINCODE MODAL
// =====================================================

const PincodeModal = ({
  handleSave,
  setIsModalOpen,
  inputPin,
  setInputPin,
  loading,
  error,
  closeModal,
}) => {
  // ==========================================
  // LOCK BODY SCROLL
  // ==========================================

  useEffect(() => {
    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        originalOverflow;
    };
  }, []);

  // ==========================================
  // ESCAPE KEY
  // ==========================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !loading) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [loading, setIsModalOpen]);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Only numbers
    const numbersOnly =
      value.replace(/\D/g, "");

    // Maximum 6 digits
    setInputPin(
      numbersOnly.slice(0, 6)
    );
  };

  // ==========================================
  // HANDLE BACKDROP CLICK
  // ==========================================

  const handleBackdropClick = (e) => {
    if (
      e.target === e.currentTarget &&
      !loading
    ) {
      setIsModalOpen(false);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        min-h-screen
        items-center
        justify-center
        bg-black/30
        px-3
        py-5
        backdrop-blur-sm
        sm:px-5
      "
      onMouseDown={handleBackdropClick}
    >
      <form
        onSubmit={handleSave}
        onMouseDown={(e) =>
          e.stopPropagation()
        }
        className="
          relative
          w-full
          max-w-[340px]
          overflow-hidden
          rounded-2xl
          border
          border-[#e7eeee]
          bg-white
          p-5
          shadow-[0_25px_70px_rgba(0,0,0,0.15)]
          sm:max-w-[400px]
          sm:rounded-3xl
          sm:p-7
          md:max-w-[440px]
        "
      >
        {/* =================================================
            CLOSE BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={closeModal}
          disabled={loading}
          className="
            absolute
            right-3
            top-3
            flex
            h-8
            w-8
            cursor-pointer
            items-center
            justify-center
            rounded-full
            text-gray-400
            transition-all
            duration-200
            hover:bg-gray-100
            hover:text-gray-700
            disabled:cursor-not-allowed
            disabled:opacity-50
            sm:right-4
            sm:top-4
          "
          aria-label="Close"
        >
          <X size={19} />
        </button>

        {/* =================================================
            ICON
        ================================================= */}

        <div
          className="
            mx-auto
            mb-4
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-[#EAF7F7]
            sm:h-14
            sm:w-14
          "
        >
          <MapPin
            className="
              h-5
              w-5
              text-[#3d6d6d]
              sm:h-6
              sm:w-6
            "
          />
        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <h2
          className="
            text-center
            text-lg
            font-semibold
            text-[#183838]
            sm:text-xl
            md:text-2xl
          "
        >
          Enter Delivery Pincode
        </h2>

        <p
          className="
            mx-auto
            mt-1.5
            max-w-xs
            text-center
            text-xs
            leading-5
            text-gray-500
            sm:text-sm
          "
        >
          Check delivery availability and
          estimated delivery time for your
          location.
        </p>

        {/* =================================================
            INPUT
        ================================================= */}

        <div className="relative mt-5">
          <input
            type="text"
            value={inputPin}
            onChange={handleInputChange}
            placeholder="Enter 6-digit pincode"
            maxLength={6}
            inputMode="numeric"
            autoFocus
            disabled={loading}
            className="
              h-12
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
              px-4
              pr-11
              text-sm
              tracking-wide
              text-gray-700
              outline-none
              transition-all
              placeholder:text-gray-400
              focus:border-[#61b9b9]
              focus:ring-2
              focus:ring-[#61b9b9]/15
              disabled:bg-gray-50
              sm:h-13
              sm:text-base
            "
          />

          {/* CLEAR INPUT */}

          <button
            type="button"
            onClick={() =>
              setInputPin("")
            }
            disabled={
              !inputPin || loading
            }
            aria-label="Clear pincode"
            className="
              absolute
              right-2
              top-1/2
              flex
              h-8
              w-8
              -translate-y-1/2
              cursor-pointer
              items-center
              justify-center
              rounded-full
              text-gray-400
              transition
              hover:bg-gray-100
              hover:text-[#7a1712]
              disabled:invisible
            "
          >
            <X size={17} />
          </button>
        </div>

        {/* =================================================
            VALIDATION MESSAGE
        ================================================= */}

        {inputPin.length > 0 &&
          inputPin.length < 6 && (
            <p className="mt-2 text-xs text-gray-500">
              Please enter a valid 6-digit
              pincode.
            </p>
          )}

        {/* =================================================
            REDUX ERROR
        ================================================= */}

        {error && (
          <div
            className="
              mt-3
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-3
              py-2.5
            "
          >
            <p className="text-center text-xs font-medium text-[#7a1712] sm:text-sm">
              {typeof error === "string"
                ? error
                : "Unable to check delivery for this pincode."}
            </p>
          </div>
        )}

        {/* =================================================
            CHECK BUTTON
        ================================================= */}

        <button
          type="submit"
          disabled={
            loading ||
            inputPin.length !== 6
          }
          className="
            mt-5
            flex
            h-12
            w-full
            cursor-pointer
            items-center
            justify-center
            rounded-xl
            bg-[#61b9b9]
            px-4
            text-sm
            font-semibold
            text-white
            shadow-[0_8px_20px_rgba(97,185,185,0.18)]
            transition-all
            duration-200
            hover:bg-[#3d6d6d]
            hover:shadow-[0_10px_25px_rgba(61,109,109,0.2)]
            disabled:cursor-not-allowed
            disabled:bg-gray-300
            disabled:shadow-none
            sm:text-base
          "
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span
                className="
                  h-4
                  w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-white/40
                  border-t-white
                "
              />

              Checking...
            </span>
          ) : (
            "Check Delivery"
          )}
        </button>

        {/* =================================================
            FOOTER
        ================================================= */}

        <p
          className="
            mt-3
            text-center
            text-[10px]
            leading-4
            text-gray-400
            sm:text-xs
          "
        >
          Enter your pincode to see estimated
          delivery availability.
        </p>
      </form>
    </div>
  );
};