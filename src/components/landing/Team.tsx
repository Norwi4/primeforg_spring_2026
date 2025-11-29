import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const teamMembers = [
  {
    id: "team-member-1",
    name: "Alexia Thorne",
    role: "CEO & Founder",
  },
  {
    id: "team-member-2",
    name: "Benjamin Carter",
    role: "Chief Strategy Officer",
  },
  {
    id: "team-member-3",
    name: "Cassandra Lee",
    role: "Head of Analytics",
  },
  {
    id: "team-member-4",
    name: "Dominic Vega",
    role: "Lead Consultant",
  },
];

export default function Team() {
  return (
    <section id="team" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-body">Our Team</div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl text-primary">
              The Minds Behind PrimeForage
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-body">
              Meet the dedicated professionals who are passionate about your success.
            </p>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 mt-12">
          {teamMembers.map((member) => {
            const memberImage = PlaceHolderImages.find(p => p.id === member.id);
            return (
              <Card key={member.name} className="overflow-hidden text-center group">
                <CardHeader className="p-0 relative">
                  {memberImage && (
                     <Image
                      src={memberImage.imageUrl}
                      alt={`Portrait of ${member.name}`}
                      width={400}
                      height={400}
                      className="aspect-square object-cover"
                      data-ai-hint={memberImage.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link href="#" className="text-white hover:text-accent"><Twitter /></Link>
                    <Link href="#" className="text-white hover:text-accent"><Linkedin /></Link>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="font-headline text-lg font-bold">{member.name}</CardTitle>
                  <p className="text-sm text-accent font-semibold font-body">{member.role}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
