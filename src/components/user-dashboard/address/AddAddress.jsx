"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import StateCode from "@/utils/stateCode.json";

import {
  addAddress,
  resetAddressState,
} from "@/redux/slices/addressSlice";

import ScrollLock from "@/utils/ScrollLock";

import {
  Info,
  Loader2,
  X,
} from "lucide-react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddAddress = ({ setActiveAdd }) => {
  const dispatch = useDispatch();

  const { message } = useSelector(
    (state) => state.address
  );

  const [postalCodeError, setPostalCodeError] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [cityOptions, setCityOptions] =
    useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    type: "",
    city: "",
    state: {
      name: "",
      code: "",
    },
    postalCode: "",
    country: "India",
    isDefault: false,
  });

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    if (name === "isDefault") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (name === "state") {
      const selectedIndex =
        e.target.selectedIndex;

      const selectedName =
        e.target.options[
          selectedIndex
        ].text;

      setFormData((prev) => ({
        ...prev,
        state: {
          name: selectedName,
          code: value,
        },
      }));
    } else if (name === "phoneNumber") {
      if (value.length > 10) {
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: value.replace(/\D/g, ""),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const fetchLocationDetails =
      async () => {
        if (!formData.postalCode) {
          setPostalCodeError(false);
          setCityOptions([]);

          setFormData((prev) => ({
            ...prev,
            city: "",
            state: {
              name: "",
              code: "",
            },
          }));

          return;
        }

        if (
          formData.postalCode.length === 6
        ) {
          setPostalCodeError(false);

          try {
            const response =
              await fetch(
                `https://api.postalpincode.in/pincode/${formData.postalCode}`
              );

            const data =
              await response.json();

            const result = data[0];

            if (
              result.Status ===
                "Success" &&
              Array.isArray(
                result.PostOffice
              ) &&
              result.PostOffice.length >
                0
            ) {
              const cities =
                result.PostOffice.map(
                  (po) => po.Name
                );

              const stateName =
                result.PostOffice[0].State;

              const country =
                result.PostOffice[0].Country;

              const stateCodeEntry =
                Object.entries(
                  StateCode
                ).find(
                  ([code, name]) =>
                    name.toLowerCase() ===
                    stateName.toLowerCase()
                );

              setCityOptions(cities);

              setFormData((prev) => ({
                ...prev,
                city:
                  cities[0] || "",
                state: {
                  name: stateName,
                  code:
                    stateCodeEntry
                      ? stateCodeEntry[0]
                      : "",
                },
                country: country,
              }));
            } else {
              setPostalCodeError(true);
              setCityOptions([]);

              setFormData((prev) => ({
                ...prev,
                city: "",
                state: {
                  name: "",
                  code: "",
                },
                country: "India",
              }));
            }
          } catch (error) {
            console.error(
              "Failed to fetch postal info:",
              error
            );

            setPostalCodeError(true);
            setCityOptions([]);

            setFormData((prev) => ({
              ...prev,
              city: "",
              state: {
                name: "",
                code: "",
              },
              country: "India",
            }));
          }
        }
      };

    fetchLocationDetails();
  }, [formData.postalCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (
      !formData.fullName ||
      !formData.phoneNumber ||
      !formData.addressLine1 ||
      !formData.postalCode ||
      !formData.city ||
      !formData.state.code ||
      !formData.country ||
      !formData.type
    ) {
      toast.error(
        "Please fill all required fields"
      );

      setLoading(false);
      return;
    }

    if (
      formData.phoneNumber.length !== 10
    ) {
      toast.warn(
        "Please enter a valid 10-digit phone number"
      );

      setLoading(false);
      return;
    }

    try {
      await dispatch(
        addAddress(formData)
      ).unwrap();

      toast.success(
        message ||
          "Address added successfully"
      );

      setActiveAdd(false);
    } catch (error) {
      console.error(
        "Failed to add address:",
        error
      );

      toast.error(
        "Failed to add address"
      );
    } finally {
      setLoading(false);
      dispatch(resetAddressState());
    }
  };

  return (
    <>
      <ScrollLock />

      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-2xl
          border
          border-[#61b9b9]-100
          max-md:max-h-[75vh]
          overflow-y-auto
        "
      >
        {/* Header */}
        <div
          className="
            sticky
            top-0
            z-10
            border-b
            border-[#613b19]/15
            bg-gradient-to-r
            from-[#613b19]/[0.05]
            via-white
            to-[#613b19]/[0.05]
            px-6
            py-5
          "
        >
          <button
            onClick={() =>
              setActiveAdd(false)
            }
            className="
              absolute
              right-5
              top-3
              md:p-4
              rounded-full
              p-2
              hover:bg-[#613b19]/10
              transition
            "
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-bold text-gray-900">
            Add New Address
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Save an address for faster
            checkout.
          </p>
        </div>

        <div className="space-y-3 px-5 py-4">

          {/* Name + Phone */}
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-3
              rounded-2xl
              border
              border-[#613b19]/15
              bg-[#61b9b9]/[0.03]
              p-3
              md:p-4
            "
          >
            <div>
              <Label className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Full Name
              </Label>

              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="inputField"
              />
            </div>

            <div>
              <Label className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Phone Number
              </Label>

              <Input
                type="text"
                name="phoneNumber"
                value={
                  formData.phoneNumber
                }
                onChange={handleChange}
                required
                className="inputField"
              />
            </div>
          </div>

          {/* Address */}
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-3
              rounded-2xl
              border
              border-[#613b19]/15
              bg-[#61b9b9]/[0.03]
              p-3
              md:p-4
            "
          >
            <div>
              <Label className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Address Line 1
              </Label>

              <Input
                type="text"
                name="addressLine1"
                value={
                  formData.addressLine1
                }
                onChange={handleChange}
                required
                className="inputField"
              />
            </div>

            <div>
              <Label className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Address Line 2
              </Label>

              <Input
                type="text"
                name="addressLine2"
                value={
                  formData.addressLine2
                }
                onChange={handleChange}
                className="inputField"
              />
            </div>
          </div>

          {/* Landmark + Type */}
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-3
              rounded-2xl
              border
              border-[#613b19]/15
              bg-[#61b9b9]/[0.03]
              p-3
              md:p-4
            "
          >
            <div>
              <Label className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Landmark
              </Label>

              <Input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                className="inputField"
              />
            </div>

            <div>
              <Label className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Address Type
              </Label>

              <Input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="inputField"
              />
            </div>
          </div>

          {/* Location */}
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-4
              gap-3
              rounded-2xl
              border
              border-[#613b19]/15
              bg-[#61b9b9]/[0.03]
              p-3
              md:p-4
            "
          >
            {/* Postal Code */}
            <div className="relative">
              <Label className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Postal Code
              </Label>

              <div
                className={`justify-center items-center flex relative ${
                  postalCodeError
                    ? "border border-red-500 rounded-lg"
                    : ""
                }`}
              >
                <Input
                  type="text"
                  name="postalCode"
                  value={
                    formData.postalCode
                  }
                  onChange={handleChange}
                  required
                  className="inputField"
                />

                {postalCodeError && (
                  <p className="text-red-500 text-sm mt-1 absolute right-2 flex items-center gap-1">
                    <Info size={18} />
                  </p>
                )}
              </div>
            </div>

            {/* City */}
            <div>
              <Label className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                City
              </Label>

              <Select
                name="city"
                value={formData.city}
                onValueChange={(value) =>
                  handleChange({
                    target: {
                      name: "city",
                      value,
                    },
                  })
                }
                disabled={
                  cityOptions.length ===
                  0
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>

                <SelectContent>
                  {cityOptions.map(
                    (city, idx) => (
                      <SelectItem
                        key={idx}
                        value={city}
                      >
                        {city}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* State */}
            <div>
              <Label className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                State
              </Label>

              <Select
                name="state"
                value={
                  formData.state.code
                }
                onValueChange={(value) =>
                  handleChange({
                    target: {
                      name: "state",
                      value,
                    },
                  })
                }
                disabled
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>

                <SelectContent>
                  {Object.entries(
                    StateCode
                  ).map(
                    ([code, name]) => (
                      <SelectItem
                        key={code}
                        value={code}
                      >
                        {name}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Country */}
            <div>
              <Label className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Country
              </Label>

              <Input
                type="text"
                name="country"
                value={
                  formData.country
                }
                onChange={handleChange}
                required
                className="inputField"
                disabled
              />
            </div>
          </div>

          {/* Default Address */}
          <div
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              border
              border-[#613b19]/15
              bg-[#61b9b9]/[0.03]
              p-3
              md:p-4
            "
          >
            <Input
              type="checkbox"
              name="isDefault"
              id="isDefault"
              checked={
                formData.isDefault
              }
              onChange={handleChange}
              className="
                h-4
                w-4
                cursor-pointer
                border-gray-300
                rounded
                focus:ring-[#61b9b9]
                accent-[#3d6d6d]
              "
            />

            <Label
              className="
                mb-2
                block
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-gray-500
                cursor-pointer
              "
              htmlFor="isDefault"
            >
              Set as default
            </Label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end">
            <div className="flex gap-2 mt-4">
              <Button
                type="submit"
                className="bg-[#3d6d6d] cursor-pointer hover:bg-[#61b9b9]"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? (
                  <span className="flex justify-center items-center gap-1">
                    <Loader2 className="animate-spin" />
                    Adding
                  </span>
                ) : (
                  <span className="flex justify-center items-center gap-1">
                    Add Address
                  </span>
                )}
              </Button>

              <Button
                type="button"
                onClick={() =>
                  setActiveAdd(false)
                }
                className="cancelBtn"
              >
                Close
              </Button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AddAddress;