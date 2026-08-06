"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { submitInquiry, extractErrorMessage } from "@/lib/supabase";
import { SiteSettings, Category, SubCategory } from "@/lib/types";
import SafeImage from "@/components/SafeImage";
import { FiArrowRight, FiSend, FiMessageCircle } from "react-icons/fi";
import Toast, { ToastMessage } from "@/components/Toast";

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
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    try {
      const res = await submitInquiry({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        category: data.category,
        message: data.message,
      });

      if (!res.success) {
        const errorMsg = res.error?.message || "Failed to submit inquiry";
        console.error("Supabase Error details:", res.error);
        setToast({
          type: "error",
          title: "Submission Error",
          message: errorMsg,
        });
        return;
      }

      setToast({
        type: "success",
        title: "Inquiry Sent!",
        message:
          "Thank you! Your inquiry has been sent successfully. Our team will contact you shortly.",
      });
      reset();
    } catch (err) {
      const errorMsg = extractErrorMessage(err);
      console.error("Submission catch error:", err);
      setToast({
        type: "error",
        title: "Submission Failed",
        message: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const cleanPhone = settings.phone.replace(/\s+/g, "").replace("+", "");

  return (
    <div className="flex flex-col bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-100/80 via-slate-50 to-slate-50 dark:from-sky-950/20 dark:via-neutral-950 dark:to-neutral-950 z-0"></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block max-w-full px-3.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider sm:tracking-widest text-sky-700 dark:text-sky-400 bg-sky-500/10 border border-sky-500/20 rounded-xl sm:rounded-full text-balance leading-snug">
              {settings.logo_text} Architectural & Composite Fabricators
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {settings.logo_text} Custom Glass, <br className="hidden sm:inline" />
            Aluminum & Fiber Solutions
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-slate-600 dark:text-neutral-400 max-w-3xl mx-auto font-light leading-relaxed text-balance"
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
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 dark:bg-neutral-900 border border-slate-200 dark:border-white/10 dark:hover:bg-neutral-800 dark:text-neutral-200 font-medium transition-all shadow-xs"
            >
              Contact Sales
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section
        id="categories"
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-slate-200 dark:border-white/5"
      >
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Browse Services
          </h2>
          <p className="text-slate-600 dark:text-neutral-400">
            We deliver state-of-the-art aluminum windows, custom fiber kitchens, and premium sliding
            mosquito protection screens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative rounded-xl overflow-hidden border border-slate-200 dark:border-white/5 bg-white dark:bg-neutral-900 shadow-md hover:shadow-xl hover:border-sky-500/30 flex flex-col transition-all duration-300"
            >
              {/* Compact Image Banner */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100 dark:bg-neutral-950">
                <SafeImage
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <span className="absolute top-3 left-3 inline-block text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-white bg-slate-950/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 shadow-xs">
                  {settings.logo_text} Service
                </span>
              </div>

              {/* Compact Body Container */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors flex items-center gap-2">
                    <span>{category.name}</span>
                    <FiArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-sky-600 dark:text-sky-400 text-lg" />
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                  <div className="pt-1.5 flex flex-wrap gap-1.5">
                    {category.subcategories &&
                      category.subcategories.map((sub: SubCategory) => (
                        <span
                          key={sub.id}
                          className="text-[11px] text-slate-700 dark:text-neutral-300 bg-slate-100 dark:bg-neutral-800 border border-slate-200/80 dark:border-white/5 px-2.5 py-0.5 rounded-md font-medium"
                        >
                          {sub.name}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-white/5">
                  <Link
                    href={`/category/${category.id}`}
                    className="inline-flex items-center gap-1.5 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 text-xs sm:text-sm font-semibold transition-colors"
                  >
                    <span>View Service Catalogue</span>
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Inquiry and Contact section */}
      <section
        id="contact"
        className="py-24 bg-slate-100/80 dark:bg-neutral-900/30 border-t border-slate-200 dark:border-white/5 w-full transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Context Details */}
            <div className="space-y-8 flex flex-col justify-center">
              <span className="inline-block max-w-full px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider sm:tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full self-start">
                Quick Support & Inquiries
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Let&apos;s Build Your Project Together
              </h2>
              <p className="text-slate-600 dark:text-neutral-400 leading-relaxed text-lg">
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
            <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/5 rounded-2xl p-5 sm:p-8 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 dark:bg-sky-500/5 rounded-full blur-2xl"></div>

              <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
                Quick Inquiry Form
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-neutral-400 uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Enter your full name"
                    className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-neutral-600"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-neutral-400 uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      {...register("phone")}
                      placeholder={`e.g. ${settings.phone}`}
                      className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-neutral-600"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-neutral-400 uppercase tracking-wider mb-2">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="e.g. name@domain.com"
                      className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-neutral-600"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-neutral-400 uppercase tracking-wider mb-2">
                    Service Category Interested In
                  </label>
                  <select
                    {...register("category")}
                    className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-neutral-300 text-sm focus:outline-none focus:border-sky-500 transition-colors"
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
                  <label className="block text-xs font-medium text-slate-600 dark:text-neutral-400 uppercase tracking-wider mb-2">
                    Project Brief / Inquiry Details
                  </label>
                  <textarea
                    rows={4}
                    {...register("message")}
                    placeholder="Provide details on dimensions, requirements, or custom configurations..."
                    className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500 transition-colors resize-none placeholder:text-slate-400 dark:placeholder:text-neutral-600"
                  ></textarea>
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-medium py-3 rounded-xl transition-all shadow-md shadow-sky-500/10 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <FiSend />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
