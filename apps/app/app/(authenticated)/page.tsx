import { Button } from '@repo/design-system/components/ui/button';
import { Link } from 'lucide-react';
import type { Metadata } from 'next';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';

const title = 'Penny - Your Personal Finance OS';
const description = 'AI-powered personal finance tracking and insights';

export const metadata: Metadata = {
  title,
  description,
};

const App = () => {
  return (
    <div className="grid gap-6 p-8 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Balance</CardTitle>
          <CardDescription>Across all accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-3xl">$12,345.67</p>
          <Link href="/accounts">
            <Button className="mt-4">View Accounts</Button>
          </Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-3xl">152</p>
          <Link href="/transactions">
            <Button className="mt-4">View Transactions</Button>
          </Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
          <CardDescription>This month</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-3xl">75% on track</p>
          <Link href="/budgets">
            <Button className="mt-4">View Budgets</Button>
          </Link>
        </CardContent>
      </Card>
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Penny AI Insights</CardTitle>
          <CardDescription>Your financial assistant</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Based on your recent spending, you could save an extra $200 this
            month by reducing dining out expenses.
          </p>
          <Link href="/penny-ai">
            <Button>Chat with Penny AI</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
