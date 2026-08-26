import Link from "next/link";

const RefundPolicy = () => {
  return (
    <div className="text-gray-800 p-6 md:p-12 max-w-5xl mx-auto mt-20">
      <h1 className="text-3xl font-semibold text-center mb-8 primaryText">
        Return Policy
      </h1>

      <section className="mb-6">
        <p>
          At Nythng, we stand behind the quality of our products and want you
          to feel confident in every purchase. While all our skincare products
          are non-returnable and non-refundable due to hygiene and safety
          reasons, we do offer refunds or exchanges in specific cases where
          the issue arises from our side.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Eligibility for Refund or Exchange
        </h2>

        <p>We will gladly process a refund or exchange only if:</p>

        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>You received a damaged product</li>
          <li>You received the wrong item</li>
          <li>The product arrived with defective packaging</li>
          <li>Your order has missing items</li>
        </ul>

        <p className="mt-2 text-sm text-gray-600">
          <strong>Please Note:</strong> Refunds or exchanges are applicable
          only if the error is from our end.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Proof Requirement</h2>

        <p>
          To ensure fairness and transparency, customers must provide an
          unboxing video/photo clearly showing the issue. Without valid proof,
          refund or exchange requests will not be entertained.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Refund Method</h2>

        <ul className="list-disc list-inside space-y-1">
          <li>Refunds are processed via bank transfer only.</li>
          <li>Processing time: Up to 15 working days from approval.</li>
          <li>
            Alternatively, we may provide an exchange depending on the case.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Important Notes</h2>

        <ul className="list-disc list-inside space-y-1">
          <li>
            All skincare products are non-returnable once opened or used.
          </li>
          <li>Requests without proper proof will be declined.</li>
          <li>Partial refunds are not applicable.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          How to Request a Refund or Exchange
        </h2>

        <p>
          If your order meets the eligibility criteria, please reach out to us
          at:
        </p>

        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            Email:{" "}
            <a
              href="mailto:support@nythyng.com"
              className="text-blue-600 hover:underline"
            >
              support@nythyng.com
            </a>
          </li>

          <li>
            Or visit our{" "}
            <Link
              href="/contact-us"
              className="text-blue-600 hover:underline"
            >
              Contact Page
            </Link>{" "}
            to raise a request.
          </li>
        </ul>

        <p className="mt-3">
          When contacting us, kindly include:
        </p>

        <ul className="list-disc list-inside space-y-1">
          <li>Your Order ID</li>
          <li>A clear unboxing video/photo of the product</li>
          <li>A short description of the issue</li>
        </ul>
      </section>
    </div>
  );
};

export default RefundPolicy;