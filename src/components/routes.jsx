import { useState } from "react";
import { toast } from "sonner";

export default function SMSMessage() {
  const [formData, setFormData] = useState({
    recipient: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    recipient: "",
    message: "",
  });

  function validate() {
    let valid = true;
    const newErrors = { recipient: "", message: "" };

    if (!formData.recipient.trim()) {
      newErrors.recipient = "Recipient phone number is required.";
      valid = false;
    } else if (!/^\d{10,15}$/.test(formData.recipient)) {
      newErrors.recipient = "Enter a valid phone number (10–15 digits).";
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch("/api/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: 1,
          senderid: "Moolre",
          messages: [
            {
              recipient: formData.recipient,
              message: formData.message,
            },
          ],
        }),
      });

      if (!response.ok) {
        toast.error("Failed to send message");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("SMS response:", data);

      toast.success("Message sent successfully");
      setFormData({ recipient: "", message: "" });
    } catch (error) {
      console.error("Error sending SMS:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Send a Message
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Recipient (Phone Number)
          </label>
          <input
            type="text"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            placeholder="e.g. 233501234567"
            className={`w-full px-4 py-2 border ${
              errors.recipient ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 ${
              errors.recipient ? "focus:ring-red-400" : "focus:ring-indigo-400"
            }`}
          />
          {errors.recipient && (
            <p className="text-red-500 text-sm mt-1">{errors.recipient}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message..."
            rows="4"
            className={`w-full px-4 py-2 border ${
              errors.message ? "border-red-500" : "border-gray-300"
            } rounded-lg resize-none focus:outline-none focus:ring-2 ${
              errors.message ? "focus:ring-red-400" : "focus:ring-indigo-400"
            }`}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
