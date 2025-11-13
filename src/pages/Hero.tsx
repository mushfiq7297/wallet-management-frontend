import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/images/hero-bannar.jpg";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
      
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Your Money,{" "}
              <span className="bg-primary bg-clip-text text-transparent">
                Simplified
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              Experience the future of mobile financial services. Send, receive, and manage your money with ease and security.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/login")}
                className="group font-semibold shadow-lg hover:shadow-xl transition-all bg-primary text-primary-foreground"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/features")}
                className="border-primary text-primary hover:bg-primary/10"
              >
                Learn More
              </Button>
            </div>
          </div>

  
          <div className="relative animate-in fade-in slide-in-from-right-8 duration-700">
            <img
              src={heroImage}
              alt="Mobile banking illustration"
              className="rounded-2xl shadow-2xl w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
