"use client";

import {
  Wallet,
  Send,
  Download,
  Upload,
  History,
  Shield,
  Smartphone,
  Lock,
  Bell,
  Clock,
  BarChart3,
  FileText,
} from "lucide-react";

import {
  Card,
 
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Features() {
  const features = [
    { icon: Wallet, title: "Digital Wallet", description: "Secure digital wallet to store and manage your money with real-time balance updates.", category: "Core Features" },
    { icon: Send, title: "Send Money", description: "Transfer money instantly to anyone using their phone number or email address.", category: "Core Features" },
    { icon: Download, title: "Cash-In", description: "Deposit money easily through agent points, bank transfers, or cards.", category: "Core Features" },
    { icon: Upload, title: "Cash-Out", description: "Withdraw your money at any agent point or transfer to your bank account.", category: "Core Features" },
    { icon: History, title: "Transaction History", description: "View complete transaction history with advanced filters and search options.", category: "Core Features" },

    { icon: Shield, title: "Bank-Level Security", description: "Military-grade encryption and multi-factor authentication protect your money.", category: "Security" },
    { icon: Lock, title: "PIN Protection", description: "Secure every transaction with your personal PIN and biometric authentication.", category: "Security" },

    { icon: Bell, title: "Real-time Notifications", description: "Get instant alerts for every transaction, login, and important account activity.", category: "Features" },
    { icon: Clock, title: "24/7 Availability", description: "Access your account and perform transactions anytime, anywhere.", category: "Features" },
    { icon: Smartphone, title: "Multi-Device Support", description: "Seamlessly use PayFlow across all your devices with synchronized data.", category: "Features" },
    { icon: BarChart3, title: "Spending Analytics", description: "Track your spending patterns with detailed reports and insights.", category: "Features" },
    { icon: FileText, title: "Digital Receipts", description: "Get instant receipts for all transactions, accessible anytime in your account.", category: "Features" },
  ];


  const groupedFeatures = features.reduce((acc, feature) => {
    (acc[feature.category] ||= []).push(feature);
    return acc;
  }, {} as Record<string, typeof features>);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">

        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Powerful Features for{" "}
            <span className="bg-primary bg-clip-text text-transparent">
              Modern Finance
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Everything you need to manage your money effectively, all in one secure platform.
          </p>
        </div>


        {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
          <div key={category} className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-foreground">
              {category}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border bg-card"
                >
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/90 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary-foreground" />
                    </div>

                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        ))}


        <div className="mt-20 bg-primary rounded-2xl p-12 text-primary-foreground text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience These Features?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Join PayFlow today and discover how easy managing your money can be.
          </p>
        </div>
      </div>
    </div>
  );
}
