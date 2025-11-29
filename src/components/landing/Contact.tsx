import ContactForm from './ContactForm';

export default function Contact() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto grid items-center justify-center gap-8 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight text-primary">
            Let's Start a Conversation
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-body">
            Have a project in mind or just want to learn more? Fill out the form below, and we'd love to hear from you.
          </p>
        </div>
        <div className="mx-auto w-full max-w-lg">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
