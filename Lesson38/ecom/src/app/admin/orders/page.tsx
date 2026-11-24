import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Orders",
};

export default function AdminOrdersPage() {
  return (
    <main className="space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Orders
        </h1>
        <p className="text-sm text-muted-foreground">
          View and manage customer orders.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
          <CardDescription>
            Order management will be added in a future lesson.
          </CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
}
