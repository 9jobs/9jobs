"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { FadeIn, FadeUp, ScaleIn, Stagger, StaggerItem, MotionButton } from "./Motion";

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

    try {
      const response = await fetch("/api/contact", {
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
        message: "Thank you! Your message has been sent successfully. We will get back to you shortly.",
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
    <Stagger as="form" className="form-card card" onSubmit={handleSubmit}>
      <ScaleIn
        className="card-media"
        style={{
          backgroundImage:
            "url('/profession/success.png')",
        }}
      />
      
      <StaggerItem className="form-grid">
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
      </StaggerItem>

      <StaggerItem className="field">
        <span>Email address</span>
        <input
          required
          type="email"
          value={formData.email}
          onChange={(event) => updateField("email", event.target.value)}
        />
      </StaggerItem>

      <StaggerItem className="field">
        <span>Phone number</span>
        <input
          required
          type="tel"
          value={formData.phone}
          onChange={(event) => updateField("phone", event.target.value)}
        />
      </StaggerItem>

      <StaggerItem className="field">
        <span>Message</span>
        <textarea
          required
          value={formData.message}
          onChange={(event) => updateField("message", event.target.value)}
        />
      </StaggerItem>

      {status.message && (
        <FadeIn className={`status-message ${status.type}`}>{status.message}</FadeIn>
      )}

      <StaggerItem>
        <MotionButton
          className="btn btn-dark"
          type="submit"
          disabled={loading}
          style={{ width: '100%' }}
        >
          {loading ? "Sending" : "Send message"} <Send size={17} />
        </MotionButton>
      </StaggerItem>
    </Stagger>
  );
}
