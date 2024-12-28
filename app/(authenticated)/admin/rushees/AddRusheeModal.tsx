"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addRusheeAction } from "@/actions/admin/rushee";

export default function AddRusheeModal() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await addRusheeAction(formData);

    router.refresh();

    setShowModal(false);
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Add Rushee
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add a Rushee</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-medium mb-1">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Optional"
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Optional"
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add Rushee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
