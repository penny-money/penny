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
});
