// "use client";

// import React, { useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// import {
//   SKIN_TYPES,
//   CONCERNS,
//   SUB_CONCERNS,
//   LIFESTYLE,
//   ROUTINE_LEVELS,
//   GOALS,
//   CATALOG,
// } from "@/utils/SkinInsightData";

// import api from "@/utils/api";

// import Step1 from "@/sections/skin-insights/steps/Step1";
// import Step2 from "@/sections/skin-insights/steps/Step2";
// import Step3 from "@/sections/skin-insights/steps/Step3";
// import Step4 from "@/sections/skin-insights/steps/Step4";
// import Step5 from "@/sections/skin-insights/steps/Step5";
// import Step6 from "@/sections/skin-insights/steps/Step6";
// import Step7 from "@/sections/skin-insights/steps/Step7";
// import Results from "@/sections/skin-insights/steps/Results";

// import { classNames } from "./utils";

// export default function SkinInsightQuiz() {
//   const [recommendations, setRecommendations] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [step, setStep] = useState(1);

//   const [showResults, setShowResults] = useState(false);

//   const [errors, setErrors] = useState({});

//   const [answers, setAnswers] = useState({
//     skinType: "",
//     concerns: [],
//     subConcerns: [],
//     lifestyle: [],
//     routineLevel: "",
//     goal: [],
//     ageGroup: "",
//     email: "",
//     name: "",
//   });

//   // CONSTANTS
  
//   const totalSteps = 7;

//   const progress =
//     ((showResults ? totalSteps : step) / totalSteps) * 100;

  
//   // CHECK IF CURRENT STEP CAN PROCEED
 
//   const canNext = useMemo(() => {
//     switch (step) {
//       case 1:
//         return (
//           !!answers.ageGroup &&
//           !!answers.email &&
//           !!answers.name
//         );

//       case 2:
//         return !!answers.skinType;

//       case 3:
//         return answers.concerns?.length > 0;

//       case 4:
//         return answers.subConcerns?.length > 0;

//       case 5:
//         return answers.lifestyle?.length > 0;

//       case 6:
//         return !!answers.routineLevel;

//       case 7:
//         return answers.goal?.length > 0;

//       default:
//         return false;
//     }
//   }, [step, answers]);
  
//   // VALIDATE CURRENT STEP

//   const validateStep = () => {
//     const newErrors = {};

//     // STEP 1
//     if (step === 1) {
//       if (!answers.ageGroup) {
//         newErrors.ageGroup = "Please select your age";
//       }

//       if (!answers.name) {
//         newErrors.name = "Please enter your name";
//       }

//       if (!answers.email) {
//         newErrors.email = "Please enter your email";
//       } else if (
//         !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
//           answers.email
//         )
//       ) {
//         newErrors.email =
//           "Enter a valid email address";
//       }
//     }

//     // STEP 2
//     if (step === 2) {
//       if (!answers.skinType) {
//         newErrors.skinType =
//           "Please select your skin type";
//       }
//     }

//     // STEP 3
//     if (step === 3) {
//       if (!answers.concerns?.length) {
//         newErrors.concerns =
//           "Select at least one concern";
//       }
//     }

//     // STEP 4
//     if (step === 4) {
//       if (!answers.subConcerns?.length) {
//         newErrors.subConcerns =
//           "Select at least one sub concern factor";
//       }
//     }

//     // STEP 5
//     if (step === 5) {
//       if (!answers.lifestyle?.length) {
//         newErrors.lifestyle =
//           "Select at least one lifestyle factor";
//       }
//     }

//     // STEP 6
//     if (step === 6) {
//       if (!answers.routineLevel) {
//         newErrors.routineLevel =
//           "Please select your routine level";
//       }
//     }

//     // STEP 7
//     if (step === 7) {
//       if (!answers.goal?.length) {
//         newErrors.goal =
//           "Please select at least one skincare goal";
//       }
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   // NEXT
 
//   const onNext = () => {
//     const isValid = validateStep();

//     if (!isValid) {
//       return;
//     }

//     if (step < totalSteps) {
//       setStep((currentStep) => currentStep + 1);
//     } else {
//       setShowResults(true);
//     }
//   };

//   // BACK

//   const onBack = () => {
//     if (showResults) {
//       setShowResults(false);
//       setStep(totalSteps);
//       return;
//     }

//     if (step > 1) {
//       setStep((currentStep) => currentStep - 1);
//     }
//   };

//   // RESET QUIZ
  
//   const resetAll = () => {
//     setStep(1);
//     setShowResults(false);

