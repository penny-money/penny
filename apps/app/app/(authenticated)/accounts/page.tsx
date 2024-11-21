import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';

export default function AccountsPage() {
  return (
    <div className="space-y-6 p-8">
      <h1 className="font-bold text-3xl">Accounts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Checking Account</CardTitle>
            <CardDescription>Synced</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl">$5,432.10</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Savings Account</CardTitle>
            <CardDescription>Synced</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl">$10,000.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Credit Card</CardTitle>
            <CardDescription>Manual</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl">-$1,234.56</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
