"use client";

import { Bell, Dot } from "lucide-react";
import { useState } from "react";

export function Notification() {
  const [asNotifications, setAsNotifications] = useState(false);

  return (
    <div className='relative rounded-[100%] p-2 cursor-pointer hover:bg-stone-300/30'>
      {asNotifications && (
        <Dot
          className='absolute w-12 h-12 top-[-13px] left-0'
          color='#be0000'
        />
      )}
      <Bell className='w-5 h-5' />
    </div>
  );
}