//     setAnswers({
//       skinType: "",
//       concerns: [],
//       subConcerns: [],
//       lifestyle: [],
//       routineLevel: "",
//       goal: [],
//       ageGroup: "",
//       email: "",
//       name: "",
//     });

//     setRecommendations([]);
//     setSelectedProducts([]);
//     setErrors({});
//   };


//   const buildRecommendations = async () => {
//     // Validate step 7 first
//     const isValid = validateStep();

//     if (!isValid) {
//       return;
//     }

//     const {
//       skinType,
//       concerns,
//       subConcerns,
//       lifestyle,
//       routineLevel,
//       goal,
//       ageGroup,
//       email,
//       name,
//     } = answers;

//     try {
//       setLoading(true);
//       // Convert concern IDs into concern labels
    
//       const finalConcerns = [];

//       concerns.forEach((concern) => {
//         CONCERNS.forEach((item) => {
//           if (item.id === concern) {
//             finalConcerns.push(item.label);
//           }
//         });
//       });

//       // api payload
//       const payload = {
//         name,
//         email,
//         age: ageGroup,

//         skin_types: [
//           skinType
//             .replace(/\s+/g, "_")
//             .toLowerCase(),
//         ],

//         concerns: finalConcerns.map((concern) =>
//           concern
//             .replace(/\s+/g, "_")
//             .toLowerCase()
//         ),

//         sub_concerns: subConcerns.map(
//           (subConcern) =>
//             subConcern
//               .replace(/\s+/g, "_")
//               .toLowerCase()
//         ),

//         lifestyle: lifestyle.map(
//           (item) =>
//             item
//               .replace(/\s+/g, "_")
//               .toLowerCase()
//         ),

//         routine_levels: [
//           routineLevel
//             .replace(/\s+/g, "_")
//             .toLowerCase(),
//         ],

//         goals: (
//           Array.isArray(goal)
//             ? goal
//             : [goal]
//         ).map((item) =>
//           item
//             .replace(/\s+/g, "_")
//             .toLowerCase()
//         ),
//       };

//       console.log(
//         "Sending skin recommendation payload:",
//         payload
//       );
 
//       // API REQUEST
     
//       const response = await api.post(
//         "/recommendations/skin-form",
//         payload
//       );

//       console.log(
//         "Recommendations:",
//         response
//       );

//       // SAVE RESULTS
   
//       if (response?.data) {
//         const products =
//           response?.data?.recommendations || [];

//         setRecommendations(products);

//         setSelectedProducts(
//           products.map(
//             (product) =>
//               product.id || product._id
//           )
//         );

//         setShowResults(true);
//       }
//     } catch (error) {
//       console.error(
//         "Error getting recommendations:",
//         error
//       );

//       alert(
//         "Failed to fetch recommendations. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

 
//   // RENDER
 
//   return (
//     <div className="mx-auto mt-20 max-w-7xl px-4 py-8 md:mt-0 md:py-12">
//       <div className="mb-6 text-center md:mb-8">

//         <h1 className="text-2xl font-semibold md:text-3xl">
//           Find Your Perfect Skincare Routine
//         </h1>

//         <p className="mt-2 text-zinc-600">
//           Answer 5 quick questions to get a personalized routine.
//         </p>

//       </div>

//       {/* ====================== PROGRESS BAR ====================== */}

//       <div className="mb-6">

//         <div className="mx-auto h-2 max-w-3xl overflow-hidden rounded-full bg-zinc-200">

//           <motion.div
//             className="h-full bg-[#355454]"
//             style={{
//               width: `${progress}%`,
//             }}
//             initial={{
//               width: 0,
//             }}
//             animate={{
//               width: `${progress}%`,
//             }}
//             transition={{
//               duration: 0.35,
//             }}
//           />

//         </div>

//         <div className="mt-2 text-right text-sm text-zinc-500">

//           {showResults
//             ? "Completed"
//             : `Step ${step} of ${totalSteps}`}

//         </div>

//       </div>

//      {/* quiz content */}
//       <div className="relative mx-auto min-h-[300px]">

//         <AnimatePresence mode="wait">
//             {/* steps */}

//           {!showResults &&
//             step >= 1 &&
//             step <= totalSteps && (

//               <motion.div
//                 key={`step-${step}`}
//                 initial={{
//                   opacity: 0,
//                   x: 20,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   x: 0,
//                 }}
//                 exit={{
//                   opacity: 0,
//                   x: -20,
//                 }}
//                 transition={{
//                   duration: 0.25,
//                 }}
//                 className="mx-auto w-full max-w-3xl"
//               >

