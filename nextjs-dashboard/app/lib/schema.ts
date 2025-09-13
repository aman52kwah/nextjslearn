// app/lib/schema.ts
import { pgTable, serial, text, integer, date } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  image_url: text('image_url'),
});

export const invoices = pgTable('invoices', {
  id: serial('id').primaryKey(),
customer_id: integer('customer_id').notNull().references(() => customers.id),
  amount: integer('amount').notNull(),
  status: text('status').notNull(),
  date: date('date').notNull(),
});

export const invoicesRelations = relations(invoices, ({ one }) => ({
  customer: one(customers, {
    fields: [invoices.customer_id],
    references: [customers.id],
  }),
}));

export const customersRelations = relations(customers, ({ many }) => ({
  invoices: many(invoices),
}));