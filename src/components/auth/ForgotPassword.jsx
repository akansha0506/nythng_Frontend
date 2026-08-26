// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import {
//   forgotPassword,
//   resetPassword,
// } from "@/redux/slices/authSlice";

// import { Loader2 } from "lucide-react";

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";

// export default function ForgotPassword({
//   step,
//   setStep,
//   handleConfirmClose,
// }) {
//   const [email, setEmail] = useState("");

//   return (
//     <>
//       {step === 1 ? (
//         <StepOne
//           setStep={setStep}
//           email={email}
//           setEmail={setEmail}
//         />
//       ) : (
//         <StepTwo
//           email={email}
//           handleConfirmClose={handleConfirmClose}
//         />
//       )}
//     </>
//   );
// }

// // step 1- reset passwrd

// const StepOne = ({
//   setStep,
//   email,
//   setEmail,
// }) => {
//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();

//   const handleForgot = async () => {
//     if (!email || email.length < 5) {
//       toast.warn("Please enter a valid email address");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await dispatch(
//         forgotPassword(email)
//       ).unwrap();

//       if (res?.success) {
//         toast.success(
//           res.message || "OTP sent successfully"
//         );

//         setStep(2);
//       }
//     } catch (error) {
//       toast.error(
//         error?.message ||
//           error ||
//           "Something went wrong"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-4">

//       {/* EMAIL */}

//       <div className="flex flex-col gap-1">

//         <Label
//           htmlFor="forgot-email"
//           className="text-sm font-medium text-gray-700"
//         >
//           Email
//         </Label>

//         <Input
//           id="forgot-email"
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) =>
//             setEmail(e.target.value)
//           }
//           className="w-full"
//         />

//       </div>


//       {/* SEND OTP */}

//       <Button
//         type="button"
//         onClick={handleForgot}
//         disabled={loading}
//         className="w-full cursor-pointer bg-[var(--primary)] text-white disabled:cursor-not-allowed"
//       >

//         {loading ? (
//           <span className="flex items-center gap-2">

//             <Loader2 className="h-4 w-4 animate-spin" />

//             Sending...

//           </span>
//         ) : (
//           "Send OTP"
//         )}

//       </Button>

//     </div>
//   );
// };

// // step 2 - reset psswrd

// const StepTwo = ({
//   email,
//   handleConfirmClose,
// }) => {
//   const [showPassword, setShowPassword] =
//     useState(false);

//   const [otp, setOtp] = useState("");

//   const [password, setPassword] =
//     useState("");

//   const [confirmPassword, setConfirmPassword] =
//     useState("");

//   const [loading, setLoading] =
//     useState(false);

//   const dispatch = useDispatch();

//   // OTP input

//   const handleOtp = (value) => {
//     if (value.length > 6) {
//       return;
//     }

//     const filtered = value.replace(
//       /[^0-9]/g,
//       ""
//     );

//     setOtp(filtered);
//   };

//   // reset password

//   const handleSubmit = async () => {

//     if (
//       !otp ||
//       !password ||
//       !confirmPassword
//     ) {
//       toast.warn("Please fill in all fields");
//       return;
//     }


//     if (otp.length < 6) {
//       toast.warn("OTP must be at least 6 digits");
//       return;
//     }


//     if (password.length < 8) {
//       toast.warn(
//         "Password must be at least 8 characters"
//       );

//       return;
//     }


//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }


//     setLoading(true);


//     try {

//       const formdata = new FormData();

//       formdata.append("email", email);
//       formdata.append("otp", otp);
//       formdata.append(
//         "newPassword",
//         password
//       );


//       const res = await dispatch(
//         resetPassword(formdata)
//       ).unwrap();


//       if (res?.success) {

//         toast.success(
//           res.message ||
//             "Password reset successfully"
//         );

//         handleConfirmClose();
//       }

//     } catch (error) {

//       toast.error(
//         error?.message ||
//           error ||
//           "Something went wrong"
//       );

//     } finally {

//       setLoading(false);

//     }
//   };


//   return (
//     <div className="flex flex-col gap-4">
//       {/* OTP */}

//       <div className="flex flex-col gap-1">

//         <Label
//           htmlFor="otp"
//           className="text-sm font-medium text-gray-700"
//         >
//           OTP
//         </Label>

//         <Input
//           id="otp"
//           type="text"
//           inputMode="numeric"
//           maxLength={6}
//           placeholder="Enter OTP"
//           value={otp}
//           onChange={(e) =>
//             handleOtp(e.target.value)
//           }
//           className="w-full"
//         />

//       </div>

//       {/* New psswrd */}

