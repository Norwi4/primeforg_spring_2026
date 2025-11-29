import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

const blogPosts = [
  {
    id: "blog-post-1",
    title: "The Future of Strategic Business Growth",
    excerpt: "Discover the key trends and strategies that will define business success in the coming years.",
    date: "May 20, 2024",
    category: "Strategy"
  },
  {
    id: "blog-post-2",
    title: "Data-Driven Decisions: A Guide for Modern Leaders",
    excerpt: "Learn how to leverage analytics to make smarter, more impactful decisions for your organization.",
    date: "May 15, 2024",
    category: "Analytics"
  },
  {
    id: "blog-post-3",
    title: "Building a High-Performance Team Culture",
    excerpt: "Explore the cornerstones of a thriving team environment that fosters innovation and collaboration.",
    date: "May 10, 2024",
    category: "Culture"
  },
];

export default function Blog() {
  return (
    <section id="blog" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-body">Our Insights</div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl text-primary">
              From the PrimeForage Blog
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-body">
              Stay ahead of the curve with our latest articles, insights, and company news.
            </p>
          </div>
        </div>
        <div className="mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          {blogPosts.map((post) => {
            const postImage = PlaceHolderImages.find(p => p.id === post.id);
            return (
              <Card key={post.title} className="overflow-hidden group flex flex-col">
                <Link href="#" className="block" prefetch={false}>
                  <CardHeader className="p-0">
                    {postImage && (
                       <Image
                        src={postImage.imageUrl}
                        alt={`Blog post image for ${post.title}`}
                        width={600}
                        height={400}
                        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={postImage.imageHint}
                      />
                    )}
                  </CardHeader>
                </Link>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <div className="flex items-center gap-4 text-sm font-body text-muted-foreground">
                        <Badge variant="outline">{post.category}</Badge>
                        <time dateTime={post.date}>{post.date}</time>
                    </div>
                    <Link href="#" className="block" prefetch={false}>
                      <h3 className="mt-4 font-headline text-xl font-bold leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                    </Link>
                    <p className="mt-2 font-body text-muted-foreground text-sm flex-grow">{post.excerpt}</p>
                  </div>
                  <Link href="#" className="mt-4 flex items-center font-semibold text-primary" prefetch={false}>
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
