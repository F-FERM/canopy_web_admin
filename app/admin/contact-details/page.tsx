"use client";

import { useEffect, useState } from "react";
import { Mail, Eye, Trash2 } from "lucide-react";
import axiosInstance from "@/service/admin/axios";

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface ContactResponse {
  data: Contact[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export default function ContactListPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const res = await axiosInstance.get<ContactResponse>("/contacts/contact-submissions");

      setContacts(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this contact?"
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/contact/${id}`);

      setContacts((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete contact");
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await axiosInstance.patch(`/contact/${id}/read`);

      setContacts((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isRead: true } : item
        )
      );
    } catch (error) {
      console.error("Failed to update contact:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-10 w-10 rounded-full border-b-2 border-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Contact Messages
        </h1>

        <p className="text-gray-500">
          Manage customer contact inquiries.
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            {/* TABLE HEAD */}
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>

                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>

                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Subject
                </th>

                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Message
                </th>

                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>

                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>

               
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >

                    {/* NAME */}
                    <td className="p-4">
                      <div className="font-medium text-gray-800">
                        {item.name}
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={14} />
                        {item.email}
                      </div>
                    </td>

                    {/* SUBJECT */}
                    <td className="p-4 text-sm text-gray-700">
                      {item.subject}
                    </td>

                    {/* MESSAGE */}
                    <td className="p-4 text-sm text-gray-600 max-w-[300px]">
                      <p className="line-clamp-2">
                        {item.message}
                      </p>
                    </td>

                    {/* STATUS */}
                    <td className="p-4">
                      {item.isRead ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                          Read
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                          Unread
                        </span>
                      )}
                    </td>

                    {/* DATE */}
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    {/* ACTIONS */}
                   
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="p-10 text-center text-gray-500 italic"
                  >
                    No contact messages found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}