//       <div className="flex flex-col gap-1">

//         <Label
//           htmlFor="new-password"
//           className="text-sm font-medium text-gray-700"
//         >
//           New Password
//         </Label>

//         <Input
//           id="new-password"
//           type={
//             showPassword
//               ? "text"
//               : "password"
//           }
//           placeholder="Enter new password"
//           value={password}
//           onChange={(e) =>
//             setPassword(e.target.value)
//           }
//           className="w-full"
//         />

//       </div>

//       {/* confirm pssword */}

//       <div className="flex flex-col gap-1">

//         <Label
//           htmlFor="confirm-password"
//           className="text-sm font-medium text-gray-700"
//         >
//           Confirm Password
//         </Label>

//         <Input
//           id="confirm-password"
//           type={
//             showPassword
//               ? "text"
//               : "password"
//           }
//           placeholder="Confirm new password"
//           value={confirmPassword}
//           onChange={(e) =>
//             setConfirmPassword(e.target.value)
//           }
//           className="w-full"
//         />

//       </div>

//           {/* show / hide password */}

//       <div className="flex items-center justify-end">

//         {showPassword ? (

//           <button
//             type="button"
//             onClick={() =>
//               setShowPassword(false)
//             }
//             className="cursor-pointer text-sm text-blue-600 hover:underline"
//           >
//             Hide Password
//           </button>

//         ) : (

//           <button
//             type="button"
//             onClick={() =>
//               setShowPassword(true)
//             }
//             className="cursor-pointer text-sm text-blue-600 hover:underline"
//           >
//             Show Password
//           </button>

//         )}

//       </div>
        
//       {/* reset password */}

//       <Button
//         type="button"
//         onClick={handleSubmit}
//         disabled={loading}
//         className="w-full cursor-pointer bg-[var(--primary)] text-white disabled:cursor-not-allowed"
//       >

//         {loading ? (

//           <span className="flex items-center gap-2">

//             <Loader2 className="h-4 w-4 animate-spin" />

//             Resetting...

//           </span>

//         ) : (

//           "Reset Password"

//         )}

//       </Button>

//     </div>
//   );
// };

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  forgotPassword,
  resetPassword,
} from "@/redux/slices/authSlice";

