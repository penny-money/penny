import { z } from 'zod';

const type = [
  'BANK',
  'MOBILE_MONEY',
  'LOAN',
  'INVESTMENT',
  'CREDIT_CARD',
  'CASH',
] as const;

const CATEGORY = [
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
] as const;

const BUDGET_CATEGORY = [
  'HOUSING',
  'TRANSPORTATION',
  'FOOD',
  'UTILITIES',
  'HEALTHCARE',
  'SAVINGS',
  'DEBT',
  'ENTERTAINMENT',
  'EDUCATION',
  'SHOPPING',
  'OTHER',
] as const;

const timeStamps = {
  updatedAt: true,
  createdAt: true,
} as const;

export const userSchema = z.object({
  id: z.string().cuid(),
  clerkId: z.string(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export const accountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
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
  ...timeStamps,
});

export const createTransactionSchema = z.object({
  accountId: z.string().min(1, 'Account is required'),
  amount: z.number().min(0, 'Amount must be positive'),
  type: z.enum(['INCOME', 'EXPENSE', 'TRANSFER']),
  description: z.string().min(1, 'Description is required'),
  date: z.date(),
  category: z.enum(CATEGORY),
  status: z
    .enum(['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'])
    .default('PENDING'),
});

export const PERIOD = [
  'DAILY',
  'WEEKLY',
  'MONTHLY',
  'QUARTERLY',
  'YEARLY',
] as const;

export const budgetSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  accountId: z.string().cuid().optional(), // For budgets linked to an account, like a loan/savings goal

  name: z.string().min(3),
  description: z.string().optional(),

  // amounts
  targetAmount: z.coerce.number().int(),
  assignedAmount: z.coerce.number().int().default(0),
  spentAmount: z.coerce.number().int().default(0),

  // dates
  startDate: z.date().default(new Date()),
  endDate: z.date().optional(),

  // recurrence
  isRecurring: z.boolean().default(true),
  recurringPeriod: z.enum(PERIOD).default('MONTHLY'),
  recurringFrequency: z.number().int().default(1),
  nextRecurrance: z.date().optional(),

  //category
  category: z.enum(BUDGET_CATEGORY),

  // record timestamps
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export const createBudgetSchema = budgetSchema.omit({
  id: true,
  userId: true,
  ...timeStamps,
});
