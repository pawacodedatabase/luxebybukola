const LegalTerms = () => {
  return (
    <div className="bg-gray-50 py-10 px-4 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
        <p className="text-gray-600 mb-4">
          Welcome to <strong>LuxeByBukola (LBB)</strong>! By accessing and using our website, you agree to the following
          terms and conditions. Please read them carefully.
        </p>

        <div className="space-y-8">
          {/* Section 1: Introduction */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">1. Introduction</h2>
            <p className="text-gray-600">
              These Terms and Conditions ("Terms") govern your use of our website and the purchase of our products. By accessing
              or using our website, you agree to be bound by these Terms. If you do not agree, please refrain from using our platform.
            </p>
          </div>

          {/* Section 2: Products and Services */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">2. Products and Services</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>LuxeByBukola (LBB) offers curated, high-quality, luxurious female bags, shoes, and jewelry.</li>
              <li>All products are subject to availability and may change without prior notice.</li>
              <li>Images are for illustrative purposes; slight variations in color may occur due to screen differences.</li>
            </ul>
          </div>

          {/* Section 3: Payment Terms */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">3. Payment Terms</h2>
            <p className="text-gray-600">
              Full payment is required before an order is processed. We accept the following payment methods:
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Bank Transfers</li>
              <li>Mobile Payment Options</li>
            </ul>
          </div>

          {/* Section 4: Order Processing and Delivery */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">4. Order Processing and Delivery</h2>
            <p className="text-gray-600">
              Orders are typically processed and shipped within <strong>2–5 working days</strong>, depending on availability and your location.
              Shipping fees are calculated at checkout and may vary by region.
            </p>
          </div>

          {/* Section 5: Returns and Refunds */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">5. Returns and Refunds</h2>
            <p className="text-gray-600">
              We accept returns on eligible items within 7 days of delivery, provided they meet the following conditions:
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Items must be unused, in original condition, and in original packaging.</li>
              <li>Return shipping fees are the customer's responsibility, unless the item is defective or incorrect.</li>
              <li>Jewelry items are non-returnable for hygiene reasons.</li>
            </ul>
          </div>

          {/* Section 6: Use of Website */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">6. Use of Website</h2>
            <p className="text-gray-600">
              You agree to use our website lawfully and not to infringe on any intellectual property rights or engage in unauthorized use.
              Misuse of the website may result in restricted access or legal action.
            </p>
          </div>

          {/* Section 7: Contact Us */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">7. Contact Us</h2>
            <p className="text-gray-600">
              For questions regarding these Terms, please contact us at:
              <br />
              <strong>Email:</strong>{" "}
              <a href="mailto:oguntimehinbukola52@gmail.com" className=" text-blue-800 font-semibold text-sm underline"> 
              oguntimehinbukola52@gmail.com
              </a>
              <br />
              <strong>Phone:</strong>{" "}
              <a href="tel:+2348104682609" className="text-blue-800 font-semibold text-sm underline">
              +234 810 468 2609
              </a>
            </p>
          </div>
        </div>

        <p className="text-gray-500 mt-8">
          Last updated: <span className="font-semibold">Jan 18, 2025</span>
        </p>
      </div>
    </div>
  );
};

export default LegalTerms;
