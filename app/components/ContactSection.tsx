"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import ScrollReveal from "./ScrollReveal";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "your_service_id",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "your_template_id",
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_email: "edehjohnpaul@gmail.com",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "your_public_key"
      );
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  const inputClass =
    "w-full px-5 py-3.5 rounded-lg border border-border text-foreground placeholder:text-muted-foreground text-sm focus:border-primary focus:outline-hidden transition-colors";
  const inputStyle = { background: "#080c14" };

  return (
    <section id="contact" className="py-24 px-4 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p
              className="text-primary text-sm tracking-widest uppercase mb-3"
              style={{ fontFamily: "monospace" }}
            >
              Get in touch
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Reach out to <span className="text-primary">Me!</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-base max-w-lg mx-auto">
              Let&apos;s connect and discuss how we can work together on your
              next project.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <form
            onSubmit={handleSubmit}
            className="space-y-5 p-6 lg:p-8 rounded-2xl border border-border"
            style={{ background: "#0d1526" }}
          >
            {status === "success" && (
              <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 text-green-400 px-5 py-4 rounded-lg text-sm">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Message sent! I&apos;ll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 px-5 py-4 rounded-lg text-sm">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Failed to send. Please email me directly at{" "}
                <a href="mailto:edehjohnpaul@gmail.com" className="underline">
                  edehjohnpaul@gmail.com
                </a>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                style={inputStyle}
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
                style={inputStyle}
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className={inputClass}
              style={inputStyle}
            />

            <textarea
              placeholder="Your Message"
              rows={6}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${inputClass} resize-none`}
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-3.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ boxShadow: "0 4px 20px rgba(59,130,246,0.25)" }}
            >
              {status === "sending" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
