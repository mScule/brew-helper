import { useQueryAllBrewers } from "@/react-query/hooks/brewer/use-query-all-brewers";
import { useQueryAllCoffee } from "@/react-query/hooks/coffee/use-query-all-coffee";
import { TypographyP } from "@/shadcn/typography/typography-p";
import { Button } from "@/shadcn/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { type Nullable } from "@/types/nullable";
import { Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";

export function CoffeeCalculator() {
  const brewers = useQueryAllBrewers();
  const coffee = useQueryAllCoffee();

  const [cups, setCups] = useState(0);

  const [selectedBrewerId, setSelectedBrewerId] =
    useState<Nullable<string>>(null);
  const [selectedCoffeeId, setSelectedCoffeeId] =
    useState<Nullable<string>>(null);

  const selectedBrewer = useMemo(() => {
    if (!brewers.data) {
      return null;
    }

    const selected = brewers.data.find(
      (brewer) => brewer.id === selectedBrewerId
    );

    if (!selected) {
      return null;
    }

    return selected;
  }, [brewers, selectedBrewerId]);

  const selectedCoffee = useMemo(() => {
    if (!coffee.data) {
      return null;
    }

    const selected = coffee.data.find(
      (coffee) => coffee.id === selectedCoffeeId
    );

    if (!selected) {
      return null;
    }

    return selected;
  }, [coffee, selectedCoffeeId]);

  const totalWater = useMemo<Nullable<number>>(() => {
    if (!selectedBrewer) {
      return null;
    }

    return selectedBrewer.cupInMillilitres * cups;
  }, [selectedBrewer, cups]);

  const gramsPerMl = useMemo<Nullable<number>>(() => {
    if (!selectedCoffee) {
      return null;
    }

    return (
      selectedCoffee.coffeeInGrams / (selectedCoffee.cupInMillilitres / 100)
    );
  }, [selectedCoffee]);

  const totalBeans = useMemo<Nullable<number>>(() => {
    if (!totalWater) {
      return null;
    }
    if (!gramsPerMl) {
      return null;
    }

    return gramsPerMl * (totalWater / 100);
  }, [totalWater, gramsPerMl]);

  return (
    <div className="flex flex-col gap-2">
      {brewers.data && (
        <>
          <TypographyP>Select a brewer</TypographyP>
          <Select onValueChange={(id) => setSelectedBrewerId(id)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a brewer" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Bewers</SelectLabel>
                {brewers.data.map((brewer) => (
                  <SelectItem key={brewer.id} value={brewer.id}>
                    {brewer.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </>
      )}
      {coffee.data && (
        <>
          <TypographyP>Select coffee</TypographyP>
          <Select onValueChange={(id) => setSelectedCoffeeId(id)}>
            <SelectTrigger>
              <SelectValue placeholder="Select coffee" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Coffee</SelectLabel>
                {coffee.data.map((coffee) => (
                  <SelectItem key={coffee.id} value={coffee.id}>
                    {coffee.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </>
      )}
      {selectedBrewer && selectedCoffee && (
        <>
          <TypographyP>How many cups you want to make?</TypographyP>
          <div className="flex flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setCups((cups) => cups - 1)}
            >
              <Minus />
            </Button>
            <TypographyP>{cups}</TypographyP>
            <Button
              variant="outline"
              onClick={() => setCups((cups) => cups + 1)}
            >
              <Plus />
            </Button>
          </div>
          {totalWater && (
            <TypographyP>
              Water: <b>{totalWater}ml</b>
            </TypographyP>
          )}
          {totalBeans && (
            <TypographyP>
              Beans: <b>{Math.round(totalBeans)}g</b>
            </TypographyP>
          )}
        </>
      )}
    </div>
  );
}
