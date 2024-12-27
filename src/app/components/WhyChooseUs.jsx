// components/WhyChooseUs.tsx
import React from "react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800">Why Choose Us</h2>
          <p className="mt-4 text-gray-600">
            Building lasting partnerships with exceptional after-service to
            ensure your success.
          </p>
        </motion.div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <img
              src="/images/partner.svg"
              alt="Partnership"
              className="w-16 h-16 mb-4 mx-auto"
            />
            <h3 className="text-2xl font-semibold text-gray-800">
              Trusted Partnership
            </h3>
            <p className="mt-2 text-gray-600">
              We collaborate with you to achieve your goals, ensuring mutual
              growth and success.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <img
              src="/images/after-service.svg"
              alt="After-Service"
              className="w-16 h-16 mb-4 mx-auto"
            />
            <h3 className="text-2xl font-semibold text-gray-800">
              Exceptional After-Service
            </h3>
            <p className="mt-2 text-gray-600">
              Our dedicated team ensures that your needs are met, even after
              project completion.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <img
              src="/images/credibility.svg"
              alt="Credibility"
              className="w-16 h-16 mb-4 mx-auto"
            />
            <h3 className="text-2xl font-semibold text-gray-800">
              Credibility and Trust
            </h3>
            <p className="mt-2 text-gray-600">
              Recognized by leading organizations for our reliability and
              excellence.
            </p>
          </motion.div>
        </div>

        {/* Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all">
            Learn More About Us
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
