import { getDb, RitualConfig } from "@/lib/db";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/sections/Hero";
import NextRitual from "@/components/sections/NextRitual";
import About from "@/components/sections/About";
import Preparation from "@/components/sections/Preparation";
import FAQ from "@/components/sections/FAQ";
import Registration from "@/components/sections/Registration";
import Contact from "@/components/sections/Contact";

async function getRitual(): Promise<RitualConfig | null> {
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT * FROM ritual_config ORDER BY updated_at DESC LIMIT 1
    `;
    if (!rows[0]) return null;
    const row = rows[0] as RitualConfig;
    // Neon retorna DATE como objeto Date — converter para string YYYY-MM-DD
    if (row.date && typeof row.date !== "string") {
      row.date = new Date(row.date).toISOString().split("T")[0];
    }
    return row;
  } catch {
    return null;
  }
}

export const revalidate = 60;

export default async function Home() {
  const ritual = await getRitual();

  return (
    <main className="min-h-screen bg-purple-deep">
      <Navbar />
      <Hero ritual={ritual} />
      <NextRitual ritual={ritual} />
      <About />
      <Preparation />
      <FAQ />
      <Registration ritual={ritual} />
      <Contact />
      <Footer />
    </main>
  );
}
