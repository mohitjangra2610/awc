'use client';

import { useRouter } from 'next/navigation';

export default function ScheduleCallButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.push("/contact")}
     className="px-6 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300"
    >
      Schedule a Call
    </button>
  );
}