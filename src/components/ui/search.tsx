import { Input } from "@/components/ui/input";

interface SearchProps {
  find: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const Search: React.FC<SearchProps> = ({ find }) => {
  return (
    <Input
      type="text"
      placeholder="What are you looking for?"
      className="text-white decoration-solid shadow-lg"
      onChange={find}
    />
  );
};
