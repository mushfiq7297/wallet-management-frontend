"use client";

import { Target, Users, Award, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To make financial services accessible, secure, and simple for everyone, everywhere.",
    },
    {
      icon: Users,
      title: "Our Team",
      description:
        "A diverse group of fintech experts, engineers, and designers dedicated to innovation.",
    },
    {
      icon: Award,
      title: "Our Values",
      description:
        "Trust, transparency, and user-centric design drive everything we do.",
    },
    {
      icon: Heart,
      title: "Our Commitment",
      description:
        "Empowering communities through financial inclusion and digital literacy.",
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">


        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            About <span className="text-primary">PayFlow</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to revolutionize mobile financial services, making
            them accessible, secure, and simple for everyone.
          </p>
        </div>


        <div className="mb-20 space-y-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            PayFlow was founded in 2024 with a simple vision: to create a mobile
            financial service that anyone can use, regardless of their technical
            expertise.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Starting with a small team of passionate innovators, we've grown
            into a trusted platform serving thousands of users. Our focus has
            always been security, simplicity, and accessibility.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Today, PayFlow continues to evolve, adding new features and improving
            our service based on user feedback.
          </p>
        </div>


        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            What Drives Us
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="transition-all duration-300 hover:shadow-lg border border-border bg-card"
              >
                <CardHeader>
                  <div className="h-16 w-16 rounded-xl bg-primary/90 flex items-center justify-center mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>


        <div className="bg-primary text-primary-foreground rounded-2xl p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-lg opacity-90">Active Users</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">$5M+</div>
              <div className="text-lg opacity-90">Transactions Processed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
              <div className="text-lg opacity-90">Uptime Reliability</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
