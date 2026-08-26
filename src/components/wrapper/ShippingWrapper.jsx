export default function ShippingPolicy() {
  return (
    <div className="text-gray-800 p-6 md:p-12 max-w-5xl mx-auto mt-20">
      <h1 className="text-3xl font-medium text-center mb-8">
        Shipping Policy
      </h1>

      <p className="mb-4">
        At Nythng, we ensure that every order is packed with care and delivered
        to you in a timely and secure manner. Please review our shipping policy
        below.
      </p>

      <section className="mb-6">
        <h2 className="text-md font-semibold mb-2">
          Shipping Coverage
        </h2>

        <p>
          We currently ship to all serviceable pin codes across India.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-md font-semibold mb-2">
          Shipping Charges
        </h2>

        <p>
          We offer <strong>free shipping</strong> on all orders, no minimum
          purchase required.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-md font-semibold mb-2">
          Delivery Timelines
        </h2>

        <ul className="list-disc list-inside space-y-1">
          <li>
            Orders are usually dispatched within{" "}
            <strong>24–48 hours</strong> of confirmation.
          </li>

          <li>
            Delivery typically takes <strong>3–5 working days</strong>,
            depending on the destination and order volume.
          </li>

          <li>
            During peak demand periods, delivery times may vary slightly.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-md font-semibold mb-2">
          Courier Partner
        </h2>

        <p>
          All orders are shipped via our trusted logistics partner{" "}
          <strong>Shiprocket</strong>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-md font-semibold mb-2">
          Order Tracking
        </h2>

        <p>
          Once your order has been dispatched, you will receive a{" "}
          <strong>tracking link via email and WhatsApp</strong> to monitor the
          status of your shipment.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-md font-semibold mb-2">
          Delays & Exceptions
        </h2>

        <ul className="list-disc list-inside space-y-1">
          <li>
            Unforeseen delays due to strikes, natural calamities, or high
            seasonal demand may impact delivery times.
          </li>

          <li>
            If your pin code is non-serviceable by our courier partner, our team
            will reach out to you with alternative options.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-md font-semibold mb-2">
          Failed Deliveries & Re-Delivery
        </h2>

        <ul className="list-disc list-inside space-y-1">
          <li>
            In case of an incorrect address or customer unavailability at the
            time of delivery, the order will be returned to us.
          </li>

          <li>
            Customers will be responsible for{" "}
            <strong>re-delivery charges.</strong> For assistance, you may
            contact the delivery partner directly or reach out to us.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-md font-semibold mb-2">
          Damaged or Lost Packages
        </h2>

        <ul className="list-disc list-inside space-y-1">
          <li>
            If your package arrives in a{" "}
            <strong>damaged or tampered condition</strong>, please record a{" "}
            <strong>video of the unboxing</strong> and share it with us
            immediately.
          </li>

          <li>
            Upon verification, we will initiate a{" "}
            <strong>refund or replacement</strong> at no additional cost.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-md font-semibold mb-2">
          Returns & Refunds
        </h2>

        <ul className="list-disc list-inside space-y-1">
          <li>
            Products are{" "}
            <strong>non-returnable and non-refundable</strong>, except in cases
            of damage, tampering, or incorrect delivery.
          </li>

          <li>
            Any return or refund will only be processed after proper
            verification and proof (video evidence) is submitted.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-md font-semibold mb-2">
          Order Modifications & Cancellations
        </h2>

        <ul className="list-disc list-inside space-y-1">
          <li>
            Orders can only be modified or cancelled{" "}
            <strong>until confirmation.</strong>
          </li>

          <li>
            Once confirmed, no changes or cancellations are possible.
          </li>
        </ul>
      </section>
    </div>
  );
}