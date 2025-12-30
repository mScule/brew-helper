import { useQueryAllBrewers } from "@/react-query/hooks/brewer/use-query-all-brewers";
import { TypographyLead } from "@/shadcn/typography/typography-lead";
import { Card, CardHeader } from "@/shadcn/ui/card";

export function BrewerList() {
  const brewers = useQueryAllBrewers();

  if (!brewers.data) {
    return <TypographyLead>No brewers</TypographyLead>;
  }

  return (
    <div className="flex flex-col gap-2">
      {brewers.data.map((brewer) => (
        <Card key={brewer.id}>
            <CardHeader>{brewer.name}</CardHeader>
        </Card>
      ))}
    </div>
  );
}
