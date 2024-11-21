import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { Progress } from '@repo/design-system/components/ui/progress';

const budgets = [
  { id: 1, name: 'Groceries', spent: 350, total: 500, type: 'Recurring' },
  { id: 2, name: 'Entertainment', spent: 150, total: 200, type: 'Fixed' },
  { id: 3, name: 'Savings', spent: 1000, total: 1000, type: 'Target' },
];

export default function BudgetsPage() {
  return (
    <div className="space-y-6 p-8">
      <h1 className="font-bold text-3xl">Budgets</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => (
          <Card key={budget.id}>
            <CardHeader>
              <CardTitle>{budget.name}</CardTitle>
              <CardDescription>{budget.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress
                value={(budget.spent / budget.total) * 100}
                className="mb-2"
              />
              <p className="text-muted-foreground text-sm">
                ${budget.spent} / ${budget.total}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
