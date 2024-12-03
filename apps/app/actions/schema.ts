import { z } from 'zod';

const type = [
  'BANK',
  'MOBILE_MONEY',
  'LOAN',
  'INVESTMENT',
  'CREDIT_CARD',
  'CASH',
] as const;

export const userSchema = z.object({
  id: z.union([z.string().cuid(), z.string().cuid2()]),
  clerkId: z.string(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export const accountSchema = z.object({
  id: z.union([z.string().cuid(), z.string().cuid2()]),
  userId: z.union([z.string().cuid(), z.string().cuid2()]),
  name: z.string().min(3),
  accountNumber: z.string().min(1),
  type: z.enum(type).default('CASH'),
  balance: z.coerce.number().min(0).default(0),
  currency: z.string().min(1).default('KES'),
  isActive: z.boolean().default(true),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export const createAccountSchema = accountSchema.omit({
  id: true,
  userId: true,
});

export const deleteAccountSchema = accountSchema.pick({
  id: true,
});

export const createTransactionSchema = z.object({
  accountId: z.string().min(1, 'Account is required'),
  amount: z.coerce.number().min(0, 'Amount must be positive'),
  type: z.enum(['INCOME', 'EXPENSE', 'TRANSFER']),
  description: z.string().min(1, 'Description is required'),
  date: z.date(),
  category: z.enum([
    'SALARY',
    'BUSINESS',
    'GIFT',
    'RENT',
    'UTILITIES',
    'GROCERIES',
    'DINING',
    'TRANSPORTATION',
    'HEALTHCARE',
    'EDUCATION',
    'ENTERTAINMENT',
    'SHOPPING',
    'SAVINGS',
    'INVESTMENT',
    'DEBT_PAYMENT',
    'OTHER',
  ]),
  status: z
    .enum(['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'])
    .default('PENDING'),
});