import {
  Loader2,
  Mail,
  ShieldCheck,
  LockKeyhole,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function ForgotPassword({
  step,
  setStep,
  handleConfirmClose,
}) {
  const [email, setEmail] = useState("");

  return (
    <div className="w-full overflow-hidden rounded-[24px] bg-white">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <div className="px-6 pt-6 pr-14 md:px-7 md:pt-7 md:pr-14">

        <div className="mb-5">

          <span
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[3px]
              text-[#61b9b9]
            "
          >
            Account Recovery
          </span>

          <h2
            className="
              mt-1.5
              text-[26px]
              font-light
              leading-tight
              tracking-tight
              text-[#183838]
            "
          >
            {step === 1
              ? "Forgot your password?"
              : "Create a new password"}
          </h2>

          <p
            className="
              mt-1.5
              max-w-[420px]
              text-sm
              leading-5
              text-[#607474]
            "
          >
            {step === 1
              ? "Enter your registered email address and we'll send you a secure verification code."
              : "Enter the OTP sent to your email and create a secure new password."}
          </p>

        </div>

        {/* =====================================================
            STEP PROGRESS
        ===================================================== */}

        <div className="mb-6">

          <div className="flex items-center">

            {/* STEP 1 */}

            <div className="flex items-center gap-2">

              <div
                className={`
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-xs
                  font-semibold
                  transition-all
                  duration-300

                  ${
                    step >= 1
                      ? "bg-[#61b9b9] text-white shadow-[0_5px_15px_rgba(97,185,185,0.25)]"
                      : "bg-[#EDF4F4] text-[#789292]"
                  }
                `}
              >
                {step > 1 ? (
                  <Check size={14} strokeWidth={2.5} />
                ) : (
                  "1"
                )}
              </div>

              <div>
                <p
                  className={`
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[1.5px]
                    ${
                      step >= 1
                        ? "text-[#355454]"
                        : "text-[#8A9B9B]"
                    }
                  `}
                >
                  Step 1
                </p>

                <p className="text-[10px] text-[#8A9B9B]">
                  Verify Email
                </p>
              </div>

            </div>

            {/* PROGRESS LINE */}

            <div className="mx-3 h-px flex-1 bg-[#E3EEEE]">

              <div
                className="
                  h-full
                  bg-[#61b9b9]
                  transition-all
                  duration-500
                "
                style={{
                  width: step === 2 ? "100%" : "0%",
                }}
              />

            </div>

            {/* STEP 2 */}

            <div className="flex items-center gap-2">

              <div
                className={`
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-xs
                  font-semibold
                  transition-all
                  duration-300

                  ${
                    step === 2
                      ? "bg-[#61b9b9] text-white shadow-[0_5px_15px_rgba(97,185,185,0.25)]"
                      : "bg-[#EDF4F4] text-[#789292]"
                  }
                `}
              >
                2
              </div>

              <div>
                <p
                  className={`
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[1.5px]
                    ${
                      step === 2
                        ? "text-[#355454]"
                        : "text-[#8A9B9B]"
                    }
                  `}
                >
                  Step 2
                </p>

                <p className="text-[10px] text-[#8A9B9B]">
                  Reset Password
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          STEP CONTENT
      ===================================================== */}

      {step === 1 ? (
        <StepOne
          setStep={setStep}
          email={email}
          setEmail={setEmail}
        />
      ) : (
        <StepTwo
          email={email}
          handleConfirmClose={handleConfirmClose}
        />
      )}

    </div>
  );
}


/* =========================================================
   STEP ONE
========================================================= */

const StepOne = ({
  setStep,
  email,
  setEmail,
}) => {

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleForgot = async () => {

    if (!email || email.length < 5) {
      toast.warn("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {

      const res = await dispatch(
        forgotPassword(email)
      ).unwrap();

      if (res?.success) {

        toast.success(
          res.message || "OTP sent successfully"
        );

        setStep(2);
      }

    } catch (error) {

      toast.error(
        error?.message ||
          error ||
          "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="px-6 pb-6 md:px-7 md:pb-7">

      {/* FORM CARD */}

      <div
        className="
          rounded-[20px]
          border
          border-[#E5EEEE]
          bg-[#FBFDFD]
          p-4
          shadow-[0_8px_30px_rgba(53,84,84,0.05)]
        "
      >

        <div className="flex flex-col gap-3.5">

          {/* EMAIL */}

          <div className="flex flex-col gap-1.5">

            <Label
              htmlFor="forgot-email"
              className="
                text-xs
                font-medium
                text-[#355454]
              "
            >
              Email Address
            </Label>

            <div className="relative">

              <Mail
                size={16}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-[#8A9B9B]
                "
              />

              <Input
                id="forgot-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                  h-10
                  w-full
                  rounded-xl
                  border-[#DCEAEA]
                  bg-white
                  pl-9
                  text-sm
                  text-[#183838]
                  shadow-none
                  placeholder:text-[#8A9B9B]
                  focus-visible:border-[#61b9b9]
                  focus-visible:ring-4
                  focus-visible:ring-[#61b9b9]/10
                "
              />

            </div>

          </div>

          {/* BUTTON */}

          <Button
            type="button"
            onClick={handleForgot}
            disabled={loading}
            className="
              h-10
              w-full
              cursor-pointer
              rounded-xl
              bg-gradient-to-r
              from-[#61b9b9]
              via-[#6eb7c1]
              to-[#69b4c2]
              text-sm
              font-semibold
              text-white
              shadow-[0_10px_25px_rgba(97,185,185,0.22)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_15px_30px_rgba(97,185,185,0.3)]
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >

            {loading ? (

              <span className="flex items-center gap-2">

                <Loader2
                  size={16}
                  className="animate-spin"
                />

                Sending...

              </span>

            ) : (

              "Send OTP"

            )}

          </Button>

          <p className="text-center text-[10px] text-[#8A9B9B]">
            We'll send a secure verification code to
            your email.
          </p>

        </div>

      </div>

    </div>

  );
};


/* =========================================================
   STEP TWO
========================================================= */

const StepTwo = ({
  email,
  handleConfirmClose,
}) => {

  const [showPassword, setShowPassword] =
    useState(false);

  const [otp, setOtp] = useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const dispatch = useDispatch();


  /* ================= OTP ================= */

  const handleOtp = (value) => {

    const filtered = value
      .replace(/[^0-9]/g, "")
      .slice(0, 6);

    setOtp(filtered);

  };


  /* ================= RESET ================= */

  const handleSubmit = async () => {

    if (
      !otp ||
      !password ||
      !confirmPassword
    ) {

      toast.warn("Please fill in all fields");

      return;

    }

    if (otp.length < 6) {

      toast.warn(
        "OTP must be at least 6 digits"
      );

      return;

    }

    if (password.length < 8) {

      toast.warn(
        "Password must be at least 8 characters"
      );

      return;

    }

    if (password !== confirmPassword) {

      toast.error(
        "Passwords do not match"
      );

      return;

    }

    setLoading(true);

    try {

      const formdata = new FormData();

      formdata.append("email", email);
      formdata.append("otp", otp);
      formdata.append(
        "newPassword",
        password
      );

      const res = await dispatch(
        resetPassword(formdata)
      ).unwrap();

      if (res?.success) {

        toast.success(
          res.message ||
            "Password reset successfully"
        );

        handleConfirmClose();

      }

    } catch (error) {

      toast.error(
        error?.message ||
          error ||
          "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="px-6 pb-6 md:px-7 md:pb-7">

      {/* FORM CARD */}

      <div
        className="
          rounded-[20px]
          border
          border-[#E5EEEE]
          bg-[#FBFDFD]
          p-4
          shadow-[0_8px_30px_rgba(53,84,84,0.05)]
        "
      >

        <div className="flex flex-col gap-3">

          {/* OTP */}

          <div className="flex flex-col gap-1.5">

            <Label
              htmlFor="otp"
              className="
                text-xs
                font-medium
                text-[#355454]
              "
            >
              Verification OTP
            </Label>

            <div className="relative">

              <ShieldCheck
                size={16}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-[#8A9B9B]
                "
              />

              <Input
                id="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) =>
                  handleOtp(e.target.value)
                }
                className="
                  h-10
                  w-full
                  rounded-xl
                  border-[#DCEAEA]
                  bg-white
                  pl-9
                  text-sm
                  tracking-[3px]
                  text-[#183838]
                  shadow-none
                  placeholder:tracking-normal
                  placeholder:text-[#8A9B9B]
                  focus-visible:border-[#61b9b9]
                  focus-visible:ring-4
                  focus-visible:ring-[#61b9b9]/10
                "
              />

            </div>

          </div>


          {/* NEW PASSWORD */}

          <div className="flex flex-col gap-1.5">

            <Label
              htmlFor="new-password"
              className="
                text-xs
                font-medium
                text-[#355454]
              "
            >
              New Password
            </Label>

            <div className="relative">

              <LockKeyhole
                size={16}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-[#8A9B9B]
                "
              />

              <Input
                id="new-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter new password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="
                  h-10
                  w-full
                  rounded-xl
                  border-[#DCEAEA]
                  bg-white
                  pl-9
                  pr-10
                  text-sm
                  text-[#183838]
                  shadow-none
                  placeholder:text-[#8A9B9B]
                  focus-visible:border-[#61b9b9]
                  focus-visible:ring-4
                  focus-visible:ring-[#61b9b9]/10
                "
              />

            </div>

          </div>


          {/* CONFIRM PASSWORD */}

          <div className="flex flex-col gap-1.5">

            <Label
              htmlFor="confirm-password"
              className="
                text-xs
                font-medium
                text-[#355454]
              "
            >
              Confirm Password
            </Label>

            <div className="relative">

              <LockKeyhole
                size={16}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-[#8A9B9B]
                "
              />

              <Input
                id="confirm-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                className="
                  h-10
                  w-full
                  rounded-xl
                  border-[#DCEAEA]
                  bg-white
                  pl-9
                  pr-10
                  text-sm
                  text-[#183838]
                  shadow-none
                  placeholder:text-[#8A9B9B]
                  focus-visible:border-[#61b9b9]
                  focus-visible:ring-4
                  focus-visible:ring-[#61b9b9]/10
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  cursor-pointer
                  text-[#8A9B9B]
                  transition-colors
                  hover:text-[#61b9b9]
                "
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >

                {showPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}

              </button>

            </div>

          </div>


          {/* PASSWORD INFO */}

          <div
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-[#E5EEEE]
              bg-white
              px-3
              py-2
            "
          >

            <LockKeyhole
              size={13}
              className="shrink-0 text-[#61b9b9]"
            />

            <span className="text-[10px] text-[#789292]">
              Password must contain at least 8
              characters.
            </span>

          </div>


          {/* RESET BUTTON */}

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="
              mt-0.5
              h-10
              w-full
              cursor-pointer
              rounded-xl
              bg-gradient-to-r
              from-[#61b9b9]
              via-[#6eb7c1]
              to-[#69b4c2]
              text-sm
              font-semibold
              text-white
              shadow-[0_10px_25px_rgba(97,185,185,0.22)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_15px_30px_rgba(97,185,185,0.3)]
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >

            {loading ? (

              <span className="flex items-center gap-2">

                <Loader2
                  size={16}
                  className="animate-spin"
                />

                Resetting...

              </span>

            ) : (

              "Reset Password"

            )}

          </Button>

        </div>

      </div>

    </div>

  );
};