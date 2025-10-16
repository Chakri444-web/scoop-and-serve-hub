import { Card, CardContent } from "@/components/ui/card";
import { Heart, Leaf, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">About Sweet Scoops</h1>
          <p className="text-xl text-muted-foreground">
            Where passion meets flavor
          </p>
        </div>

        <div className="space-y-8">
          <Card className="shadow-soft">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed mb-4">
                Welcome to Sweet Scoops, where every scoop tells a story of
                craftsmanship and quality. Since our founding, we've been
                dedicated to creating the finest artisan ice cream using only
                the best ingredients.
              </p>
              <p className="text-lg leading-relaxed">
                Our passion for ice cream goes beyond just making frozen
                desserts. It's about creating moments of joy, bringing people
                together, and celebrating life's sweet moments.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-soft hover:shadow-elevated transition-all">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-xl">Made with Love</h3>
                <p className="text-muted-foreground">
                  Each batch is crafted with care and attention to detail
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-elevated transition-all">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-xl">Fresh Ingredients</h3>
                <p className="text-muted-foreground">
                  We use only the finest, locally-sourced ingredients
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-elevated transition-all">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-xl">Award Winning</h3>
                <p className="text-muted-foreground">
                  Recognized for our exceptional quality and taste
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-soft bg-gradient-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Our Promise</h2>
              <p className="text-lg leading-relaxed">
                At Sweet Scoops, we promise to always deliver the highest
                quality ice cream made with love, creativity, and the finest
                ingredients. Every flavor is a testament to our commitment to
                excellence and our passion for bringing joy to your life, one
                scoop at a time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
