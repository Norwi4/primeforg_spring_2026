import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Shield, Trophy, Users, Globe, Star } from "lucide-react";

const tournamentDetails = [
  {
    icon: <Trophy className="h-10 w-10 text-accent" />,
    title: "Главное событие: Путь к Aegis",
    description: "Лучшие команды со всего мира сойдутся в битве за звание чемпионов, колоссальный призовой фонд и легендарный Aegis of Champions. Это кульминация сезона, где рождаются легенды.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-accent" />,
    title: "Сезон: Весна 2026",
    description: "Турнир пройдет в самом сердце весны 2026 года. Точные даты и расписание матчей будут объявлены в ближайшее время. Не пропустите старт главного киберспортивного события года!",
  },
  {
    icon: <Users className="h-10 w-10 text-accent" />,
    title: "Открытые квалификации: Ваш шанс",
    description: "Мечтаете о большой сцене? У каждой команды есть шанс проявить себя и пробиться в элиту через серию напряженных открытых квалификаций. Регистрация скоро откроется!",
  },
  {
    icon: <Globe className="h-10 w-10 text-accent" />,
    title: "Международный масштаб",
    description: "Мы соберем команды из разных уголков планеты: Европы, Азии, Северной и Южной Америки. Вас ждет столкновение стилей, культур и игровых философий.",
  },
  {
    icon: <Star className="h-10 w-10 text-accent" />,
    title: "Звездные таланты и аналитика",
    description: "Наши комментаторы и аналитики — лучшие в своем деле. Они обеспечат глубокий разбор матчей, яркие эмоции и помогут вам не упустить ни одной важной детали.",
  },
  {
    icon: <Shield className="h-10 w-10 text-accent" />,
    title: "Битва Древних за славу",
    description: "Станьте свидетелем невероятных стратегий, головокружительных командных боев и индивидуального мастерства. Это больше, чем игра — это битва за вечную славу.",
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
        <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
          {tournamentDetails.map((detail, index) => (
            <Card key={index} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
              <CardHeader className="flex flex-row items-start gap-4 pb-4">
                {detail.icon}
                <div className="flex-1">
                  <CardTitle className="font-headline text-xl font-bold">{detail.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground font-body">{detail.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
