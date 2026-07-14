"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { submitInquiry } from "@/lib/supabase";
import { SiteSettings, Category, SubCategory } from "@/lib/types";
import SafeImage from "@/components/SafeImage";
import { FiArrowRight, FiSend, FiMessageCircle } from "react-icons/fi";
import Alert from "@/components/Alert";

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address").or(z.literal("")),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  category: z.string().min(1, "Please select a category"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

interface ClientHomeProps {
  initialCategories: Category[];
  settings: SiteSettings;
}

export default function ClientHome({ initialCategories, settings }: ClientHomeProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      category: "",
      message: "",
    },
  });

  const onSubmit = async (data: InquiryFormData) => {
    try {
      const res = await submitInquiry({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        category: data.category,
        message: data.message,
      });

      if (!res.success) {
        alert("Database Error: " + (res.error?.message || "Failed to submit inquiry"));
        console.error("Supabase Error details:", res.error);
        return;
      }

      alert("Thank you! Your inquiry has been sent successfully.");
      reset();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error("Submission catch error:", err);
      alert("Submission failed: " + errorMsg);
    }
  };

  const cleanPhone = settings.phone.replace(/\s+/g, "").replace("+", "");

  return (
    <div className="flex flex-col bg-neutral-950 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-950/20 via-neutral-950 to-neutral-950 z-0"></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sky-400 bg-sky-400/10 border border-sky-400/20 rounded-full">
              {settings.logo_text} Architectural & Composite Fabricators
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-400 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {settings.logo_text} Custom Glass, <br />
            Aluminum & Fiber Solutions
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto font-light leading-relaxed text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {settings.site_subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link
              href="#categories"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-medium shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Explore Products</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-neutral-200 font-medium transition-all"
            >
              Contact Sales
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section
        id="categories"
        className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-white/5"
      >
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Browse Services</h2>
          <p className="text-neutral-400">
            We deliver state-of-the-art aluminum windows, custom fiber kitchens, and premium sliding
            mosquito protection screens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initialCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-white/5 bg-neutral-900/40 backdrop-blur-sm shadow-xl flex flex-col h-[380px]"
            >
              {/* Image Background Cover */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-transparent z-10 transition-colors group-hover:from-neutral-950/95" />
              <SafeImage
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition-transform duration-700 -z-10"
              />

              <div className="relative z-20 p-8 mt-auto flex flex-col h-full justify-between">
                <span className="self-start text-xs font-semibold tracking-widest text-sky-400 uppercase bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/20">
                  {settings.logo_text} Service
                </span>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-sky-400 transition-colors flex items-center gap-2">
                    <span>{category.name}</span>
                    <FiArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed max-w-md">
                    {category.description}
                  </p>
                  <div className="pt-4 flex flex-wrap gap-2">
                    {category.subcategories &&
                      category.subcategories.map((sub: SubCategory) => (
                        <span
                          key={sub.id}
                          className="text-xs text-neutral-400 bg-neutral-900 border border-white/5 px-2.5 py-1 rounded-md"
                        >
                          {sub.name}
                        </span>
                      ))}
                  </div>
                  <div className="pt-4">
                    <Link
                      href={`/category/${category.id}`}
                      className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm font-semibold transition-colors"
                    >
                      <span>View Service Catalogue</span>
                      <FiArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Inquiry and Contact section */}
      <section id="contact" className="py-24 bg-neutral-900/30 border-t border-white/5 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Context Details */}
            <div className="space-y-8 flex flex-col justify-center">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 rounded-full self-start">
                Quick Support & Inquiries
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Let&apos;s Build Your Project Together
              </h2>
              <p className="text-neutral-400 leading-relaxed text-lg">
                Require customized measurements, structural blueprints, or pricing details? Fill out
                our brief inquiry form or chat directly with our design engineering team on
                WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href={`https://wa.me/${cleanPhone}?text=Hi%20NMS,%20I%27d%20like%20to%20inquire%20about%20your%20products.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-emerald-500/20 transition-colors"
                >
                  <FiMessageCircle className="text-2xl" />
                  <span>Connect on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-neutral-900 border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl"></div>

              <h3 className="text-xl font-bold mb-6 text-white">Quick Inquiry Form</h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Enter your full name"
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-sky-500 transition-colors"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      {...register("phone")}
                      placeholder={`e.g. ${settings.phone}`}
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-sky-500 transition-colors"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="e.g. name@domain.com"
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-sky-500 transition-colors"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                    Service Category Interested In
                  </label>
                  <select
                    {...register("category")}
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-neutral-300 text-sm focus:outline-none focus:border-sky-500 transition-colors"
                  >
                    <option value="">Select a Category</option>
                    {initialCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                    Project Brief / Inquiry Details
                  </label>
                  <textarea
                    rows={4}
                    {...register("message")}
                    placeholder="Provide details on dimensions, requirements, or custom configurations..."
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-sky-500 transition-colors resize-none"
                  ></textarea>
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-medium py-3 rounded-xl transition-all shadow-md shadow-sky-500/10 flex items-center justify-center gap-2"
                >
                  <FiSend />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
