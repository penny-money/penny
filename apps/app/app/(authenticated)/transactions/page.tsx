import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/design-system/components/ui/table';

const transactions = [
  {
    id: 1,
    date: '2023-05-01',
    description: 'Grocery Store',
    amount: -75.5,
    category: 'Food',
  },
  {
    id: 2,
    date: '2023-05-02',
    description: 'Salary Deposit',
    amount: 3000.0,
    category: 'Income',
  },
  {
    id: 3,
    date: '2023-05-03',
    description: 'Electric Bill',
    amount: -120.0,
    category: 'Utilities',
  },
];

export default function TransactionsPage() {
  return (
    <div className="space-y-6 p-8">
      <h1 className="font-bold text-3xl">Transactions</h1>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
