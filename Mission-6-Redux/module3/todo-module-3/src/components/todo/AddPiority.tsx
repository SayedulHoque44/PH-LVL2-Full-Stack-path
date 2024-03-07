import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
//
// type TTAddPiority = {
//   setPiority: typeof React.useState;
//   piority: typeof React.useState;
// };
//
const AddPiority = ({ setPiority, piority }) => {
  //   const [position, setPosition] = React.useState("high");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-primary-gradient text-xl font-semibold text-white">
          Piority
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>filter by piority</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={piority} onValueChange={setPiority}>
          <DropdownMenuRadioItem value="high">high</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="medium">medium</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="low">low</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddPiority;