//                 {/* STEP 1 */}

//                 {step === 1 && (
//                   <Step1
//                     answers={answers}
//                     setAnswers={setAnswers}
//                     errors={errors}
//                     setErrors={setErrors}
//                   />
//                 )}

//                 {/* STEP 2 */}

//                 {step === 2 && (
//                   <Step2
//                     answers={answers}
//                     setAnswers={setAnswers}
//                     errors={errors}
//                     setErrors={setErrors}
//                     SKIN_TYPES={SKIN_TYPES}
//                   />
//                 )}

//                 {/* STEP 3 */}

//                 {step === 3 && (
//                   <Step3
//                     answers={answers}
//                     setAnswers={setAnswers}
//                     errors={errors}
//                     setErrors={setErrors}
//                     CONCERNS={CONCERNS}
//                   />
//                 )}

//                 {/* STEP 4 */}

//                 {step === 4 && (
//                   <Step4
//                     answers={answers}
//                     setAnswers={setAnswers}
//                     errors={errors}
//                     setErrors={setErrors}
//                     CONCERNS={CONCERNS}
//                     SUB_CONCERNS={SUB_CONCERNS}
//                   />
//                 )}

//                 {/* STEP 5 */}

//                 {step === 5 && (
//                   <Step5
//                     answers={answers}
//                     setAnswers={setAnswers}
//                     errors={errors}
//                     setErrors={setErrors}
//                     LIFESTYLE={LIFESTYLE}
//                   />
//                 )}

//                 {/* STEP 6 */}

//                 {step === 6 && (
//                   <Step6
//                     answers={answers}
//                     setAnswers={setAnswers}
//                     errors={errors}
//                     setErrors={setErrors}
//                     ROUTINE_LEVELS={ROUTINE_LEVELS}
//                   />
//                 )}

//                 {/* STEP 7 */}

//                 {step === 7 && (
//                   <Step7
//                     answers={answers}
//                     setAnswers={setAnswers}
//                     errors={errors}
//                     setErrors={setErrors}
//                     GOALS={GOALS}
//                   />
//                 )}

//               </motion.div>
//             )}

//       {/* result */}

//           {showResults && (

//             <motion.div
//               key="results"
//               initial={{
//                 opacity: 0,
//                 y: 20,
//               }}
//               animate={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               exit={{
//                 opacity: 0,
//                 y: -20,
//               }}
//               transition={{
//                 duration: 0.3,
//               }}
//             >

//               <Results
//                 answers={answers}
//                 recommendations={recommendations}
//                 loading={loading}
//                 selectedProducts={selectedProducts}
//                 setSelectedProducts={
//                   setSelectedProducts
//                 }
//                 onBack={onBack}
//                 resetAll={resetAll}
//               />

//             </motion.div>
//           )}

//         </AnimatePresence>

//       </div>

//  {/* controls */}

//       {!showResults && (

//         <div className="mx-auto mt-8 flex max-w-3xl items-center justify-between">

//           {/* BACK */}

//           <button
//             type="button"
//             className="
//               rounded-xl
//               border
//               px-4
//               py-2
//               transition
//               hover:border-zinc-300
//               disabled:cursor-not-allowed
//               disabled:opacity-40
//             "
//             onClick={onBack}
//             disabled={step === 1 || loading}
//           >
//             Back
//           </button>

//           {/* NEXT */}

//           {step < totalSteps ? (

//             <motion.button
//               type="button"
//               whileTap={{
//                 scale: 0.98,
//               }}
//               className={classNames(
//                 "cursor-pointer rounded-xl px-6 py-2 text-white transition",
//                 canNext
//                   ? "bg-[#61b9b9] hover:bg-[#2d6d6d]"
//                   : "bg-[#61b9b9]"
//               )}
//               onClick={onNext}
//               disabled={loading}
//             >
//               Next
//             </motion.button>

//           ) : (

//             <motion.button
//               type="button"
//               whileTap={{
//                 scale: 0.98,
//               }}
//               className="
//                 cursor-pointer
//                 rounded-xl
//                 bg-[#3A8B88]
//                 px-6
//                 py-2
//                 text-white
//                 transition
//                 hover:bg-[#3A8B88]
//                 disabled:cursor-not-allowed
//                 disabled:opacity-60
//               "
//               onClick={buildRecommendations}
//               disabled={loading}
//             >
//               {loading
//                 ? "Getting Recommendations..."
//                 : "See Recommendation"}
//             </motion.button>

//           )}

//         </div>

//       )}

