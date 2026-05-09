"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { fadeUp, hoverLift } from "../utils/animations";

const emptyForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  message: "",
};

export default function ContactForm({ initialMessage = "" }) {
  const [formData, setFormData] = useState(() => ({
    ...emptyForm,
    message: initialMessage,
  }));
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

    try {
      const response = await fetch(`${apiBase}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: data.success || "Message sent successfully.",
      });
      setFormData(emptyForm);
    } catch {
      setStatus({
        type: "error",
        message: "Unable to reach the server. Please try again shortly.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form className="form-card card" onSubmit={handleSubmit} {...fadeUp} {...hoverLift}>
      <motion.div
        className="card-media"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=900')",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      <div className="form-grid">
        <label className="field">
          <span>First name</span>
          <input
            required
            type="text"
            value={formData.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
          />
        </label>
        <label className="field">
          <span>Last name</span>
          <input
            type="text"
            value={formData.lastName}
            onChange={(event) => updateField("lastName", event.target.value)}
          />
        </label>
      </div>

      <label className="field">
        <span>Email address</span>
        <input
          required
          type="email"
          value={formData.email}
          onChange={(event) => updateField("email", event.target.value)}
        />
      </label>

      <label className="field">
        <span>Phone number</span>
        <input
          required
          type="tel"
          value={formData.phone}
          onChange={(event) => updateField("phone", event.target.value)}
        />
      </label>

      <label className="field">
        <span>Message</span>
        <textarea
          required
          value={formData.message}
          onChange={(event) => updateField("message", event.target.value)}
        />
      </label>

      {status.message && (
        <div className={`status-message ${status.type}`}>{status.message}</div>
      )}

      <motion.button
        className="btn btn-dark"
        type="submit"
        disabled={loading}
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {loading ? "Sending" : "Send message"} <Send size={17} />
      </motion.button>
    </motion.form>
  );
}
