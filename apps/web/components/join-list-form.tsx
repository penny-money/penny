import { Button } from "@penny/ui/components/ui/button";
import { Input } from "@penny/ui/components/ui/input";

export const JoinListForm: React.FC = () => {
  return (
    <form className="flex flex-col md:flex-row md:items-center gap-3">
      <Input type="email" placeholder="email@yako.com" />
      <Button type="submit">Join the waitlist</Button>
    </form>
  );
};
