export function RecipeCard({
  children,
  recipeName,
}: {
  children: React.ReactNode;
  recipeName: string;
}) {
  return (
    <fieldset className='grid gap-6 rounded-lg border p-4'>
      <legend className='ml-1 px-1 text-sm font-medium'>
        <h1 className='text-3xl font-bold'>{recipeName}</h1>
      </legend>
      {children}
    </fieldset>
  );
}
