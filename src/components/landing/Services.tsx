import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Briefcase, Target, Users } from "lucide-react";

const services = [
  {
    icon: <Briefcase className="h-10 w-10 text-accent" />,
    title: "Strategic Consulting",
    description: "Expert guidance to navigate complex market landscapes and achieve sustainable growth.",
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-accent" />,
    title: "Market Analysis",
    description: "In-depth research and data-driven insights to identify opportunities and mitigate risks.",
  },
  {
    icon: <Target className="h-10 w-10 text-accent" />,
    title: "Performance Optimization",
    description: "Tailored strategies to enhance operational efficiency and maximize your return on investment.",
  },
  {
    icon: <Users className="h-10 w-10 text-accent" />,
    title: "Team Augmentation",
    description: "Flexible staffing solutions to scale your team with top-tier talent exactly when you need it.",
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm font-body">Our Services</div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl text-primary">
              What We Offer
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-body">
              PrimeForage delivers a comprehensive suite of services designed to empower your business and drive success.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-2 mt-12">
          {services.map((service, index) => (
            <Card key={index} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                {service.icon}
                <CardTitle className="font-headline text-xl font-bold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-body">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
