// app/page.tsx (Redirects to /dashboard)
import { redirect } from "next/navigation";

export default function Home() {
    redirect("/dashboard");
}
