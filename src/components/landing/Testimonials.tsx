import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "Working with PrimeForage transformed our business. Their strategic insights were game-changing, leading to a 40% increase in revenue.",
    name: "Sarah Johnson",
    company: "CEO, Innovate Corp",
    avatar: "SJ",
  },
  {
    quote: "The level of professionalism and expertise is unmatched. Highly recommended for any company looking to scale effectively and sustainably.",
    name: "Michael Chen",
    company: "CTO, TechFrontier",
    avatar: "MC",
  },
  {
    quote: "They didn't just provide a service; they became a true partner in our growth. The results speak for themselves.",
    name: "Emily Rodriguez",
    company: "Founder, Bloom Ventures",
    avatar: "ER",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm font-body">Client Stories</div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl text-primary">
              Trusted by Industry Leaders
            </h2>
          </div>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="mx-auto w-full max-w-4xl mt-12"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="h-full bg-background">
                    <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-6">
                      <p className="text-lg font-body italic text-foreground leading-relaxed">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage />
                          <AvatarFallback className="bg-primary text-primary-foreground font-bold">{testimonial.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <p className="font-headline font-bold text-lg">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
