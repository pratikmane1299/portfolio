import { name } from "@/data";
import { getCurrentYear } from "@/utils";

function Footer() {
  return (
    <footer className="w-full">
      <div className="px-4 py-4 md:max-w-3xl md:mx-auto w-full text-center border-t border-border">
        <span className="text-xs font-medium tracking-wide text-muted-foreground">
          Copyright @{getCurrentYear()} {name}
        </span>
      </div>
    </footer>
  );
}

export default Footer;
