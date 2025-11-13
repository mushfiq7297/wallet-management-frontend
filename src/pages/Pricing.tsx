import { Check, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // ✅ Used instead of gradient tag
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for getting started",
      features: [
        "Send & Receive Money",
        "Basic Transaction History",
        "Email Support",
        "Up to 10 transactions/day",
        "2% transaction fee",
      ],
      popular: false,
    },
    {
      name: "Premium",
      price: "৳99",
      period: "/month",
      description: "For regular users",
      features: [
        "Unlimited Transactions",
        "Advanced Analytics",
        "Priority Support",
        "1% transaction fee",
        "Instant withdrawals",
        "Transaction receipts",
      ],
      popular: true,
    },
    {
      name: "Business",
      price: "৳499",
      period: "/month",
      description: "For businesses & teams",
      features: [
        "Everything in Premium",
        "Multi-user accounts",
        "API Access",
        "0.5% transaction fee",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced reporting",
      ],
      popular: false,
    },
  ];

  const transactionFees = [
    { type: "Send Money", fee: "Free for first ৳1,000/day" },
    { type: "Cash-In (Agent)", fee: "1.5% (min ৳5)" },
    { type: "Cash-Out (Agent)", fee: "1.85% (min ৳10)" },
    { type: "Bank Transfer", fee: "৳15 per transaction" },
    { type: "Mobile Recharge", fee: "0%" },
    { type: "Bill Payment", fee: "0%" },
  ];

  return (
    <section className="py-20 min-h-screen">
      <div className="container space-y-20 mx-auto">
        {/* HEADER */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold">Simple, Transparent <span className="text-primary">Pricing</span></h1>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your needs.
          </p>
        </div>


        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-2 transition-all ${
                plan.popular ? "border-primary shadow-lg scale-[1.03]" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="px-3 py-1 text-sm flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>

                <div className="flex items-baseline justify-center gap-1 mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                  onClick={() => navigate("/notFound")}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>


        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Transaction Fees</h2>
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-0">
              <div className="divide-y">
                {transactionFees.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium">{item.type}</span>
                    <span className="text-muted-foreground">{item.fee}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-center">Pricing FAQs</h2>

          {[
            {
              q: "Can I change plans anytime?",
              a: "Yes, you can upgrade or downgrade anytime. Changes apply immediately.",
            },
            {
              q: "Are there any hidden fees?",
              a: "No hidden fees. All fees are shown before you confirm.",
            },
            {
              q: "What payment methods do you accept?",
              a: "Credit/debit cards, bank transfer & mobile money.",
            },
          ].map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl">{faq.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
