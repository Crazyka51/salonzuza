import { AdminCatchAllPage } from "./AdminCatchAllPage"

// Next.js App Router catch-all page for admin routes
export default function AdminPage({ params }: { params: { slug?: string[] } }) {
  return <AdminCatchAllPage slug={params.slug || []} />
}

// Generate metadata for admin pages
export async function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug || []
  const pageName = slug.length > 0 ? slug[0] : "prehled"
  
  const pageNames: Record<string, string> = {
    dashboard: "Přehled",
    prehled: "Přehled", 
    "editor-obsahu": "Editor obsahu",
    content: "Editor obsahu",
    statistiky: "Statistiky",
    analytics: "Statistiky",
  }

  const czechPageName = pageNames[pageName] || pageName.charAt(0).toUpperCase() + pageName.slice(1)

  return {
    title: `${czechPageName} - Salon Zuza Administrace`,
    description: `Administrační panel Salon Zuza - ${czechPageName}`,
  }
}
