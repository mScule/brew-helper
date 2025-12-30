import { useQueryAllCoffee } from "@/react-query/hooks/coffee/use-query-all-coffee";
import { TypographyLead } from "@/shadcn/typography/typography-lead";
import { Card, CardHeader } from "@/shadcn/ui/card";

export function CoffeeList() {
  const coffee = useQueryAllCoffee();

  if (!coffee.data) {
    return <TypographyLead>No coffee</TypographyLead>;
  }

  return (
    <div className="flex flex-col gap-2">
      {coffee.data.map((coffee) => (
        <Card key={coffee.id}>
            <CardHeader>{coffee.name}</CardHeader>
        </Card>
      ))}
    </div>
  );
}
