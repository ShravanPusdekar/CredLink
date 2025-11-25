"use client"

import { Toaster } from "react-hot-toast"

import { useEffect } from "react";
import { toast } from "react-hot-toast";

export function ToastProvider() {
  // Disable all success notifications globally
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    (toast as any).success = () => {};
  }, []);

  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#10B981',
            secondary: '#fff',
          },
          style: {
            background: '#059669',
          },
        },
        error: {
          duration: 4000,
          iconTheme: {
            primary: '#EF4444',
            secondary: '#fff',
          },
          style: {
            background: '#dc2626',
          },
        },
      }}
    />
  )
}