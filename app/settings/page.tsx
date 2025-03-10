import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getSettings } from "../lib/user_settings";
import { updateSettings } from "../lib/user_settings";

export default async function Settings() {
  const settings = await getSettings();

  const { caffeine_limit } = settings;

  return (
    <div className="w-full h-full flex flex-row justify-center pr-10">
      <form
        action={updateSettings}
        className="w-[600px] h-screen flex-col flex border-x-2 overflow-y-scroll border-primary no-scrollbar pt-10 px-4"
      >
        <h1 className="text-3xl py-4">Settings</h1>
        <div className="rounded bg-[#ece0d1] p-4 h-auto w-full flex flex-col">
          <div className="flex flex-row items-center justify-between">
            <Label htmlFor="caffeineLimit" className="text-lg">
              Caffeine Daily Limit
            </Label>
            <div className="flex flex-row items-center space-x-1">
              <Input
                name="caffeineLimit"
                defaultValue={caffeine_limit}
                type="number"
                id="caffeineLimit"
                min="0"
                className="w-20 border-black/50"
              />
              <span>mg</span>
            </div>
          </div>
          <p className="text-xs text-primary">
            Current Limit: {caffeine_limit} mg
          </p>
          <p className="text-xs text-primary/75">
            The FDA recommends a daily limit of 400 mg of caffeine.
          </p>
        </div>
        <Button type="submit" className="w-fit m-4 ml-auto">
          Save Changes
        </Button>
      </form>
      <div className="flex-1"></div>
    </div>
  );
}
