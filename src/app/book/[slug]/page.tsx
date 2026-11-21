import { redirect } from "next/navigation";

/** /book/[slug] starts at the Trip step (step 01 "Car" is the vehicle page itself). */
export default async function BookingIndex({ params }: PageProps<"/book/[slug]">) {
  const { slug } = await params;
  redirect(`/book/${slug}/trip`);
}
