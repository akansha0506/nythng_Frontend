
"use client";
import {
  useEffect,
  useState,
} from "react";

import AddAddress from "./AddAddress";
import EditAddressNew from "./EditAddressNew";
import addressImg from "@/assets/svg/address.svg";
import { usePathname } from "next/navigation";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  deleteAddress,
  fetchAddress,
  setDefaultAddress,
  setSelectedAddress,
} from "@/redux/slices/addressSlice";

import {
  fetchEstimate,
  setPincode,
} from "@/redux/slices/deliverySlice";

import Fadeloader from "@/components/common/Fadeloader";
import SecondryBtn from "@/components/ui/SecondaryButton";

const AddressTab = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [token, setToken] = useState(null);
  const [activeAdd, setActiveAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const {
    addresses = [],
    selectedAddress,
    loading,
  } = useSelector((state) => state.address);

  const pincode =
    selectedAddress?.postalCode;

  /* ================= TOKEN ================= */

  useEffect(() => {
    const storedToken =
      localStorage.getItem("token");

    setToken(storedToken);
  }, []);

  /* ================= FETCH ADDRESS ================= */

  useEffect(() => {
    if (!token) return;

    dispatch(fetchAddress());
  }, [dispatch, token]);

  /* ================= PINCODE ================= */

  useEffect(() => {
    if (!pincode) return;

    dispatch(setPincode(pincode));
    dispatch(fetchEstimate(pincode));
  }, [dispatch, pincode]);

  /* ================= SELECT ADDRESS ================= */

  const handleCheckboxChange = (address) => {
    dispatch(setSelectedAddress(address));
  };

  /* ================= CLOSE ADD ================= */

  const handleCloseAdd = () => {
    setActiveAdd(false);
    dispatch(fetchAddress());
  };

  /* ================= CLOSE EDIT ================= */

  const handleCloseEdit = () => {
    setIsEdit(false);
    setSelectedData({});
    dispatch(fetchAddress());
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-white">

      {/* =====================================================
          ADD ADDRESS MODAL
      ===================================================== */}

      <AnimatePresence>
        {activeAdd && (
          <motion.div
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-black/30
              px-3
              py-4
              backdrop-blur-sm
              sm:px-5
              md:px-8
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{
                scale: 0.95,
                opacity: 0,
                y: 15,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0.95,
                opacity: 0,
                y: 15,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="
                max-h-[95vh]
                w-full
                max-w-[900px]
                overflow-y-auto
                rounded-2xl
              "
            >
              <AddAddress
                setActiveAdd={handleCloseAdd}
                fetchAddress={fetchAddress}
              />
            </motion.div>
          </motion.div>
        )}

        {/* =====================================================
            EDIT ADDRESS MODAL
        ===================================================== */}

        {isEdit && (
          <motion.div
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-black/30
              px-3
              py-4
              backdrop-blur-sm
              sm:px-5
              md:px-8
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{
                scale: 0.95,
                opacity: 0,
                y: 15,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0.95,
                opacity: 0,
                y: 15,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="
                max-h-[95vh]
                w-full
                max-w-[900px]
                overflow-y-auto
                rounded-2xl
              "
            >
              <EditAddressNew
                setIsEdit={handleCloseEdit}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          HEADER
      ===================================================== */}

      {!activeAdd && !isEdit && (
        <div
          className="
            flex
            flex-col
            gap-4
            border-b
            border-[#E8EEEE]
            px-4
            py-4
            sm:px-5
            md:flex-row
            md:items-center
            md:justify-between
            md:px-6
            md:py-5
          "
        >
          {/* Heading */}

          <div>
            <p
              className="
                mb-1
                text-[9px]
                font-semibold
                uppercase
                tracking-[3px]
                text-[#61b9b9]
                sm:text-[10px]
              "
            >
              Delivery Address
            </p>

            <h2
              className="
                text-lg
                font-medium
                text-[#183838]
                sm:text-xl
                md:text-2xl
              "
            >
              Addresses
            </h2>

            <p
              className="
                mt-1
                text-xs
                text-[#789292]
                sm:text-sm
              "
            >
              Select where you'd like your order
              delivered.
            </p>
          </div>

          {/* Add Address */}

        <SecondryBtn
            text="Add Address"
           onClick={() => setActiveAdd(true)}
          className="
            flex
            w-full
            items-center
            justify-center
            sm:w-auto
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1.5 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>

          Add Address
        </SecondryBtn>
        </div>
      )}

      {/* =====================================================
          CONTENT
      ===================================================== */}

      {!loading ? (
        <>
          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {addresses.length === 0 ? (
            <div
              className="
                flex
                min-h-[280px]
                flex-col
                items-center
                justify-center
                px-5
                py-10
                text-center
                sm:min-h-[350px]
                sm:py-12
              "
            >
              <img
                src={addressImg.src}
                alt="No address"
                className="
                  mb-5
                  h-auto
                  w-32
                  opacity-80
                  sm:w-40
                  md:w-48
                "
              />

              <h3
                className="
                  text-lg
                  font-medium
                  text-[#183838]
                  sm:text-xl
                  md:text-2xl
                "
              >
                No Address Found
              </h3>

              <p
                className="
                  mt-2
                  max-w-sm
                  text-xs
                  leading-5
                  text-[#789292]
                  sm:text-sm
                "
              >
                You haven't added any delivery
                address yet.
              </p>

              <button
                type="button"
                onClick={() => setActiveAdd(true)}
                className="
                  mt-5
                  flex
                  cursor-pointer
                  items-center
                  gap-1.5
                  rounded-xl
                  bg-[#61b9b9]
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-[#55aaaa]
                "
              >
                <span className="text-lg leading-none">
                  +
                </span>

                Add New Address
              </button>
            </div>
          ) : (
            /* ================================================
               ADDRESS GRID
            ================================================ */

            <div
              className="
                grid
                grid-cols-1
                gap-4
                p-4
                sm:gap-5
                sm:p-5
                md:grid-cols-2
                md:p-6
                xl:gap-6
              "
            >
              {addresses.map(
                (item, index) => (
                  <div
                    key={
                      item?._id ||
                      index
                    }
                    className="
                      relative
                      flex
                      min-w-0
                      flex-col
                      justify-between
                      rounded-2xl
                      border
                      border-[#E5EEEE]
                      bg-white
                      p-4
                      shadow-[0_6px_25px_rgba(53,84,84,0.05)]
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:shadow-[0_12px_30px_rgba(53,84,84,0.09)]
                      sm:p-5
                    "
                  >
                    {/* DEFAULT */}

                    {item.isDefault && (
                      <span
                        className="
                          absolute
                          right-4
                          top-4
                          rounded-lg
                          bg-[#FFF3E5]
                          px-2.5
                          py-1
                          text-[10px]
                          font-semibold
                          text-[#8A5A2B]
                          sm:text-xs
                        "
                      >
                        Default
                      </span>
                    )}

                    {/* SELECT */}

                    {pathname === "/cart" && (
                      <label
                        className="
                          mb-4
                          flex
                          w-fit
                          max-w-[75%]
                          cursor-pointer
                          items-center
                          gap-2
                          rounded-lg
                          bg-[#FFF3E5]
                          px-2.5
                          py-1.5
                          text-[10px]
                          font-medium
                          text-[#355454]
                          sm:text-xs
                        "
                      >
                        <input
                          type="checkbox"
                          name={`selectAddress-${item._id}`}
                          checked={
                            selectedAddress?._id ===
                            item._id
                          }
                          onChange={() =>
                            handleCheckboxChange(
                              item
                            )
                          }
                          className="
                            h-3.5
                            w-3.5
                            rounded
                            border-[#3d6d6d]
                            accent-[#3d6d6d]
                            sm:h-4
                            sm:w-4
                          "
                        />

                        Select Address
                      </label>
                    )}

                    {/* ADDRESS DETAILS */}

                    <div className="min-w-0 space-y-1.5">

                      <h3
                        className="
                          inline-block
                          max-w-[70%]
                          truncate
                          rounded-lg
                          bg-[#F1F5F5]
                          px-2.5
                          py-1
                          text-xs
                          font-medium
                          capitalize
                          text-[#355454]
                        "
                      >
                        {item.type}
                      </h3>

                      <h5
                        className="
                          break-words
                          pr-16
                          text-sm
                          font-semibold
                          text-[#183838]
                          sm:text-base
                        "
                      >
                        {item.fullName}{" "}
                        <span className="font-normal text-[#789292]">
                          || {item.phoneNumber}
                        </span>
                      </h5>

                      {item.addressLine1 && (
                        <p
                          className="
                            break-words
                            text-xs
                            leading-5
                            text-[#607474]
                            sm:text-sm
                          "
                        >
                          {item.addressLine1}
                        </p>
                      )}

                      {item.addressLine2 && (
                        <p
                          className="
                            break-words
                            text-xs
                            leading-5
                            text-[#607474]
                            sm:text-sm
                          "
                        >
                          {item.addressLine2}
                        </p>
                      )}

                      <p
                        className="
                          break-words
                          text-xs
                          leading-5
                          text-[#607474]
                          sm:text-sm
                        "
                      >
                        {item.city},{" "}
                        {item.state?.name} -{" "}
                        {item.postalCode}
                      </p>
                    </div>

                    {/* ACTIONS */}

                    <div
                      className="
                        mt-5
                        flex
                        flex-wrap
                        gap-2
                        border-t
                        border-[#EDF2F2]
                        pt-4
                      "
                    >
                      <button
                        type="button"
                        className="
                          cursor-pointer
                          rounded-lg
                          border
                          border-[#DCEAEA]
                          px-3
                          py-1.5
                          text-xs
                          font-medium
                          text-[#355454]
                          transition
                          hover:bg-[#F6FAFA]
                          sm:text-sm
                        "
                        onClick={() => {
                          setSelectedData(item);
                          setIsEdit(true);
                        }}
                      >
                        Edit
                      </button>

                      {pathname !== "/cart" && (
                        <>
                          <button
                            type="button"
                            className="
                              cursor-pointer
                              rounded-lg
                              border
                              border-red-200
                              px-3
                              py-1.5
                              text-xs
                              font-medium
                              text-red-600
                              transition
                              hover:bg-red-50
                              sm:text-sm
                            "
                            onClick={() =>
                              dispatch(
                                deleteAddress(
                                  item._id
                                )
                              )
                            }
                          >
                            Delete
                          </button>

                          {!item.isDefault && (
                            <button
                              type="button"
                              className="
                                cursor-pointer
                                rounded-lg
                                border
                                border-[#CDE3E3]
                                px-3
                                py-1.5
                                text-xs
                                font-medium
                                text-[#355454]
                                transition
                                hover:bg-[#F1F8F8]
                                sm:text-sm
                              "
                              onClick={() =>
                                dispatch(
                                  setDefaultAddress(
                                    item._id
                                  )
                                )
                              }
                            >
                              Set as Default
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </>
      ) : (
        <div className="min-h-[300px]">
          <Fadeloader />
        </div>
      )}
    </div>
  );
};

export default AddressTab;