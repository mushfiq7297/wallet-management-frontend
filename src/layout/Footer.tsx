
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "../assets/icons/Logo";

export default function Footer() {
  return (
    <footer className="border-t mt-10 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="lg:flex lg:items-start lg:gap-10">
         
          <div className="text-foreground">
            <Logo />
          </div>

         
          <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16 w-full">
            <div className="col-span-2">
              <Card className="bg-transparent border-none shadow-none p-0">
                <CardContent className="p-0">
                  <h2 className="text-2xl font-bold">Get the latest news!</h2>
                  <p className="mt-4 text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
              <form className="w-full space-y-3 lg:space-y-0 lg:flex lg:items-center lg:gap-4">
                <Input type="email" placeholder="john@rhcp.com" className="w-full" />
                <Button className="w-full sm:w-auto">Sign up</Button>
              </form>
            </div>

          
            {[
              { title: "Services", links: ["1on1 Coaching", "Company Review", "Accounts Review", "HR Consulting", "SEO Optimisation"] },
              { title: "Company", links: ["About", "Meet the Team", "Accounts Review"] },
              { title: "Helpful Links", links: ["Contact", "FAQs", "Live Chat"] },
              { title: "Legal", links: ["Accessibility", "Returns Policy", "Refund Policy", "Hiring-3 Statistics"] },
              { title: "Downloads", links: ["Marketing Calendar", "SEO Infographics"] },
            ].map((section, idx) => (
              <div key={idx} className="col-span-2 sm:col-span-1">
                <p className="font-medium text-foreground">{section.title}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-muted-foreground hover:text-primary transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          
            <ul className="col-span-2 flex justify-start gap-6 lg:col-span-5 lg:justify-end">
              {[
                { name: "Facebook", icon: "facebook" },
                { name: "Instagram", icon: "instagram" },
                { name: "Twitter", icon: "twitter" },
                { name: "GitHub", icon: "github" },
                { name: "Dribbble", icon: "dribbble" },
              ].map((social) => (
                <li key={social.name}>
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    <span className="sr-only">{social.name}</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                     
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        
        <div className="mt-10 border-t pt-8">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-6 text-sm">
            <p className="text-muted-foreground">© 2025. Pay Flow. All rights reserved.</p>
            <ul className="flex flex-wrap gap-6">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">Cookies</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
