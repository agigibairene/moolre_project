import { useState } from "react";
import { toast } from "sonner";
import image from "../assets/sms.jpeg";


export default function SMSMessage() {
  const [formData, setFormData] = useState({
    recipient: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    recipient: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/proxy/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: 1,
          senderid: "seedlinq",
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      toast.success("Message sent successfully");
      console.log("SMS Response:", data);
      setFormData({ recipient: "", message: "" });
    } catch (error) {
      console.error("Error sending SMS:", error);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold text-blue-900 mb-4 text-center">
        Send SMS with Moolre
      </h1>

      <div className="overflow-hidden md:gap-20 grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl">
        <div className="flex items-center justify-center p-8">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Recipient Phone Number
              </label>
              <input
                type="text"
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
                placeholder="233501234567"
                className={`w-full px-4 py-2 border ${
                  errors.recipient ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 ${
                  errors.recipient
                    ? "focus:ring-red-400"
                    : "focus:ring-indigo-400"
                }`}
              />
              {errors.recipient && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.recipient}
                </p>
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
                  errors.message
                    ? "focus:ring-red-400"
                    : "focus:ring-indigo-400"
                }`}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center ${
                loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? (
                <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                      </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>

        <div className="hidden md:flex items-center justify-center bg-gray-100">
          <img
            src={image}
            alt="SMS illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
