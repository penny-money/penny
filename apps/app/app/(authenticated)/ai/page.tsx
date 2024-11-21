import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { Input } from '@repo/design-system/components/ui/input';
import { Button } from '@repo/design-system/components/ui/button';

export default function Page() {
  return (
    <div className="space-y-6 p-8">
      <h1 className="font-bold text-3xl">Penny AI</h1>
      <Card>
        <CardHeader>
          <CardTitle>Chat with Penny</CardTitle>
          <CardDescription>Get personalized financial insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <p className="font-medium">Penny:</p>
              <p>Hello! How can I help you with your finances today?</p>
            </div>
            <div className="flex space-x-2">
              <Input placeholder="Type your message..." className="flex-1" />
              <Button>Send</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Financial Insight</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Based on your recent transactions, you've been spending 20% more on
            dining out compared to last month. Would you like some tips on how
            to reduce this expense?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
