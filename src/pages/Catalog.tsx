import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { IceCream } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import IceCreamCard from "@/components/IceCreamCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Catalog = () => {
  const [iceCreams, setIceCreams] = useState<IceCream[]>([]);
  const [filteredIceCreams, setFilteredIceCreams] = useState<IceCream[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    fetchIceCreams();

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
          fetchIceCreams();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    filterIceCreams();
  }, [searchQuery, categoryFilter, iceCreams]);

  const fetchIceCreams = async () => {
    const { data, error } = await supabase
      .from("icecreams")
      .select("*")
      .order("name");

    if (!error && data) {
      setIceCreams(data);
    }
    setLoading(false);
  };

  const filterIceCreams = () => {
    let filtered = iceCreams;

    if (searchQuery) {
      filtered = filtered.filter(
        (ic) =>
          ic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ic.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((ic) => ic.category === categoryFilter);
    }

    setFilteredIceCreams(filtered);
  };

  const categories = Array.from(
    new Set(iceCreams.map((ic) => ic.category).filter(Boolean))
  );

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Ice Cream Catalog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover all our delicious flavors
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search flavors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category!}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-96 bg-muted animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : filteredIceCreams.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No ice creams found matching your criteria
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredIceCreams.map((icecream) => (
              <IceCreamCard key={icecream.id} icecream={icecream} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
