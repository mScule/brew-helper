import { BrewerList } from "@/components/brewer-list";
import { CoffeeCalculator } from "@/components/coffee-calculator";
import { CoffeeList } from "@/components/coffee-list";
import { BrewerCreationForm } from "@/components/forms/brewer-creation-form";
import { CoffeeCreationForm } from "@/components/forms/coffee-creation-form";
import { Logo } from "@/components/logo";
import { TypographyH2 } from "@/shadcn/typography/typography-h2";
import { Tabs, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

export function Index() {
  return (
    <main className="flex flex-col items-center gap-5 py-4">
      <Logo />
      <Tabs defaultValue="main">
        <TabsList>
          <TabsTrigger value="main">Brew</TabsTrigger>
          <TabsTrigger value="brewers">Brewers</TabsTrigger>
          <TabsTrigger value="coffee">Coffee</TabsTrigger>
        </TabsList>

        <TabsContent value="main">
          <div className="flex flex-col gap-2 w-full max-w-2xl">
            <div className="flex flex-row gap-2">
              <TypographyH2>Brew</TypographyH2>
            </div>
            <CoffeeCalculator />
          </div>
        </TabsContent>

        <TabsContent value="brewers">
          <div className="flex flex-col gap-2 w-full max-w-2xl">
            <div className="flex flex-row gap-5">
              <TypographyH2>Brewers</TypographyH2>
              <BrewerCreationForm />
            </div>
            <BrewerList />
          </div>
        </TabsContent>

        <TabsContent value="coffee">
          <div className="flex flex-col gap-2 w-full max-w-2xl">
            <div className="flex flex-row gap-5">
              <TypographyH2>Coffee</TypographyH2>
              <CoffeeCreationForm />
            </div>
            <CoffeeList />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
