export function RecipeSteps({ recipeSteps }: { recipeSteps: string[] }) {
  return (
    <fieldset className='grid gap-6 rounded-lg border p-4'>
      <legend className='ml-1 px-1 text-sm font-medium'>
        <h2 className='font-bold text-xl'>Préparation</h2>
      </legend>
      <ul className='m-5'>
        {recipeSteps.map((step, index) => (
          <li
            className='flex gap-4'
            key={index}>
            <div>{index + 1}.</div>
            <div>{step}</div>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
