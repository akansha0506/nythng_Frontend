export default function CouponCard({
  onApply,
  code,
  offer,
  isApplied,
  discountType,
}) {
  // If coupon is already applied, hide the card
  if (isApplied) return null;

  const displayOffer =
    discountType === "percentage"
      ? `${offer}%`
      : `₹${offer}`;

  return (
    <div className="relative flex w-52 h-20 rounded-lg overflow-hidden shadow-md header ticket-shape text-gray-800 mb-3">
      
      {/* Left Section */}
      <div className="flex-1 p-4 relative">

        <p className="text-black mt-1 text-sm">
          {code}
        </p>

        <button
          type="button"
          className="bg-amber-900 text-white px-3 py-1 text-sm rounded-md shadow-sm hover:bg-[#552D19] cursor-pointer"
          onClick={onApply}
        >
          Apply
        </button>

      </div>


      {/* Divider */}
      <div className="w-0.5 border-l border-dotted border-gray-300 my-4" />


      {/* Right Section */}
      <div className="w-24 flex flex-col justify-center items-center text-white relative">

        <h3 className="text-sm font-semibold text-gray-800 pr-2">

          <span className="text-3xl">
            {displayOffer}
            <br />

            <span className="text-lg">
              Off
            </span>
          </span>

        </h3>

      </div>

    </div>
  );
}