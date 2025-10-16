import { IceCream, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="rounded-full bg-gradient-primary p-2 shadow-soft">
              <IceCream className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
              Sweet Scoops
            </span>
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-primary fill-primary animate-pulse" /> for ice cream lovers
          </p>

          <p className="text-sm text-muted-foreground">
            © 2025 Sweet Scoops. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
