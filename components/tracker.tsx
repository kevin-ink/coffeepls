"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { updateUserCaffeine, getUserCaffeine } from "@/app/lib/data";

export default function Tracker() {
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [drink, setDrink] = useState("");
  const [amount, setAmount] = useState(0);
  const [caffeine, setCaffeine] = useState(0);
  const [items, setItems] = useState(0);
  const [totalCaffeine, setTotalCaffeine] = useState(0);
  const goal = 400;

  const handleAddItem = async () => {
    const res = await updateUserCaffeine(caffeine, date);

    if (res) {
      setItems(res.items);
      setTotalCaffeine(res.caffeine);
      setDrink("");
      setAmount(0);
      setCaffeine(0);
    } else {
      console.error("Failed to update caffeine");
      setDrink("");
      setAmount(0);
      setCaffeine(0);
    }
  };

  useEffect(() => {
    if (drink && amount > 0) {
      setCaffeine(calculateCaffeine(drink as DrinkType, amount));
    }
  }, [drink, amount]);

  useEffect(() => {
    async function fetchData() {
      const res = await getUserCaffeine(date);

      if (res) {
        setItems(res.items);
        setTotalCaffeine(res.caffeine);
      }
    }

    fetchData();
  });

  return (
    <div className="w-fit max-w-[400px] h-full hidden lg:flex p-4 lg:flex-col items-center ">
      <Card>
        <CardHeader>
          <CardTitle>Daily Caffeine</CardTitle>
          <CardDescription>{date}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            <span
              className={`font-bold pr-1 ${
                totalCaffeine > goal ? `text-red-500` : ""
              }`}
            >
              {totalCaffeine}
            </span>
            mg consumed today
          </p>
          <p>
            <span className="font-bold">{items}</span> drinks
          </p>
          <p className="text-sm">
            Your goal is to stay under{" "}
            <span className="font-bold pr-1">{goal}</span>mg.
          </p>
        </CardContent>
        <div className="w-full border-2"></div>
        <CardFooter className="py-2 flex flex-col gap-y-2 items-start">
          <h1 className="font-semibold">Add an Item</h1>
          <div className="flex flex-row gap-x-2 items-center text-sm">
            Drink
            <Select value={drink} onValueChange={setDrink}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coffee">Coffee</SelectItem>
                <SelectItem value="espresso">Espresso</SelectItem>
                <SelectItem value="decaf">Decaf Coffee</SelectItem>
                <SelectItem value="americano">Americano</SelectItem>
                <SelectItem value="latte">Latte Macchiato</SelectItem>
                <SelectItem value="cappuccino">Cappuccino</SelectItem>
                <SelectItem value="cold">Cold Brew</SelectItem>
                <SelectItem value="instant">Instant Coffee</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row gap-x-2 items-center text-sm">
            <Label htmlFor="oz">Amount</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                setAmount(value === "" ? 0 : Number(value));
              }}
              id="oz"
              min="0"
              className="w-20"
            />
            fl oz
          </div>
          <div className="flex flex-row gap-x-2 items-center text-sm">
            <Label htmlFor="oz" className="w-fit text-nowrap">
              Caffeine
            </Label>
            <Input
              type="number"
              id="oz"
              min="0"
              className="w-20"
              value={caffeine}
              onChange={(e) => {
                const value = e.target.value;
                setCaffeine(value === "" ? 0 : Number(value));
              }}
            />
            mg
          </div>
          <p className="text-xs text-primary">
            Suggested caffeine amounts are based on information taken from the
            FDA. Adjust to your own needs.
          </p>
          <Button className="ml-auto" onClick={handleAddItem}>
            Add Item
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

const caffeineContent = {
  coffee: 12,
  espresso: 8,
  decaf: 0.25,
  americano: 8,
  latte: 8,
  cappuccino: 8,
  cold: 13,
  instant: 15,
};

type DrinkType = keyof typeof caffeineContent;

function calculateCaffeine(drink: DrinkType, amount: number) {
  // returns caffeine per fl oz
  return caffeineContent[drink] * amount;
}
