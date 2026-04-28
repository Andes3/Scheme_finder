import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import {
  INDIAN_STATES, type Category, type Gender, type Occupation, type SpecialStatus, type UserProfile,
} from "@/data/schemes";
import { toast } from "sonner";

interface Props {
  onSubmit: (profile: UserProfile) => void;
}

export function ProfileForm({ onSubmit }: Props) {
  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [state, setState] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [occupation, setOccupation] = useState<Occupation | "">("");
  const [specialStatus, setSpecialStatus] = useState<SpecialStatus>("None");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ageNum = parseInt(age, 10);
    const incomeNum = parseInt(income, 10);
    if (!ageNum || ageNum < 1 || ageNum > 120) return toast.error("Enter a valid age (1–120)");
    if (isNaN(incomeNum) || incomeNum < 0) return toast.error("Enter a valid annual income");
    if (!gender || !state || !category || !occupation) return toast.error("Please fill all fields");

    onSubmit({
      age: ageNum,
      income: incomeNum,
      gender, state, category, occupation, specialStatus,
    });
  };

  return (
    <Card className="border-border/60 shadow-[var(--shadow-card)]">
      <div className="h-1.5 bg-[var(--gradient-tricolor)]" />
      <CardHeader>
        <CardTitle className="font-display text-2xl text-india-navy">Tell us about yourself</CardTitle>
        <CardDescription>
          Your details stay private. We use them only to match you with schemes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" min={1} max={120} placeholder="e.g. 28"
              value={age} onChange={(e) => setAge(e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label>Gender</Label>
            <Select value={gender} onValueChange={(v) => setGender(v as Gender)}>
              <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label>State</Label>
            <Select value={state} onValueChange={setState}>
              <SelectTrigger><SelectValue placeholder="Select your state" /></SelectTrigger>
              <SelectContent className="max-h-72">
                {INDIAN_STATES.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="income">Annual income (₹)</Label>
            <Input id="income" type="number" min={0} placeholder="e.g. 180000"
              value={income} onChange={(e) => setIncome(e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="OBC">OBC</SelectItem>
                <SelectItem value="SC">SC</SelectItem>
                <SelectItem value="ST">ST</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Occupation</Label>
            <Select value={occupation} onValueChange={(v) => setOccupation(v as Occupation)}>
              <SelectTrigger><SelectValue placeholder="Select occupation" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Farmer">Farmer</SelectItem>
                <SelectItem value="Employee">Employee</SelectItem>
                <SelectItem value="Unemployed">Unemployed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Special status</Label>
            <Select value={specialStatus} onValueChange={(v) => setSpecialStatus(v as SpecialStatus)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="None">None</SelectItem>
                <SelectItem value="Disabled">Disabled</SelectItem>
                <SelectItem value="Widow">Widow</SelectItem>
                <SelectItem value="Senior Citizen">Senior Citizen</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            size="lg"
            className="mt-2 sm:col-span-2 bg-india-navy text-primary-foreground hover:bg-india-navy/90"
          >
            <Search className="mr-2 h-4 w-4" />
            Find My Schemes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
