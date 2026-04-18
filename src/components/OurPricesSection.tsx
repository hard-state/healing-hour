'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Button from './ui/Button';

interface PricingData {
  travelFeePackage: {
    title: string;
    timeRange: string;
    originalPrice: number;
    discountedPrice: number;
    options: Array<{
      duration: string;
      price: string;
    }>;
  };
  uberPackageComplex: {
    title: string;
    timeRange: string;
    originalPrice: number;
    discountedPrice: number;
    options: Array<{
      duration: string;
      price: string;
    }>;
  };
  safetyNotice: {
    heading: string;
    content: string;
  };
}

export default function OurPricesSection() {
  const [pricingData, setPricingData] = useState<PricingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      const response = await fetch('https://dmtart.pro/healthy/api/pricing');
      if (!response.ok) throw new Error('API not available');
      const data = await response.json();
      setPricingData(data);
    } catch (error) {
      console.log('Backend unavailable, using fallback pricing data');
      // Gracefully fallback to hardcoded data
      setPricingData({
        travelFeePackage: {
          title: 'Travel Fee',
          timeRange: 'Price from 9:00 AM until 11.00 PM',
          originalPrice: 90,
          discountedPrice: 70,
          options: [
            { duration: '60 MINUTE', price: '£70.00 +15 TRAVEL FEE' },
            { duration: '90 MINUTE', price: '£90.00 +15 TRAVEL FEE' },
            { duration: '120 MINUTE', price: '£110.00 +15 TRAVEL FEE' }
          ]
        },
        uberPackageComplex: {
          title: 'Uber Package',
          timeRange: 'Price from 11.00 PM until 2:00 AM',
          originalPrice: 130,
          discountedPrice: 110,
          options: [
            { duration: '60 MINUTE', price: '£110+UBER' },
            { duration: '90 MINUTE', price: '£145+UBER' },
            { duration: '120 MINUTE', price: '£180+UBER' }
          ]
        },
        safetyNotice: {
          heading: '* MASSAGE TRAVEL FEE ARE REQUIRED',
          content: 'All massage sessions require travel fee payment'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="prices" className="py-20 bg-gradient-to-br from-warm-cream via-amber-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const travelFee = pricingData?.travelFeePackage;
  const uberPackage = pricingData?.uberPackageComplex;
  return (
    <section id="prices" className="py-20 bg-gradient-to-br from-warm-cream via-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-1 bg-soft-gold mx-auto mb-8"
          />
          <h2 className="font-elegant text-4xl md:text-5xl font-bold text-matte-black mb-4">
            Our Prices
          </h2>
          <p className="text-charcoal text-lg max-w-2xl mx-auto">
            Professional massage therapy services with transparent pricing and flexible scheduling options
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Travel Fee Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-soft-gold/20 hover:shadow-3xl transition-all duration-300">
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black px-6 py-2 rounded-full font-semibold text-sm shadow-lg">
                  {travelFee?.title || 'Travel Fee'}
                </div>
              </div>

              {/* Time Range */}
              <div className="text-center mb-6 mt-4">
                <p className="text-soft-gold font-semibold text-lg mb-2">{travelFee?.timeRange || 'Time Range'}</p>
                <div className="flex justify-center items-center gap-4">
                  <span className="text-3xl font-bold text-matte-black line-through text-gray-400">£{travelFee?.originalPrice || 90}</span>
                  <span className="text-5xl font-bold text-soft-gold">£{travelFee?.discountedPrice || 70}</span>
                </div>
              </div>

              {/* Pricing Details */}
              <div className="space-y-4 mb-8">
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <p className="text-center text-amber-800 font-semibold mb-3">
                    {pricingData?.safetyNotice?.heading || '* MASSAGE TRAVEL FEE ARE REQUIRED'}
                  </p>
                  <div className="space-y-3">
                    {travelFee?.options?.map((option: any, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-charcoal font-medium">{option.duration}</span>
                        <span className="text-matte-black font-bold">{option.price}</span>
                      </div>
                    )) || (
                      <div className="flex justify-between items-center">
                        <span className="text-charcoal font-medium">60 MINUTE</span>
                        <span className="text-matte-black font-bold">£70.00 +15 TRAVEL FEE</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button variant='primary2' size="lg" href="#book" className="w-full shadow-xl">
                Book now
              </Button>
            </div>
          </motion.div>

          {/* Uber Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-soft-gold/20 hover:shadow-3xl transition-all duration-300">
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black px-6 py-2 rounded-full font-semibold text-sm shadow-lg">
                  {uberPackage?.title || 'Uber Package'}
                </div>
              </div>

              {/* Time Range */}
              <div className="text-center mb-6 mt-4">
                <p className="text-soft-gold font-semibold text-lg mb-2">{uberPackage?.timeRange || 'Time Range'}</p>
                <div className="flex justify-center items-center gap-4">
                  <span className="text-3xl font-bold text-matte-black line-through text-gray-400">£{uberPackage?.originalPrice || 130}</span>
                  <span className="text-5xl font-bold text-soft-gold">£{uberPackage?.discountedPrice || 110}</span>
                </div>
              </div>

              {/* Pricing Details */}
              <div className="space-y-4 mb-8">
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <p className="text-center text-amber-800 font-semibold mb-3">
                    {pricingData?.safetyNotice?.heading || '* MASSAGE TRAVEL FEE ARE REQUIRED'}
                  </p>
                  <div className="space-y-3">
                    {uberPackage?.options?.map((option: any, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-charcoal font-medium">{option.duration}</span>
                        <span className="text-matte-black font-bold">{option.price}</span>
                      </div>
                    )) || (
                      <div className="flex justify-between items-center">
                        <span className="text-charcoal font-medium">60 MINUTE</span>
                        <span className="text-matte-black font-bold">£110+UBER</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button variant='primary2' size="lg" href="#book" className="w-full shadow-xl">
                Book now
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Safety Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-soft-gold/10 to-yellow-400/10 rounded-3xl p-8 border border-soft-gold/30"
        >
          <div className="text-center">
            <h3 className="font-elegant text-2xl font-bold text-matte-black mb-4">
              **For the safety and well-being of our therapists...
            </h3>
            <p className="text-charcoal leading-relaxed max-w-4xl mx-auto mb-6">
              we kindly request that all late bookings who finishing after 10.30 pm will have to include Uber for their return journey home.
            </p>
            <p className="text-charcoal leading-relaxed max-w-4xl mx-auto mb-8">
              Our top priority is to ensure therapists safety due to the late hours and allow them to continue providing exceptional service with peace of mind. We appreciate your understanding and cooperation in helping us maintain a secure and respectful environment for everyone involved.
            </p>
            <Button variant="primary2" size="lg" href="#book" className="shadow-xl">
              Book now
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