//     </div>
//   );
// }
"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  SKIN_TYPES,
  CONCERNS,
  SUB_CONCERNS,
  LIFESTYLE,
  ROUTINE_LEVELS,
  GOALS,
} from "@/utils/SkinInsightData";

import api from "@/utils/api";

import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import Step6 from "./steps/Step6";
import Step7 from "./steps/Step7";
import Results from "./steps/Results";

import { classNames } from "./utils";

/** ---------------------------
 *  QUIZ COMPONENT
 *  --------------------------- */
export default function SkinInsightQuiz() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(1);

  const [answers, setAnswers] = useState({
    skinType: "",
    concerns: [],
    subConcerns: [],
    lifestyle: [],
    routineLevel: "",
    goal: [],
    ageGroup: "",
    email: "",
    name: "",
  });

  const [showResults, setShowResults] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);

  const totalSteps = 7;

  const progress =
    ((showResults ? totalSteps : step) / totalSteps) * 100;

  const canNext = useMemo(() => {
    if (step === 1) {
      return !!answers.ageGroup && !!answers.email && !!answers.name;
    }

    if (step === 2) {
      return !!answers.skinType;
    }

    if (step === 3) {
      return answers?.concerns?.length > 0;
    }

    if (step === 4) {
      return answers?.subConcerns?.length > 0;
    }

    if (step === 5) {
      return answers?.lifestyle?.length > 0;
    }

    if (step === 6) {
      return !!answers.routineLevel;
    }

    if (step === 7) {
      return !!answers.goal?.length;
    }

    return false;
  }, [step, answers]);

  const onNext = () => {
    let newErrors = {};

    if (step === 1) {
      if (!answers.ageGroup) {
        newErrors.ageGroup = "Please select your age";
      }

      if (!answers.name) {
        newErrors.name = "Please enter your name";
      }

      if (!answers.email) {
        newErrors.email = "Please enter your email";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) {
        newErrors.email = "Enter a valid email address";
      }
    }

    if (step === 2) {
      if (!answers.skinType) {
        newErrors.skinType = "Please select your skin type";
      }
    }

    if (step === 3) {
      if (!answers.concerns.length) {
        newErrors.concerns = "Select at least one concern";
      }
    }

    if (step === 4) {
      if (!answers.subConcerns.length) {
        newErrors.subConcerns =
          "Select at least one sub concern factor";
      }
    }

    if (step === 5) {
      if (!answers.lifestyle.length) {
        newErrors.lifestyle =
          "Select at least one lifestyle factor";
      }
    }

    if (step === 6) {
      if (!answers.routineLevel) {
        newErrors.routineLevel =
          "Please select your routine level";
      }
    }

    if (step === 7) {
      if (!answers.goal.length) {
        newErrors.goal =
          "Please select at least one skincare goal";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    if (step < totalSteps) {
      setStep((s) => s + 1);
    } else {
      setShowResults(true);
    }
  };

  const onBack = () => {
    if (showResults) {
      setShowResults(false);
      setStep(totalSteps);
    } else if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  const resetAll = () => {
    setStep(1);
    setShowResults(false);

    setAnswers({
      skinType: "",
      concerns: [],
      subConcerns: [],
      lifestyle: [],
      routineLevel: "",
      goal: [],
      ageGroup: "",
      email: "",
      name: "",
    });

    setRecommendations([]);
    setSelectedProducts([]);
    setErrors({});
  };

  async function buildRecommendations(currentAnswers) {
    const {
      skinType,
      concerns,
      subConcerns,
      lifestyle,
      routineLevel,
      goal,
      ageGroup,
      email,
      name,
    } = currentAnswers;

    try {
      // Validate and move to results
      onNext();

      setLoading(true);

      let finalConcerns = [];

      concerns.forEach((concern) => {
        CONCERNS.forEach((c) => {
          if (c.id === concern) {
            finalConcerns.push(c.label);
          }
        });
      });

      const payload = {
        name,
        email,
        age: ageGroup,

        skin_types: [
          skinType.replace(/\s+/g, "_").toLowerCase(),
        ],

        concerns: finalConcerns.map((concern) =>
          concern.replace(/\s+/g, "_").toLowerCase()
        ),

        sub_concerns: subConcerns.map((subConcern) =>
          subConcern.replace(/\s+/g, "_").toLowerCase()
        ),

        lifestyle: lifestyle.map((item) =>
          item.replace(/\s+/g, "_").toLowerCase()
        ),

        routine_levels: [
          routineLevel.replace(/\s+/g, "_").toLowerCase(),
        ],

        goals: (Array.isArray(goal) ? goal : [goal]).map((g) =>
          g.replace(/\s+/g, "_").toLowerCase()
        ),
      };

      console.log("Sending payload:", payload);

      const response = await api.post(
        "/recommendations/skin-form",
        payload
      );

      console.log("Recommendations:", response);

      if (response.data) {
        setRecommendations(
          response?.data?.recommendations || []
        );

        setSelectedProducts(
          response?.data?.recommendations?.map(
            (p) => p.id || p._id
          ) || []
        );
      }
    } catch (error) {
      console.error(
        "Error getting recommendations:",
        error
      );

      alert(
        "Failed to fetch recommendations. Please try again."
      );

      return null;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-12 mt-20 md:mt-0">
      {/* Header */}
      <div className="mb-6 md:mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Find Your Perfect Skincare Routine
        </h1>

        <p className="text-zinc-600 mt-2">
          Answer 5 quick questions to get a personalized routine.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="h-2 max-w-3xl mx-auto rounded-full bg-zinc-200 overflow-hidden">
          <motion.div
            className="h-full bg-[#355454]"
            style={{
              width: `${progress}%`,
            }}
            initial={{
              width: 0,
            }}
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 0.35,
            }}
          />
        </div>

        <div className="mt-2 text-sm text-zinc-500 text-right">
          {showResults
            ? "Completed"
            : `Step ${step} of ${totalSteps}`}
        </div>
      </div>

      {/* Content */}
      <div className="relative min-h-[300px] mx-auto">
        <AnimatePresence mode="wait">
          {!showResults &&
            step >= 1 &&
            step <= 7 && (
              <div className="max-w-3xl mx-auto w-full">
                {step === 1 && (
                  <Step1
                    answers={answers}
                    setAnswers={setAnswers}
                    errors={errors}
                    setErrors={setErrors}
                  />
                )}

                {step === 2 && (
                  <Step2
                    answers={answers}
                    setAnswers={setAnswers}
                    errors={errors}
                    setErrors={setErrors}
                    SKIN_TYPES={SKIN_TYPES}
                  />
                )}

                {step === 3 && (
                  <Step3
                    answers={answers}
                    setAnswers={setAnswers}
                    errors={errors}
                    setErrors={setErrors}
                    CONCERNS={CONCERNS}
                  />
                )}

                {step === 4 && (
                  <Step4
                    answers={answers}
                    setAnswers={setAnswers}
                    errors={errors}
                    setErrors={setErrors}
                    CONCERNS={CONCERNS}
                    SUB_CONCERNS={SUB_CONCERNS}
                  />
                )}

                {step === 5 && (
                  <Step5
                    answers={answers}
                    setAnswers={setAnswers}
                    errors={errors}
                    setErrors={setErrors}
                    LIFESTYLE={LIFESTYLE}
                  />
                )}

                {step === 6 && (
                  <Step6
                    answers={answers}
                    setAnswers={setAnswers}
                    errors={errors}
                    setErrors={setErrors}
                    ROUTINE_LEVELS={ROUTINE_LEVELS}
                  />
                )}

                {step === 7 && (
                  <Step7
                    answers={answers}
                    setAnswers={setAnswers}
                    errors={errors}
                    setErrors={setErrors}
                    GOALS={GOALS}
                  />
                )}
              </div>
            )}

          {showResults && (
            <Results
              answers={answers}
              recommendations={recommendations}
              loading={loading}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              onBack={onBack}
              resetAll={resetAll}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      {!showResults && (
        <div className="mt-8 flex items-center justify-between max-w-3xl mx-auto">
          <button
            className="rounded-xl border px-4 py-2 hover:border-zinc-300 disabled:opacity-40"
            onClick={onBack}
            disabled={step === 1}
          >
            Back
          </button>

          {step < totalSteps ? (
            <motion.button
              whileTap={{ scale: 0.98 }}
              className={classNames(
                "rounded-xl px-6 py-2 text-white transition cursor-pointer",
                canNext
                  ? "bg-[#61b9b9] hover:bg-[#2d6d6d]"
                  : "bg-[#61b9b9]"
              )}
              onClick={onNext}
            >
              Next
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.98 }}
              className={classNames(
                "rounded-xl px-6 py-2 text-white transition cursor-pointer",
                canNext
                  ? "bg-[#3A8B88] hover:bg-[#3A8B88]"
                  : "bg-[#3A8B88]"
              )}
              onClick={() =>
                buildRecommendations(answers)
              }
            >
              See Reccommendation
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
}