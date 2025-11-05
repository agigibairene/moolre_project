import { useState } from "react";
import transaction from "../assets/transaction.jpeg";
import { toast } from "sonner";

export default function Transaction() {
  const [formData, setFormData] = useState({
    type: 1,
    channel: 1,
    currency: "GHS",
    amount: "",
    receiver: "",
    accountnumber: "",
    externalref: "",
  });

  const [errors, setErrors] = useState({});
  const [validationData, setValidationData] = useState(null);
  const [isValidated, setIsValidated] = useState(false);
  const [loadingValidate, setLoadingValidate] = useState(false);
  const [loadingTransfer, setLoadingTransfer] = useState(false);
  const [showRecipientName, setShowRecipientName] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateFields = (fields) => {
    const newErrors = {};

    if (fields.includes("receiver") && !formData.receiver.trim()) {
      newErrors.receiver = "Receiver phone number is required.";
    } else if (
      fields.includes("receiver") &&
      !/^\d{10,13}$/.test(formData.receiver)
    ) {
      newErrors.receiver = "Enter a valid phone number (10–13 digits).";
    }

    if (fields.includes("accountnumber") && !formData.accountnumber.trim()) {
      newErrors.accountnumber = "Account number is required.";
    }

    if (fields.includes("amount")) {
      if (!formData.amount.trim()) newErrors.amount = "Amount is required.";
      else if (Number(formData.amount) <= 0)
        newErrors.amount = "Amount must be greater than zero.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleValidate = async (e) => {
    e.preventDefault();
    if (!validateFields(["receiver", "accountnumber"])) {
      toast.error("Please fix the validation errors before proceeding.");
      return;
    }

    setLoadingValidate(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/validate/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: 1,
          receiver: formData.receiver,
          channel: 1,
          currency: "GHS",
          accountnumber: formData.accountnumber,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Validation failed");

      setValidationData(data);
      setIsValidated(true);
      setShowRecipientName(true);

      setTimeout(() => setShowRecipientName(false), 60000);

      toast.success("Account validated successfully!");
    } catch (err) {
      console.error("Validation Error:", err);
      toast.error("Failed to validate account.");
    } finally {
      setLoadingValidate(false);
    }
  };

  const handleTransfer = async () => {
    if (!isValidated) {
      toast.error("Please validate the account before transferring.");
      return;
    }

    if (!validateFields(["amount"])) {
      toast.error("Please fix the validation errors before proceeding.");
      return;
    }

    setLoadingTransfer(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/transact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          externalref: formData.externalref || Date.now().toString(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Transfer failed");

      toast.success("💸 Transfer successful!");
    } catch (err) {
      console.error("Transfer Error:", err);
      toast.error("Failed to complete transfer.");
    } finally {
      setLoadingTransfer(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">
        Make a Transaction💸 with Moolre
      </h1>

      <div className="overflow-hidden grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl">
        <div className="flex items-center justify-center bg-gray-100">
          <img
            src={transaction}
            alt="Transaction illustration"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center justify-center px-8">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6 text-center">
              {isValidated ? "Make your transaction" : "Account Validation"}
            </h2>

            {!isValidated && (
              <form onSubmit={handleValidate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Receiver Phone Number
                  </label>
                  <input
                    type="text"
                    name="receiver"
                    value={formData.receiver}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-2 focus:ring-2 focus:outline-none ${
                      errors.receiver
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-indigo-400"
                    }`}
                  />
                  {errors.receiver && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.receiver}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Account Number
                  </label>
                  <input
                    type="text"
                    name="accountnumber"
                    value={formData.accountnumber}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-2 focus:ring-2 focus:outline-none ${
                      errors.accountnumber
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-indigo-400"
                    }`}
                  />
                  {errors.accountnumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.accountnumber}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loadingValidate}
                  className={`w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 rounded-lg transition duration-200 flex items-center justify-center ${
                    loadingValidate
                      ? "opacity-70 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {loadingValidate ? (
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
                      Validating...
                    </>
                  ) : (
                    "Validate Account"
                  )}
                </button>
              </form>
            )}

            {showRecipientName && validationData?.recipient_name && (
              <div className="mt-4 bg-blue-50 border border-blue-200 text-blue-900 p-3 rounded-lg text-center transition-opacity duration-500">
                <p className="font-semibold">Recipient:</p>
                <p className="text-lg">{validationData.recipient_name}</p>
              </div>
            )}

            {/* Transaction Form */}
            {isValidated && (
              <div className="space-y-4 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Amount (GHS)
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-2 focus:ring-2 focus:outline-none ${
                      errors.amount
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-indigo-400"
                    }`}
                  />
                  {errors.amount && (
                    <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    External Ref
                  </label>
                  <input
                    type="text"
                    name="externalref"
                    value={formData.externalref}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleTransfer}
                  disabled={loadingTransfer}
                  className={`w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 rounded-lg transition duration-200 flex items-center justify-center ${
                    loadingTransfer
                      ? "opacity-70 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {loadingTransfer ? (
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
                      Processing...
                    </>
                  ) : (
                    "Proceed with Transfer"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
