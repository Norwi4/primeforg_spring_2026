import LoginForm from '@/components/auth/LoginForm';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';

export default function LoginPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-secondary">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto grid items-center justify-center gap-8 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h1 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight text-primary">
              Admin Login
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Enter your credentials to access the admin dashboard.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm bg-background p-8 rounded-lg shadow-lg">
            <LoginForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
