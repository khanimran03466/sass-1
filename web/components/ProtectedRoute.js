"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function ProtectedRoute({ children }) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Allow all pages to be viewed in "Guest Mode"
  // Authentication will now be enforced at the action level (e.g., clicking Pay)
  if (!isClient) return <div className="bg-dark min-h-screen"></div>;

  return children;
}
