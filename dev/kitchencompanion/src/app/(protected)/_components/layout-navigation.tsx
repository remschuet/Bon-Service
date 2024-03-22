import Link from "next/link";

export function LayoutNavigation() {
  return (
    <nav className='flex flex-col min-w-12 h-screen border-r-2'>
      <div className='flex items-center justify-center h-16'>
        <h1>Dashboard</h1>
      </div>
      <ul className='flex flex-col p-4 space-y-2'>
        <li>
          <Link href='/dashboard'>
            <p>Dashboard</p>
          </Link>
        </li>
        <li>
          <Link href='/dashboard/settings'>
            <p>Settings</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
