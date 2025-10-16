import { IceCream } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

// Import all ice cream images
import vanillaImg from "@/assets/vanilla.jpg";
import strawberryImg from "@/assets/strawberry.jpg";
import chocolateImg from "@/assets/chocolate.jpg";
import mintImg from "@/assets/mint.jpg";
import caramelImg from "@/assets/caramel.jpg";
import pistachioImg from "@/assets/pistachio.jpg";
import mangoImg from "@/assets/mango.jpg";
import cookieImg from "@/assets/cookie.jpg";

const imageMap: Record<string, string> = {
  "Vanilla Dream": vanillaImg,
  "Strawberry Bliss": strawberryImg,
  "Chocolate Euphoria": chocolateImg,
  "Mint Chip Delight": mintImg,
  "Salted Caramel": caramelImg,
  "Pistachio Paradise": pistachioImg,
  "Mango Sorbet": mangoImg,
  "Cookie Dough": cookieImg,
};

interface IceCreamCardProps {
  icecream: IceCream;
}

const IceCreamCard = ({ icecream }: IceCreamCardProps) => {
  const { addToCart } = useCart();
  const imageUrl = icecream.image_url || imageMap[icecream.name] || vanillaImg;

  return (
    <Card className="group overflow-hidden bg-gradient-card border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300 animate-fade-in">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={imageUrl}
          alt={icecream.name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        {icecream.featured && (
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground shadow-glow">
            Featured
          </Badge>
        )}
        {icecream.stock === 0 && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1">{icecream.name}</h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
          {icecream.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${icecream.price.toFixed(2)}
          </span>
          {icecream.category && (
            <Badge variant="secondary">{icecream.category}</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full group-hover:shadow-glow transition-all"
          onClick={() => addToCart(icecream)}
          disabled={icecream.stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IceCreamCard;
