"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import {
  updateMe,
  updatePassword,
} from "@/redux/slices/authSlice";

const Profile = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [newPassword, setNewPassword] = useState("");

  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || "",
    phoneNumber: user?.phoneNumber || "",
    email: user?.email || "",
  });

  const [IsUpdatingInfo, setIsUpdatingInfo] = useState(false);
  const [IsUpdatingPassword, setIsUpdatingPassword] =
    useState(false);

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword) {
      toast.warn("Please add both current and new password");
      return;
    }

    if (currentPassword === newPassword) {
      toast.warn(
        "New password must be different from current password"
      );
      return;
    }

    setIsUpdatingPassword(true);

    try {
      const formData = new FormData();

      formData.append("currentPassword", currentPassword);
      formData.append("newPassword", newPassword);

      const res = await dispatch(
        updatePassword(formData)
      ).unwrap();

      if (res && res.success) {
        toast.success(res.message);

        setCurrentPassword("");
        setNewPassword("");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error || "Failed to update password. Try again."
      );
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleProfileUpdate = async () => {
    if (!profileData.fullName || !profileData.phoneNumber) {
      toast.warn(
        "Please add both full name and phone number to update."
      );
      return;
    }

    setIsUpdatingInfo(true);

    try {
      const res = await dispatch(
        updateMe(profileData)
      ).unwrap();

      if (res && res.success) {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);

      toast.error(
        error || "Failed to update profile. Please try again."
      );
    } finally {
      setIsUpdatingInfo(false);
    }
  };

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.fullName || "",
        phoneNumber: user.phoneNumber || "",
        email: user.email || "",
      });
    }
  }, [user]);

  return (
    <div className="p-0">
      <h2 className="text-4xl font-light border-b pb-2 primaryText">
        Account
      </h2>

      <div className="p-6 border-[#E5E5E566] border-2 rounded-md bg-[#E5E5E566] mt-5">
        {/* User Data */}
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium primaryText">
              Full Name
            </label>

            <input
              type="text"
              className="bg-gray-50 border bodyText text-sm rounded-lg block w-full p-2.5"
              value={profileData.fullName}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium primaryText">
              Email Address
            </label>

            <input
              type="email"
              readOnly
              disabled={true}
              value={profileData?.email}
              className="bg-gray-50 border bodyText text-sm rounded-lg block w-full p-2.5 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium primaryText">
              Phone Number
            </label>

            <input
              type="tel"
              value={profileData?.phoneNumber}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
              className="bg-gray-50 border bodyText text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="flex justify-start items-end">
            <button
              onClick={handleProfileUpdate}
              disabled={IsUpdatingInfo}
              className="hover:bg-[#61b9b9] bg-[#3d6d6d] hover:scale-105 disabled:hover:scale-100 disabled:shadow-none disabled:shadow-none hover:shadow-md text-gray-50 py-2 px-4 rounded-full inline-flex items-center transition-all duration-300 ease-in-out cursor-pointer disabled:cursor-not-allowed"
            >
              {IsUpdatingInfo ? (
                <span className="flex gap-1 items-center justify-center">
                  <Loader2 className="animate-spin" />
                  {"Updating"}
                </span>
              ) : (
                <span className="text-center">
                  Update profile
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Password Change */}
        <div className="mt-6 border-t pt-6">
          <h3 className="text-lg font-medium mb-4 primaryText">
            Change Password
          </h3>

          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium primaryText">
                Current Password
              </label>

              <div className="flex justify-center items-center relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={currentPassword}
                  required
                  onChange={(e) =>
                    setCurrentPassword(e.target.value)
                  }
                  className="bg-gray-50 border bodyText text-sm rounded-lg block w-full p-2.5"
                />

                <span className="absolute right-2">
                  <ShowPasswordCompo
                    setShowPassword={setShowPassword}
                    showPassword={showPassword}
                  />
                </span>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium primaryText">
                New Password
              </label>

              <div className="flex justify-center items-center relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  required
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  className="bg-gray-50 border bodyText text-sm rounded-lg block w-full p-2.5"
                />

                <span className="absolute right-2">
                  <ShowPasswordCompo
                    setShowPassword={setShowPassword}
                    showPassword={showPassword}
                  />
                </span>
              </div>
            </div>

            <div className="flex justify-start">
              <button
                onClick={handleUpdatePassword}
                disabled={IsUpdatingPassword}
                className="hover:bg-[#61b9b9] bg-[#3d6d6d] hover:scale-105 disabled:hover:scale-100 disabled:shadow-none hover:shadow-md text-gray-50 py-2 px-4 rounded-full inline-flex items-center transition-all duration-300 ease-in-out cursor-pointer disabled:cursor-not-allowed"
              >
                {IsUpdatingPassword ? (
                  <span className="flex gap-1 items-center justify-center">
                    <Loader2 className="animate-spin" />
                    Updating
                  </span>
                ) : (
                  <span className="text-center">
                    Update Password
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

const ShowPasswordCompo = ({
  showPassword,
  setShowPassword,
}) => {
  return (
    <>
      {showPassword ? (
        <EyeOff
          size={18}
          onClick={() => setShowPassword(false)}
          className="cursor-pointer primaryText"
        />
      ) : (
        <Eye
          size={18}
          onClick={() => setShowPassword(true)}
          className="cursor-pointer primaryText"
        />
      )}
    </>
  );
};