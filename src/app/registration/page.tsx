import RegistrationForm from '@/components/landing/RegistrationForm';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Link from 'next/link';

export default function RegistrationPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-secondary">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto grid items-center justify-center gap-8 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h1 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight text-primary">
              Регистрация команды на турнир
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Заполните форму ниже, чтобы заявить о своем участии в PrimeForg Spring 2026.
            </p>
          </div>
          <div className="mx-auto w-full max-w-lg bg-background p-8 rounded-lg shadow-lg">
            <RegistrationForm />
          </div>
          <p className="text-xs text-muted-foreground">
            Уже зарегистрировались? Если вам нужно внести изменения, свяжитесь с нами через <Link href="/#contact" className="underline hover:text-primary">форму обратной связи</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
