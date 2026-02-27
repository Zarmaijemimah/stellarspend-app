# Component Documentation

## Shared Hooks

### `useForm`
A reusable wrapper around `react-hook-form` and `zod` for consistent form handling and validation.

#### Path
`hooks/useForm.ts`

#### Features
- **Type-safe**: Leverages Zod schema inference for full TypeScript support.
- **Easy Validation**: Seamless integration of Zod validation rules.
- **Consistent API**: Returns standard React Hook Form handlers and state.

#### Usage Example
```tsx
import { z } from 'zod';
import { useForm } from '@/hooks/useForm';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  amount: z.coerce.number().positive(),
});

type FormData = z.infer<typeof schema>;

export function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    schema,
    defaultValues: { email: '', amount: 0 }
  });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}
      
      <input type="number" {...register('amount')} />
      {errors.amount && <p>{errors.amount.message}</p>}
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Form Components

### `BudgetForm`
Located in `components/budgets/BudgetForm.tsx`. Used for creating and editing budgets.

### `GoalForm`
Located in `components/savings/GoalForm.tsx`. Used for setting savings goals with target amounts and deadlines.
