import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { IceCream } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import IceCreamCard from "@/components/IceCreamCard";
import heroBanner from "@/assets/hero-banner.jpg";

const Index = () => {
  const [featuredIceCreams, setFeaturedIceCreams] = useState<IceCream[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedIceCreams();

    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "icecreams",
        },
        () => {
          fetchFeaturedIceCreams();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchFeaturedIceCreams = async () => {
    const { data, error } = await supabase
      .from("icecreams")
      .select("*")
      .eq("featured", true)
      .limit(4);

    if (!error && data) {
      setFeaturedIceCreams(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 border border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Premium Artisan Ice Cream
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Delicious Ice Creams,{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Anytime!
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Handcrafted with love, made from the finest ingredients. Every scoop is a moment of pure joy.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="shadow-glow">
                  <Link to="/catalog">
                    Explore Flavors
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-float">
              <img
                src={heroBanner}
                alt="Delicious ice cream cones"
                className="rounded-3xl shadow-elevated"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Featured Flavors</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Try our most popular ice cream flavors, loved by customers worldwide
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-96 bg-muted animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredIceCreams.map((icecream) => (
              <IceCreamCard key={icecream.id} icecream={icecream} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link to="/catalog">
              View All Flavors
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
