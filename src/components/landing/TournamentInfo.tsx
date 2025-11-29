import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Shield, Trophy, Users } from "lucide-react";

const tournamentDetails = [
  {
    icon: <Trophy className="h-10 w-10 text-accent" />,
    title: "Главное событие",
    description: "Лучшие команды со всего мира сразятся за звание чемпионов и впечатляющий призовой фонд.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-accent" />,
    title: "Весна 2026",
    description: "Турнир пройдет весной 2026 года. Следите за новостями, чтобы не пропустить точные даты и расписание.",
  },
  {
    icon: <Users className="h-10 w-10 text-accent" />,
    title: "Открытые квалификации",
    description: "У каждой команды есть шанс проявить себя и попасть на главную сцену через серию открытых квалификаций.",
  },
  {
    icon: <Shield className="h-10 w-10 text-accent" />,
    title: "Битва Древних",
    description: "Станьте свидетелем невероятных стратегий и захватывающих моментов в битве за славу.",
  },
];

export default function TournamentInfo() {
  return (
    <section id="tournament" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm font-body">О турнире</div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl text-primary">
              Подробности события
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-body">
              Все, что вам нужно знать о предстоящем чемпионате по Dota 2.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-2 mt-12">
          {tournamentDetails.map((detail, index) => (
            <Card key={index} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                {detail.icon}
                <CardTitle className="font-headline text-xl font-bold">{detail.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-body">{detail.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
