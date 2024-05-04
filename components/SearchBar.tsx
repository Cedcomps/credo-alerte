import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { ErrorBoundary } from "./ErrorBoundary";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

type Suggestion = {
  id: string;
  title: string;
  url: string;
};

const suggestions: Suggestion[] = [
  {
    id: "1",
    title: "Page d'accueil",
    url: "/",
  },
  {
    id: "2",
    title: "À propos",
    url: "/about",
  },
  // Ajoutez d'autres suggestions ici
];

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <ErrorBoundary>
      <Button
        variant={"outline"}
        className="md:w-full lg:w-96 order-2 lg:order-1"
        onClick={() => setOpen(true)}
        >
        <div className="flex group items-center justify-between pl-1.5 md:pl-3 pr-1.5 w-full h-[32px] text-foreground-lighter ">
            <div className="flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <p className="hidden md:flex text-sm">Search...</p>
            </div>
            <div className="hidden md:flex items-center space-x-1">
            <div
                aria-hidden="true"
                className="md:flex items-center justify-center h-5 w-10 border rounded bg-surface-300 gap-1 bg-secondary"
            >
                <span className="text-[12px]">⌘</span>
                <span className="text-[12px]">K</span>
            </div>
            </div>
        </div>
        </Button>

      <Command>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput
            placeholder="Search..."
            value={inputValue}
            onValueChange={setInputValue}
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
          <CommandList>
            <CommandEmpty>Aucun résultat.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {filteredSuggestions.map((suggestion) => (
                <CommandItem
                  key={suggestion.id}
                  onSelect={() => {
                    setInputValue("");
                    router.push(suggestion.url);
                  }}
                >
                  {suggestion.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </Command>
    </ErrorBoundary>
  );
}
