"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import dynamic from 'next/dynamic';
import MediaPickerDialog from './MediaPickerDialog';
import { Image } from 'lucide-react';
import { AutosaveProvider, useAutosaveStatus } from './AutosaveProvider';
import { format } from 'date-fns';

const MediaEnabledTiptapEditor = dynamic(() => import('./MediaEnabledTiptapEditor'), { 
  ssr: false,
  loading: () => <p>Načítání editoru...</p> 
});

// Local type definitions to avoid issues with Prisma client type generation
enum ArticleStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

type Category = {
  id: string;
  name: string;
};

// This local type mirrors the Prisma schema and is used throughout the component
// to ensure type safety without relying on the generated client.
type ArticleForEditor = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  imageUrl: string | null;
  status: ArticleStatus;
  isFeatured: boolean;
  categoryId: string;
  metaTitle: string | null;
  metaDescription: string | null;
  publishedAt?: string | Date | null;
};

interface ArticleEditorProps {
  articleId?: string
  onSave?: () => void
  onCancel?: () => void
}

export default function ArticleEditor({ articleId, onSave, onCancel }: ArticleEditorProps) {
  const router = useRouter();
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<ArticleStatus>(ArticleStatus.DRAFT);
  const [isFeatured, setIsFeatured] = useState(false);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [publishedAt, setPublishedAt] = useState<string>("");

  // Data state
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const generateSlug = useCallback((title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/&/g, '-and-')
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }, []);

  useEffect(() => {
    // Initialize loading state
    if (articleId) {
      setIsLoading(true);
    }

    // Load data (categories and article if editing)
    const loadData = async () => {
      try {
        const { authorizedFetch } = await import('@/lib/auth-fetch');

        // Load categories first
        const categoriesResponse = await authorizedFetch('/api/admin/categories', {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!categoriesResponse.ok) {
          throw new Error(`Chyba při načítání kategorií (${categoriesResponse.status})`);
        }

        const categoriesResult = await categoriesResponse.json();
        if (categoriesResult.success) {
          setCategories(categoriesResult.data);
        } else {
          throw new Error(categoriesResult.error || 'Neznámá chyba při načítání kategorií');
        }

        // If editing, load article data
        if (articleId) {
          const articleResponse = await authorizedFetch(`/api/admin/articles/${articleId}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (!articleResponse.ok) {
            throw new Error(`Chyba při načítání článku (${articleResponse.status})`);
          }

          const articleResult = await articleResponse.json();
          if (articleResult.success) {
            const data = articleResult.data as ArticleForEditor;
            setTitle(data.title);
            setSlug(data.slug);
            setContent(data.content);
            setExcerpt(data.excerpt || "");
            setImageUrl(data.imageUrl || "");
            setCategoryId(data.categoryId);
            setStatus(data.status);
            setIsFeatured(data.isFeatured);
            setMetaTitle(data.metaTitle || "");
            setMetaDescription(data.metaDescription || "");
            // Load publishedAt if exists
            if (data.publishedAt) {
              const date = new Date(data.publishedAt);
              const formatted = format(date, "yyyy-MM-dd'T'HH:mm");
              setPublishedAt(formatted);
            }
          } else {
            throw new Error(articleResult.error || 'Neznámá chyba při načítání článku');
          }
        }
      } catch (error) {
        console.error('Chyba při načítání dat:', error);
        toast({ 
          title: "Chyba při načítání dat", 
          description: error instanceof Error ? error.message : 'Neznámá chyba', 
          variant: "destructive" 
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [articleId, toast]);


  const generateMetaTags = useCallback((title: string, content: string) => {
    // Generování meta title
    const metaTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
    
    // Generování meta description z obsahu
    // Odstranění HTML tagů a získání prvních cca 150 znaků
    const plainContent = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const metaDescription = plainContent.length > 150 
      ? plainContent.substring(0, 147) + '...' 
      : plainContent;
    
    return { metaTitle, metaDescription };
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    if (!articleId) { // Only auto-generate slug for new articles
      setSlug(generateSlug(newTitle));
    }
    
    // Auto-generování meta tagů pokud jsou prázdné
    if (!metaTitle.trim() && newTitle.trim()) {
      const { metaTitle: autoMetaTitle } = generateMetaTags(newTitle, content);
      setMetaTitle(autoMetaTitle);
    }
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    
    // Auto-generování meta description pokud je prázdná
    if (!metaDescription.trim() && newContent.trim() && title.trim()) {
      const { metaDescription: autoMetaDescription } = generateMetaTags(title, newContent);
      setMetaDescription(autoMetaDescription);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    console.log('=== SUBMIT DEBUG ===');
    console.log('handleSubmit called');
    console.log('Title:', title);
    console.log('CategoryId:', categoryId);
    console.log('Content length:', content.length);
    console.log('Status:', status);
    console.log('PublishedAt:', publishedAt);
    
    // Přidaná validace
    if (!title.trim()) {
      console.error('Validation failed: Title is empty');
      toast({ 
        title: "⚠️ Chybí název článku", 
        description: "Prosím vyplňte název článku", 
        variant: "destructive" 
      });
      return;
    }
    
    if (!categoryId) {
      console.error('Validation failed: CategoryId is empty');
      toast({ 
        title: "⚠️ Chybí kategorie", 
        description: "Prosím vyberte kategorii pro článek", 
        variant: "destructive" 
      });
      return;
    }
    
    if (!content.trim()) {
      console.error('Validation failed: Content is empty');
      toast({ 
        title: "⚠️ Chybí obsah článku", 
        description: "Prosím vyplňte obsah článku", 
        variant: "destructive" 
      });
      return;
    }
    
    console.log('✅ All validations passed');
    setIsSaving(true);

    const articleData = {
      title,
      slug,
      content,
      excerpt,
      imageUrl,
      categoryId,
      status,
      isFeatured,
      metaTitle,
      metaDescription,
      tags: [], // Tags not implemented in this version
      publishedAt: publishedAt && publishedAt.trim() ? new Date(publishedAt).toISOString() : null,
    };
    
    console.log('📦 Article data to send:', JSON.stringify(articleData, null, 2));

    try {
      const { authorizedFetch } = await import('@/lib/auth-fetch');
      const url = articleId ? `/api/admin/articles/${articleId}` : "/api/admin/articles";
      
      console.log('🚀 Sending request to:', url);
      
      const response = await authorizedFetch(url, {
        method: articleId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });

      console.log('📥 Response status:', response.status);
      const result = await response.json();
      console.log('📥 Response data:', result);

      if (result.success) {
        toast({ title: articleId ? "Článek úspěšně aktualizován" : "Článek úspěšně vytvořen" });
        if (onSave) onSave();
        router.refresh();
      } else {
        toast({
          title: "Došlo k chybě",
          description: result.error || "Nepodařilo se uložit článek.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('❌ Submit error:', error);
      toast({
        title: "Došlo k chybě",
        description: error.message || "Nepodařilo se uložit článek.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const AutosaveStatus = () => {
    const { lastSaved, saving } = useAutosaveStatus();
    
    if (!lastSaved && !saving) return null;
    
    return (
      <div className="text-sm text-gray-500">
        {saving ? (
          "Ukládání..."
        ) : lastSaved && (
          <>Poslední uložení: {format(lastSaved, 'HH:mm:ss')}</>
        )}
      </div>
    );
  };

  if (isLoading) return <div>Načítání...</div>;

  return (
    <AutosaveProvider onSave={handleSubmit} enabled={Boolean(title.trim())}>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Název</Label>
        <Input id="title" value={title} onChange={handleTitleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">část za lomítkem např. /aktuality-z-Prahy4 (fiserpavel.cz/Aktuality-z-Prahy4)</Label>
        <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Obsah</Label>
        <MediaEnabledTiptapEditor
          content={content}
          onChange={handleContentChange}
          placeholder="Zde napište obsah článku..."
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="excerpt">Úryvek</Label>
        <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">URL obrázku</Label>
        <div className="flex gap-2">
          <Input 
            id="imageUrl" 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
            className="max-w-md"
          />
          <MediaPickerDialog 
            onSelectMedia={(url) => setImageUrl(url)} 
            trigger={
              <Button type="button" variant="outline" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <span>Vlastní obrázek</span>
              </Button>
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category">Kategorie *</Label>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger className={!categoryId ? "border-red-300" : ""}>
              <SelectValue placeholder="Vyberte kategorii" />
            </SelectTrigger>
            <SelectContent>
              {Array.isArray(categories) && categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!categoryId && (
            <p className="text-xs text-red-500">Kategorie je povinná</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Stav</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as ArticleStatus)} required>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ArticleStatus.DRAFT}>Koncept</SelectItem>
              <SelectItem value={ArticleStatus.PUBLISHED}>Publikováno</SelectItem>
              <SelectItem value={ArticleStatus.ARCHIVED}>Archivováno</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="publishedAt">Naplánovat datum publikování (volitelné)</Label>
        <Input 
          id="publishedAt" 
          type="datetime-local" 
          value={publishedAt} 
          onChange={(e) => setPublishedAt(e.target.value)}
          className="max-w-md"
        />
        <p className="text-sm text-gray-500">
          Pokud nevyplníte, článek bude publikován okamžitě při změně stavu na &quot;Publikováno&quot;
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="isFeatured" checked={isFeatured} onCheckedChange={(checked) => setIsFeatured(!!checked)} />
        <Label htmlFor="isFeatured">Doporučený článek</Label>
      </div>
      
      <div className="space-y-4 rounded-md border p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">SEO Nastavení</h3>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={() => {
              if (title.trim() && content.trim()) {
                const { metaTitle: autoMetaTitle, metaDescription: autoMetaDescription } = generateMetaTags(title, content);
                setMetaTitle(autoMetaTitle);
                setMetaDescription(autoMetaDescription);
                toast({ title: "Meta tagy byly automaticky vygenerovány" });
              } else {
                toast({ 
                  title: "Nelze generovat meta tagy", 
                  description: "Nejprve vyplňte název a obsah článku",
                  variant: "destructive" 
                });
              }
            }}
          >
            🤖 Generovat automaticky
          </Button>
        </div>
         <div className="space-y-2">
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input 
              id="metaTitle" 
              value={metaTitle} 
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Automaticky vygenerováno při vyplnění názvu"
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea 
              id="metaDescription" 
              value={metaDescription} 
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Automaticky vygenerováno při vyplnění obsahu"
            />
        </div>
      </div>

      <div className="flex justify-end items-center space-x-4">
        <AutosaveStatus />
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Zrušit</Button>}
        <Button 
          type="submit" 
          disabled={isSaving}
          onClick={() => console.log('🔘 Submit button clicked! isSaving:', isSaving)}
        >
          {isSaving ? "Ukládání..." : "Uložit článek"}
        </Button>
      </div>
    </form>
    </AutosaveProvider>
  );
}
