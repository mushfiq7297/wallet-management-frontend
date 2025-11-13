import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create a PayFlow account?",
          answer:
            'Click "Sign Up", enter your phone number and email, then verify using the OTP sent to you.',
        },
        {
          question: "Is PayFlow free to use?",
          answer:
            "Yes! Basic features are free. Some transactions may have a small fee, displayed before confirmation.",
        },
        {
          question: "What do I need to sign up?",
          answer:
            "A valid phone number and email. Government ID may be required for full KYC verification.",
        },
      ],
    },
    {
      category: "Transactions",
      questions: [
        {
          question: "How do I send money?",
          answer:
            'Go to Dashboard → "Send Money", enter the recipient number, enter amount, confirm with PIN.',
        },
        {
          question: "What are the transaction limits?",
          answer:
            "Basic users up to ৳50,000/day, premium users higher limits with verification.",
        },
        {
          question: "How long do transactions take?",
          answer:
            "Wallet to wallet is instant. Bank transfers may take 1–2 business days.",
        },
        {
          question: "Can I cancel a transaction?",
          answer:
            "Transactions are instant and cannot be reversed. Double-check details before confirming.",
        },
      ],
    },
    {
      category: "Security",
      questions: [
        {
          question: "How secure is PayFlow?",
          answer:
            "Encrypted using bank-grade AES-256 + PIN/Biometric Authentication.",
        },
        {
          question: "What if I forget my PIN?",
          answer: 'Select "Forgot PIN" during login to reset.',
        },
        {
          question: "How do I protect my account?",
          answer:
            "Use a strong password, enable 2FA, and never share your PIN.",
        },
      ],
    },
  ];

  return (
    <section className="py-20 min-h-screen">
      <div className="container space-y-16 mx-auto">
       
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold">
            Frequently Asked{" "}
            <span className="bg-primary  bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about PayFlow
          </p>
        </div>

      
        <div className="space-y-14 max-w-4xl mx-auto">
          {faqs.map((section, sIndex) => (
            <Card key={sIndex} className="border-2 hover:shadow-md transition">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  {section.category}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <Accordion type="single" collapsible>
                  {section.questions.map((faq, qIndex) => (
                    <AccordionItem key={qIndex} value={`${sIndex}-${qIndex}`}>
                      <AccordionTrigger className="text-left font-semibold">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center bg-primary  p-12 rounded-2xl text-white">
          <h2 className="text-3xl font-bold mb-2">Still have questions?</h2>
          <p className="text-white/90 mb-6">
            Our support team is here to help 24/7
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-semibold"
            onClick={() => (window.location.href = "/contact")}
          >
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
