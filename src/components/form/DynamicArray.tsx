import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  items: string[];
  onChange: (items: string[]) => void;
  label: string;
  placeholder?: string;
}

export default function DynamicArray({
  items,
  onChange,
  label,
  placeholder,
}: Props) {
  const addItem = () => {
    onChange([...items, ""]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={() => removeItem(index)}
            variant="ghost"
            className="text-destructive hover:text-destructive/90"
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={addItem}
        variant="link"
        className="text-muted-foreground hover:text-muted-foreground/90"
      >
        + Add Item
      </Button>
    </div>
  );
}
