import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Shield, Trophy, Users, Globe, Star, MapPin } from "lucide-react";

const tournamentDetails = [
  {
    icon: <Trophy className="h-10 w-10 text-primary" />,
    title: "Две дисциплины, один чемпион",
    description: "Лучшие команды со всего мира сойдутся в битвах по Dota 2 и CS2 за звание чемпионов, колоссальные призовые фонды и вечную славу.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: "Сезон: Весна 2026",
    description: "Турнир пройдет в самом сердце весны 2026 года. Точные даты и расписание матчей будут объявлены в ближайшее время. Не пропустите старт главного киберспортивного события года!",
  },
  {
    icon: <MapPin className="h-10 w-10 text-primary" />,
    title: "Место проведения: Калуга",
    description: "Главные сражения турнира состоятся на современной киберспортивной арене в городе Калуга. Готовьтесь к незабываемой атмосфере!",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Открытые квалификации: Ваш шанс",
    description: "Мечтаете о большой сцене? У каждой команды есть шанс проявить себя и пробиться в элиту через серию напряженных открытых квалификаций в обеих дисциплинах.",
  },
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Международный масштаб",
    description: "Мы соберем команды из разных уголков планеты. Вас ждет столкновение стилей, культур и игровых философий как в тактических шутерах, так и в MOBA.",
  },
  {
    icon: <Star className="h-10 w-10 text-primary" />,
    title: "Звездные таланты и аналитика",
    description: "Наши комментаторы и аналитики — лучшие в своем деле. Они обеспечат глубокий разбор матчей, яркие эмоции и помогут вам не упустить ни одной важной детали.",
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Битва за превосходство",
    description: "Станьте свидетелем невероятных стратегий, головокружительных командных боев и индивидуального мастерства. Это больше, чем игра — это битва за вечную славу.",
  },
];

export default function TournamentInfo() {
  return (
    <section id="tournament" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm text-muted-foreground">О турнире</div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl text-primary-foreground">
              Подробности события
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Все, что вам нужно знать о предстоящем чемпионате по Dota 2 и CS2.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl items-stretch gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 mt-12">
          {tournamentDetails.map((detail, index) => (
            <Card key={index} className="bg-background/40 border-border/60 hover:border-primary/80 transition-all duration-300 flex flex-col group">
              <CardHeader className="flex flex-row items-start gap-4 pb-4">
                {detail.icon}
                <div className="flex-1">
                  <CardTitle className="font-headline text-xl font-bold text-primary-foreground group-hover:text-primary transition-colors">{detail.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground">{detail.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
