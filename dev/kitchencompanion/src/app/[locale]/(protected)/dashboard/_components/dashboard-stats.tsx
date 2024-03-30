export function DashboardStats() {
  return (
    <>
      <div className='flex flex-col shadow-md min-h-[100px] rounded-sm border-2 p-6 sm:col-span-1 md:row-span-2'>
        <h1 className='m-auto text-xl font-semibold text-brand-dark tracking-tight sm:text-2xl'>
          Cuisines
        </h1>
        <p className='m-auto text-2xl sm:text-4xl md:text-7xl font-black'>5</p>
      </div>
      <div className='flex flex-col shadow-md min-h-[100px] rounded-sm border-2 p-6 sm:col-span-1 md:row-span-2'>
        <h1 className='m-auto text-xl font-semibold text-brand-dark tracking-tight sm:text-2xl'>
          Recettes
        </h1>

        <p className='m-auto text-2xl sm:text-4xl md:text-7xl font-black'>
          120
        </p>
      </div>
      <div className='flex flex-col shadow-md min-h-[100px] rounded-sm border-2 p-6 sm:col-span-1 md:row-span-2'>
        <h1 className='m-auto text-xl font-semibold text-brand-dark tracking-tight sm:text-2xl'>
          Menus
        </h1>
        <p className='m-auto text-2xl sm:text-4xl md:text-7xl font-black'>13</p>
      </div>
      <div className='flex flex-col shadow-md min-h-[100px] rounded-sm border-2 p-6 sm:col-span-1 md:row-span-2'>
        <h1 className='m-auto text-xl font-semibold text-brand-dark tracking-tight sm:text-2xl'>
          Employés
        </h1>
        <p className='m-auto text-2xl sm:text-4xl md:text-7xl font-black'>24</p>
      </div>
    </>
  );
}
