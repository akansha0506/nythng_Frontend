"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import StateCode from "@/utils/stateCode.json";

import {
  editAddress,
  resetAddressState,
} from "@/redux/slices/addressSlice";

import ScrollLock from "@/utils/ScrollLock";

import { Loader2, X } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

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

const EditAddressNew = ({
  selectedData,
  setSelectedData,
  setIsEdit,
}) => {
  const dispatch = useDispatch();

  const { message } = useSelector((state) => state.address);

  const [loading, setLoading] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);

  const [formData, setFormData] = useState(selectedData || {});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "isDefault") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (name === "state") {
      const selectedIndex = e.target.selectedIndex;
      const selectedName =
        e.target.options[selectedIndex]?.text || "";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (
      !formData.fullName ||
      !formData.phoneNumber ||
      !formData.addressLine1 ||
      !formData.postalCode ||
      !formData.city ||
      !formData.state?.code ||
      !formData.country ||
      !formData.type
    ) {
      toast.error("Please fill all required fields");
      setLoading(false);
      return;
    }

    if (String(formData?.phoneNumber).length !== 10) {
      toast.warn("Please enter a valid 10-digit phone number.");
      setLoading(false);
      return;
    }

    try {
      await dispatch(editAddress({ formData })).unwrap();

      toast.success(message);

      setIsEdit(false);
    } catch (error) {
      console.error("Failed to edit address:", error);
      toast.error(error || "Failed to edit address");
    } finally {
      setLoading(false);
    }

    dispatch(resetAddressState());
  };

  useEffect(() => {
    const fetchLocationDetails = async () => {
      if (!formData.postalCode || formData.postalCode.length === 0) {
        setCityOptions([]);
        return;
      }

      if (formData.postalCode) {
        try {
          const response = await fetch(
            `https://api.postalpincode.in/pincode/${formData.postalCode}`
          );

          const data = await response.json();

          if (
            data[0].Status === "Success" &&
            data[0].PostOffice
          ) {
            const cities = data[0].PostOffice.map(
              (po) => po.Name
            );

            const selectedCity =
              cities.find(
                (city) =>
                  city.toLowerCase() ===
                  String(formData.city || "").toLowerCase()
              ) || cities[0];

            const stateName = data[0].PostOffice[0].State;
            const country = data[0].PostOffice[0].Country;

            const stateCodeEntry = Object.entries(StateCode).find(
              ([code, name]) =>
                name.toLowerCase() ===
                stateName.toLowerCase()
            );

            setCityOptions(cities);

            setFormData((prev) => ({
              ...prev,
              city: selectedCity || "",
              state: {
                name: stateName,
                code: stateCodeEntry
                  ? stateCodeEntry[0]
                  : "",
              },
              country: country,
            }));
          } else {
            setCityOptions([]);
          }
        } catch (error) {
          console.error(
            "Failed to fetch postal info:",
            error
          );
        }
      }
    };

    fetchLocationDetails();
  }, [formData.city, formData.postalCode]);

  return (
    <>
      <ScrollLock />

      <div className="p-6 bg-white border rounded md:mt-20 relative overflow-y-auto max-md:max-h-[70vh]">
        <X
          size={24}
          className="absolute top-4 right-4 text-red-500 cursor-pointer"
          onClick={() => setIsEdit(false)}
        />

        <h2 className="text-xl font-semibold mb-4">
          Edit Address
        </h2>

        <div className="space-y-4">
          {/* Full Name + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block mb-1 text-sm font-medium text-gray-700">
                Full Name
              </Label>

              <Input
                type="text"
                name="fullName"
                value={formData.fullName || ""}
                onChange={handleChange}
                required
                className="inputField"
              />
            </div>

            <div>
              <Label className="block mb-1 text-sm font-medium text-gray-700">
                Phone Number
              </Label>

              <Input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={handleChange}
                required
                className="inputField"
              />
            </div>
          </div>

          {/* Address Lines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block mb-1 text-sm font-medium text-gray-700">
                Address Line 1
              </Label>

              <Input
                type="text"
                name="addressLine1"
                value={formData.addressLine1 || ""}
                onChange={handleChange}
                required
                className="inputField"
              />
            </div>

            <div>
              <Label className="block mb-1 text-sm font-medium text-gray-700">
                Address Line 2
              </Label>

              <Input
                type="text"
                name="addressLine2"
                value={formData.addressLine2 || ""}
                onChange={handleChange}
                className="inputField"
              />
            </div>
          </div>

          {/* Landmark + Address Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block mb-1 text-sm font-medium text-gray-700">
                Landmark
              </Label>

              <Input
                type="text"
                name="landmark"
                value={formData.landmark || ""}
                onChange={handleChange}
                className="inputField"
              />
            </div>

            <div>
              <Label className="block mb-1 text-sm font-medium text-gray-700">
                <span>Address Type</span>

                <span className="text-xs text-gray-500">
                  {" (e.g., Home, Work) "}
                </span>
              </Label>

              <Input
                type="text"
                name="type"
                value={formData.type || ""}
                onChange={handleChange}
                required
                className="inputField"
              />
            </div>
          </div>

          {/* Postal / City / State / Country */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label className="block mb-1 text-sm font-medium text-gray-700">
                Postal Code
              </Label>

              <Input
                type="text"
                name="postalCode"
                value={formData.postalCode || ""}
                onChange={handleChange}
                required
                className="inputField"
              />
            </div>

            <div>
              <Label className="block mb-1 text-sm font-medium text-gray-700">
                City
              </Label>

              <Select
                name="city"
                value={formData.city || ""}
                onValueChange={(value) =>
                  handleChange({
                    target: {
                      name: "city",
                      value,
                    },
                  })
                }
                disabled={cityOptions.length === 0}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>

                <SelectContent>
                  {cityOptions.map((city, idx) => (
                    <SelectItem key={idx} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="block mb-1 text-sm font-medium text-gray-700">
                State
              </Label>

              <Select
                name="state"
                value={formData.state?.code || ""}
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
                  {Object.entries(StateCode).map(
                    ([code, name]) => (
                      <SelectItem key={code} value={code}>
                        {name}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="block mb-1 text-sm font-medium text-gray-700">
                Country
              </Label>

              <Input
                type="text"
                name="country"
                value={formData.country || ""}
                onChange={handleChange}
                required
                className="inputField"
                disabled
              />
            </div>
          </div>

          {/* Default Address */}
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              name="isDefault"
              id="isDefault"
              checked={formData.isDefault || false}
              onChange={handleChange}
              className="h-4 w-4 cursor-pointer border-gray-300 rounded focus:ring-[#472515e1] accent-[#472515c7]"
            />

            <Label
              className="text-sm text-gray-700 cursor-pointer"
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
                className="secondaryBtn"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? (
                  <span className="flex justify-center items-center gap-1">
                    <Loader2 className="animate-spin" />
                    Editing
                  </span>
                ) : (
                  <span className="flex justify-center items-center gap-1">
                    Edit Address
                  </span>
                )}
              </Button>

              <Button
                type="button"
                onClick={() => {
                  setSelectedData({});
                  setIsEdit(false);
                }}
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

export default EditAddressNew;