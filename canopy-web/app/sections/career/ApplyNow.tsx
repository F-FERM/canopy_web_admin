"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { z } from "zod";
import { X, Upload, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { SubmitJobApplicationApi } from "@/app/api/JobApplication";
import { fileUpload } from "@/app/api/api";
import Button from "@/app/components/ui/Button";

// ================= ZOD SCHEMA =================
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const jobApplicationSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  file: z
    .instanceof(File, { message: "Please upload your CV" })
    .refine((f) => f.size <= MAX_FILE_SIZE, "File size must be less than 5MB")
    .refine(
      (f) => ACCEPTED_FILE_TYPES.includes(f.type),
      "Only PDF, DOC, or DOCX files are accepted"
    ),
});

export const ApplyNow = ({ 
  jobTitle, 
  jobId, 
  buttonLabel = "Apply Now",
  buttonClassName = ""
}: { 
  jobTitle?: string; 
  jobId: string;
  buttonLabel?: string;
  buttonClassName?: string;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; file?: string }>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ================= MUTATIONS =================
  const mutation = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error("Please upload your CV.");

      // STEP 1: Upload file
      const uploadRes = await fileUpload(file);
      const cvUrl = uploadRes.url;

      // STEP 2: Send application
      return await SubmitJobApplicationApi({
        name,
        email,
        cvUrl,
        jobId: jobId,
      });
    },
    onSuccess: () => {
      setSuccess(true);
      toast.success("Application submitted successfully!");
      setTimeout(() => {
        closeModal();
      }, 2000);
    },
    onError: (err: any) => {
      console.error(err);
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  // ================= OPEN / CLOSE =================
  const openModal = () => {
    setShowModal(true);
    setFile(null);
    setName("");
    setEmail("");
    setErrors({});
    setSuccess(false);
    mutation.reset();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // ================= SUBMIT =================
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = jobApplicationSchema.safeParse({ name, email, file });

    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    mutation.mutate();
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <>
      {/* ================= TRIGGER BUTTON ================= */}
      <Button
        label={buttonLabel}
        onClick={openModal}
        className={buttonClassName}
        variant="primary"
      />

      {/* ================= MODAL ================= */}
      {showModal && mounted && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="relative bg-[#F6FBFF] w-full max-w-lg rounded-[30px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">

            {/* Header */}
            <div className="bg-[#7F220E] p-8 text-white relative">
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 cursor-pointer w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
              >
                <X size={20} />
              </button>

              <h3 className="text-3xl font-bold tracking-tight text-white">
                {jobTitle ? `Apply for ${jobTitle}` : "Join Our Team"}
              </h3>
              <p className="text-white/80 mt-2 font-medium">
                Fill in your details and upload your CV
              </p>
            </div>

            {/* Body */}
            <div className="p-8">
              {success ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center animate-in slide-in-from-bottom-4 duration-500">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <CheckCircle2 size={48} />
                  </div>
                  <h4 className="text-2xl font-bold text-[#1f242b]">Submission Successful!</h4>
                  <p className="text-gray-500 max-w-xs">
                    Your application has been received. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#1f242b] ml-1">
                      Full Name<span className="text-red-500 pl-1">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      className="w-full bg-white border-2 border-gray-100 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#7F220E] transition-all duration-200 text-black"
                    />
                    {errors.name && <p className="text-red-500 text-xs ml-1 mt-1">{errors.name}</p>}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#1f242b] ml-1">
                      Email Address<span className="text-red-500 pl-1">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      className="w-full bg-white border-2 border-gray-100 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#7F220E] transition-all duration-200 text-black"
                    />
                    {errors.email && <p className="text-red-500 text-xs ml-1 mt-1">{errors.email}</p>}
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#1f242b] ml-1">
                      Upload CV (PDF, DOCX)<span className="text-red-500 pl-1">*</span>
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`cursor-pointer border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-200 bg-white
                        ${file ? "border-green-400 bg-green-50/30" : "border-gray-200 hover:border-[#7F220E] hover:bg-gray-50"}`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const selectedFile = e.target.files?.[0] || null;
                          setFile(selectedFile);
                          if (errors.file) setErrors((prev) => ({ ...prev, file: undefined }));
                        }}
                      />

                      {file ? (
                        <>
                          <CheckCircle2 className="text-green-500 mb-2" size={28} />
                          <p className="text-sm font-medium text-green-700">{file.name}</p>
                          <p className="text-xs text-green-600/70 mt-1 text-center">Click to change file</p>
                        </>
                      ) : (
                        <>
                          <Upload className="text-gray-400 mb-2" size={28} />
                          <p className="text-sm font-medium text-gray-600">
                            Click to upload or drag & drop
                          </p>
                          <p className="text-xs text-gray-400 mt-1">Maximum file size: 5MB</p>
                        </>
                      )}
                    </div>
                    {errors.file && <p className="text-red-500 text-xs ml-1">{errors.file}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    disabled={mutation.isPending}
                    type="submit"
                    className="w-full group cursor-pointer relative flex items-center justify-center gap-3 bg-[#7F220E] text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-[#f8d11a] hover:text-[#7F220E] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-[#f8d11a]/20"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Send size={18} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};