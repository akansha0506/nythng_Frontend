// "use client";

// import { useState } from "react";

// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";

// import {
//   AlertDialog,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";

// import ForgotPassword from "@/components/auth/ForgotPassword";

// export default function ForgotPasswordDialog() {
//   const [open, setOpen] = useState(false);
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [step, setStep] = useState(1);

//   const handleOpenChange = (value) => {
//     // If user is on step 2 and tries to close
//     // show confirmation dialog
//     if (!value && step === 2) {
//       setConfirmOpen(true);
//       return;
//     }

//     setOpen(value);
//   };

//   const handleConfirmClose = () => {
//     // Reset forgot password flow
//     setStep(1);

//     // Close main dialog
//     setOpen(false);

//     // Close confirmation dialog
//     setConfirmOpen(false);
//   };

//   return (
//     <>

//       <Dialog
//         open={open}
//         onOpenChange={handleOpenChange}
//       >
//         <DialogTrigger
//           className="cursor-pointer text-blue-600 hover:underline"
//         >
//           Forgot Password?
//         </DialogTrigger>

//         <DialogContent>
//           <DialogTitle>
//             Reset your password
//           </DialogTitle>

//           <DialogDescription>
//             {step === 1
//               ? "Please enter your email address to receive a password reset link."
//               : "Please complete your password reset."}
//           </DialogDescription>

//           <ForgotPassword
//             step={step}
//             setStep={setStep}
//             onClose={handleOpenChange}
//             handleConfirmClose={handleConfirmClose}
//           />
//         </DialogContent>
//       </Dialog>
              
//       {/* Confirmation dialog */}

//       <AlertDialog
//         open={confirmOpen}
//         onOpenChange={setConfirmOpen}
//       >
//         <AlertDialogContent>

//           <AlertDialogHeader>

//             <AlertDialogTitle>
//               Are you sure you want to close?
//             </AlertDialogTitle>

//             <AlertDialogDescription>
//               Your progress will be lost if you exit
//               this step.
//             </AlertDialogDescription>

//           </AlertDialogHeader>


//           <AlertDialogFooter>

//             <AlertDialogCancel>
//               Cancel
//             </AlertDialogCancel>

//             <AlertDialogAction
//               onClick={handleConfirmClose}
//             >
//               Yes, Close
//             </AlertDialogAction>

//           </AlertDialogFooter>

//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   );
// }

"use client";

import { useState } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import ForgotPassword from "@/components/auth/ForgotPassword";

export default function ForgotPasswordDialog() {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [step, setStep] = useState(1);

  const handleOpenChange = (value) => {
    // Step 2 par close karne ki koshish
    if (!value && step === 2) {
      setConfirmOpen(true);
      return;
    }

    setOpen(value);

    if (!value) {
      setStep(1);
    }
  };

  const handleConfirmClose = () => {
    setStep(1);
    setOpen(false);
    setConfirmOpen(false);
  };

  return (
    <>
      {/* =====================================================
          FORGOT PASSWORD DIALOG
      ===================================================== */}

      <Dialog
        open={open}
        onOpenChange={handleOpenChange}
      >
        <DialogTrigger
          className="
            cursor-pointer
            text-blue-600
            transition-colors
            hover:underline
          "
        >
          Forgot Password?
        </DialogTrigger>

        <DialogContent
          className="
            w-[calc(100%-32px)]
            max-w-[520px]

            rounded-[24px]
            border
            border-[#E5EEEE]

            bg-white
            p-0

            opacity-100

            shadow-[0_25px_80px_rgba(24,56,56,0.18)]

            [&>button]:right-5
            [&>button]:top-5
            [&>button]:z-20
            [&>button]:rounded-full
            [&>button]:border
            [&>button]:border-[#E5EEEE]
            [&>button]:bg-[#F8FBFB]
            [&>button]:text-[#607474]
            [&>button]:opacity-100
            [&>button]:transition-all
            [&>button]:duration-300
            [&>button]:hover:bg-[#EAF7F7]
            [&>button]:hover:text-[#61b9b9]
          "
        >
          <ForgotPassword
            step={step}
            setStep={setStep}
            handleConfirmClose={handleConfirmClose}
          />
        </DialogContent>
      </Dialog>

      {/* =====================================================
          CONFIRMATION DIALOG
      ===================================================== */}

      <AlertDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
      >
        <AlertDialogContent
          className="
            w-[calc(100%-32px)]
            max-w-[420px]

            rounded-[24px]
            border
            border-[#E5EEEE]

            bg-white
            p-6

            shadow-[0_25px_80px_rgba(24,56,56,0.18)]
          "
        >
          <AlertDialogHeader className="space-y-2">
            <AlertDialogTitle
              className="
                text-xl
                font-semibold
                text-[#183838]
              "
            >
              Are you sure you want to close?
            </AlertDialogTitle>

            <AlertDialogDescription
              className="
                text-sm
                leading-6
                text-[#789292]
              "
            >
              Your progress will be lost if you exit
              this step.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-5 gap-2">
            <AlertDialogCancel
              className="
                cursor-pointer
                rounded-xl
                border-[#DCEAEA]
                bg-white
                text-[#355454]
                hover:bg-[#F8FBFB]
              "
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleConfirmClose}
              className="
                cursor-pointer
                rounded-xl
                bg-[#61b9b9]
                text-white
                hover:bg-[#55aaaa]
              "
            >
              Yes, Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}