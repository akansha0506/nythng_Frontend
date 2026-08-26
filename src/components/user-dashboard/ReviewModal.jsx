"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ScrollLock from "@/utils/ScrollLock";

import { Star, X, Plus, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";

import {
  checkUserReviewStatus,
  createReview,
  updateReview,
} from "@/redux/slices/reviewSlice";

import { toast } from "react-toastify";
import Fadeloader from "@/components/common/Fadeloader";

const MAX_IMAGES = 5;

const ratingLabels = [
  "Glow Queen",
  "Radiant & Fresh",
  "Skin Goals",
  "Loved the Glow",
  "Good, Not Great",
  "Just Okay",
  "Didn’t See Results",
  "Not Impressed",
  "Disappointing",
  "Waste of Money",
];

const ReviewModal = ({ onClose, product, OrderId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [label, setLabel] = useState("");
  const [customLabel, setCustomLabel] = useState("");
  const [reviewId, setReviewId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageToDelete, setImageToDelete] = useState([]);
  const [dataChecking, setDataChecking] = useState(false);

  const dispatch = useDispatch();

  const fileInputRef = useRef(null);

  const handleCreate = async (data) => {
    const formdata = new FormData();

    // product and order id
    formdata.append("productId", data.productId);
    formdata.append("orderId", data.orderId);

    // form data
    formdata.append("rating", data.rating);
    formdata.append("title", data.label);
    formdata.append("comment", data.comment);

    data.images.forEach((image) => {
      image.file &&
        formdata.append("images", image.file);
    });

    setLoading(true);

    try {
      const res = await dispatch(
        createReview(formdata)
      ).unwrap();

      if (res && res.success) {
        toast.success(
          res.message ||
            "Review submitted successfully!"
        );

        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, data) => {
    const formdata = new FormData();

    formdata.append("rating", data.rating);
    formdata.append("title", data.label);
    formdata.append("comment", data.comment);

    data.images.forEach((image) => {
      image.file &&
        formdata.append("images", image.file);
    });

    const finalDelImage = imageToDelete.map(
      (img) => img.url
    );

    if (finalDelImage.length > 0) {
      formdata.append(
        "imagesToDelete",
        JSON.stringify(finalDelImage)
      );
    }

    setLoading(true);

    try {
      const res = await dispatch(
        updateReview({
          id,
          reviewData: formdata,
        })
      ).unwrap();

      if (res && res.success) {
        toast.success(
          res.message ||
            "Review updated successfully!"
        );

        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalLabel = customLabel || label;

    if (rating === 0) {
      toast.warn(
        "Please provide a rating before submitting your review."
      );
      return;
    }

    if (comment.trim() === "") {
      toast.warn(
        "Please provide a comment before submitting your review."
      );
      return;
    }

    if (finalLabel.trim() === "") {
      toast.warn(
        "Please provide a label before submitting your review."
      );
      return;
    }

    if (reviewId) {
      handleUpdate(reviewId, {
        rating,
        label: finalLabel,
        comment,
        images,
      });
    } else {
      handleCreate({
        rating,
        label: finalLabel,
        comment,
        images,
        productId:
          product?.productId.id ||
          product?.productId._id,
        orderId: OrderId,
      });
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(
      e.target.files || []
    );

    const rawData = files.map((file) => ({
      file,
      url: "",
    }));

    const newImages = [
      ...images,
      ...rawData,
    ].slice(0, MAX_IMAGES);

    setImages(newImages);
  };

  const removeImage = (index) => {
    if (reviewId) {
      const imageToRemove = images[index];

      if (imageToRemove) {
        setImageToDelete((prev) => [
          ...prev,
          imageToRemove,
        ]);
      }
    }

    setImages(
      images.filter((_, i) => i !== index)
    );
  };

  useEffect(() => {
    const checkExistingReview = async (
      productId
    ) => {
      if (!productId) return;

      setDataChecking(true);

      try {
        const res = await dispatch(
          checkUserReviewStatus(productId)
        ).unwrap();

        console.log(res);

        if (
          res &&
          res.hasReviewed &&
          res.review
        ) {
          setRating(res.review.rating);
          setComment(res.review.comment);

          const resImages =
            res.review.images;

          if (
            Array.isArray(resImages) &&
            resImages.length > 0
          ) {
            const formattedImages =
              resImages.map((img) => ({
                file: null,
                url: img,
              }));

            setImages(formattedImages);
          }

          const title = res.review.title;

          if (ratingLabels.includes(title)) {
            setLabel(title);
          } else {
            setCustomLabel(title);
          }

          setReviewId(res.review._id);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setDataChecking(false);
      }
    };

    if (
      OrderId &&
      product &&
      (product?.productId?.id ||
        product?.productId?._id)
    ) {
      const productId =
        product?.productId?.id ||
        product?.productId?._id;

      checkExistingReview(productId);
    }
  }, []);

  return (
    <>
      <ScrollLock />

      <AnimatePresence>
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="inset-0 fixed bg-[#E5E5E566] overflow-auto backdrop-blur w-screen flex items-center justify-center p-2 sm:p-4 z-[99]"
        >
          {dataChecking ? (
            <Fadeloader />
          ) : (
            <>
              <motion.section
                initial={{
                  scale: 0.8,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                exit={{
                  scale: 0.8,
                  opacity: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                className="p-2 sm:p-6 md:p-4 rounded-lg shadow-lg bg-white relative w-full max-w-[95vw] md:mt-30 sm:max-w-2xl"
              >
                <X
                  onClick={onClose}
                  className="absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-red-400 duration-150 w-6 h-6 sm:w-7 sm:h-7"
                />

                <div className="flex flex-col justify-center items-center mb-4 sm:mb-6 text-center">
                  <p className="text-base sm:text-lg font-semibold primaryText">
                    Review Product
                  </p>

                  <p className="text-xs sm:text-sm primaryText">
                    Share your experience with
                  </p>

                  <p className="font-medium text-sm sm:text-base primaryText">
                    {product?.productId.heading}
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-3 sm:space-y-4 overflow-y-auto"
                >
                  {/* Rating */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs sm:text-sm font-medium primaryText">
                      Pick a Star Rating
                    </label>

                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(
                        (star) => (
                          <motion.div
                            key={star}
                            whileHover={{
                              scale: 1.2,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                            }}
                          >
                            <Star
                              onClick={() => {
                                setRating(star);
                                setLabel(
                                  ratingLabels[
                                    star - 1
                                  ]
                                );
                                setCustomLabel("");
                              }}
                              onMouseEnter={() =>
                                setHover(star)
                              }
                              onMouseLeave={() =>
                                setHover(0)
                              }
                              className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer transition-colors"
                              style={{
                                color:
                                  star <=
                                  (hover ||
                                    rating)
                                    ? "#FBBF24"
                                    : "#d1d5db",
                                fill:
                                  star <=
                                  (hover ||
                                    rating)
                                    ? "#FBBF24"
                                    : "none",
                              }}
                            />
                          </motion.div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Rating Label */}
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height:
                        rating > 0
                          ? "auto"
                          : 0,
                      opacity:
                        rating > 0 ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className="overflow-hidden"
                  >
                    {rating > 0 && (
                      <div className="space-y-2 mt-2">
                        <Label className="text-xs sm:text-sm primaryText">
                          How would you describe it?
                        </Label>

                        <div className="flex flex-wrap gap-2">
                          {ratingLabels.map(
                            (lbl) => (
                              <motion.button
                                key={lbl}
                                type="button"
                                onClick={() => {
                                  setLabel(lbl);
                                  setCustomLabel("");
                                }}
                                whileHover={{
                                  scale: 1.05,
                                }}
                                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full border transition-all cursor-pointer ${
                                  label === lbl
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "bg-white bodyText border-gray-300 hover:bg-gray-100"
                                }`}
                              >
                                {lbl}
                              </motion.button>
                            )
                          )}

                          <motion.button
                            type="button"
                            onClick={() => {
                              setLabel("Other");
                              setCustomLabel("");
                            }}
                            whileHover={{
                              scale: 1.05,
                            }}
                            className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full border transition-all cursor-pointer ${
                              label === "Other"
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-white bodyText border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            Other
                          </motion.button>
                        </div>

                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height:
                              rating > 0
                                ? "auto"
                                : 0,
                            opacity:
                              rating > 0 ? 1 : 0,
                          }}
                          transition={{
                            duration: 0.4,
                            ease: "easeOut",
                          }}
                          className="overflow-hidden"
                        >
                          {label === "Other" && (
                            <motion.input
                              type="text"
                              value={customLabel}
                              onChange={(e) =>
                                setCustomLabel(
                                  e.target.value
                                )
                              }
                              placeholder="Enter your own label..."
                              initial={{
                                opacity: 0,
                                y: -10,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              transition={{
                                duration: 0.3,
                              }}
                              className="w-full border rounded-md px-3 py-2 text-xs sm:text-sm mt-2"
                            />
                          )}
                        </motion.div>
                      </div>
                    )}
                  </motion.div>

                  {/* Comment */}
                  <div className="space-y-2">
                    <Label className="text-xs sm:text-sm primaryText">
                      Comment
                    </Label>

                    <Textarea
                      value={comment}
                      onChange={(e) =>
                        setComment(e.target.value)
                      }
                      placeholder="Write your review..."
                      className="min-h-[80px] sm:min-h-[100px] text-xs sm:text-sm"
                    />
                  </div>

                  {/* Images Upload */}
                  <div className="space-y-2">
                    <Label className="text-xs sm:text-sm primaryText">
                      Upload Images (optional)
                    </Label>

                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      <AnimatePresence>
                        {images?.map(
                          (img, index) => (
                            <motion.div
                              key={index}
                              initial={{
                                opacity: 0,
                                scale: 0.8,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              exit={{
                                opacity: 0,
                                scale: 0.8,
                              }}
                              className="relative"
                            >
                              <img
                                src={
                                  img.url
                                    ? img.url
                                    : URL.createObjectURL(
                                        img.file
                                      )
                                }
                                alt={`preview-${index}`}
                                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  removeImage(index)
                                }
                                className="absolute top-1 right-6 bg-white rounded-full p-0.5 shadow hover:bg-red-100 cursor-pointer"
                              >
                                <X className="w-4 h-4 text-red-500" />
                              </button>
                            </motion.div>
                          )
                        )}
                      </AnimatePresence>

                      {(images?.length || 0) <
                        MAX_IMAGES && (
                        <button
                          type="button"
                          onClick={() =>
                            fileInputRef.current?.click()
                          }
                          className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border rounded-md hover:bg-gray-100 transition cursor-pointer"
                        >
                          <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                        </button>
                      )}
                    </div>

                    <input
                      type="file"
                      multiple
                      accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                      ref={fileInputRef}
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto bg-[#8C6C54] hover:bg-[#3d2622] text-xs sm:text-sm px-4 py-2 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" />

                          <span>
                            {reviewId
                              ? "Updating..."
                              : "Submitting..."}
                          </span>
                        </>
                      ) : reviewId ? (
                        "Update Review"
                      ) : (
                        "Submit Review"
                      )}
                    </Button>
                  </div>
                </form>
              </motion.section>
            </>
          )}
        </motion.article>
      </AnimatePresence>
    </>
  );
};

export default ReviewModal;