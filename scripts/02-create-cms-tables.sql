-- Extended SQL schema for CMS functionality
-- Articles table
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  author_id INTEGER REFERENCES admin_users(id) ON DELETE CASCADE,
  featured_image VARCHAR(500),
  tags JSONB DEFAULT '[]',
  meta_title VARCHAR(60),
  meta_description VARCHAR(160),
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  view_count INTEGER DEFAULT 0,
  is_sticky BOOLEAN DEFAULT FALSE
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  parent_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  color VARCHAR(7) DEFAULT '#6b7280',
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Media files table
CREATE TABLE IF NOT EXISTS media_files (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  file_size INTEGER NOT NULL,
  width INTEGER,
  height INTEGER,
  path VARCHAR(500) NOT NULL,
  url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255),
  caption TEXT,
  uploaded_by INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active',
  subscribed_at TIMESTAMP DEFAULT NOW(),
  unsubscribed_at TIMESTAMP,
  confirmed_at TIMESTAMP,
  confirmation_token VARCHAR(255),
  tags JSONB DEFAULT '[]'
);

-- Newsletter campaigns table
CREATE TABLE IF NOT EXISTS newsletter_campaigns (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  template VARCHAR(100),
  status VARCHAR(20) DEFAULT 'draft',
  scheduled_at TIMESTAMP,
  sent_at TIMESTAMP,
  created_by INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  total_recipients INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0
);

-- Analytics data table
CREATE TABLE IF NOT EXISTS analytics_data (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  page_path VARCHAR(500),
  page_title VARCHAR(255),
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  bounce_rate DECIMAL(5,2),
  avg_time_on_page INTEGER,
  source VARCHAR(100),
  medium VARCHAR(100),
  campaign VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- System backups table
CREATE TABLE IF NOT EXISTS system_backups (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  backup_type VARCHAR(50) NOT NULL,
  file_size INTEGER,
  status VARCHAR(20) DEFAULT 'pending',
  created_by INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  error_message TEXT
);

-- Site settings table (extended)
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  key VARCHAR(255) NOT NULL,
  value JSONB,
  description TEXT,
  type VARCHAR(50) DEFAULT 'text',
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(category, key)
);

-- Comments table (for articles)
CREATE TABLE IF NOT EXISTS article_comments (
  id SERIAL PRIMARY KEY,
  article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
  parent_id INTEGER REFERENCES article_comments(id) ON DELETE CASCADE,
  author_name VARCHAR(255) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  author_website VARCHAR(500),
  content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_author ON articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

CREATE INDEX IF NOT EXISTS idx_media_files_type ON media_files(mime_type);
CREATE INDEX IF NOT EXISTS idx_media_files_uploaded_by ON media_files(uploaded_by);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(status);

CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics_data(date);
CREATE INDEX IF NOT EXISTS idx_analytics_path ON analytics_data(page_path);

CREATE INDEX IF NOT EXISTS idx_comments_article ON article_comments(article_id);
CREATE INDEX IF NOT EXISTS idx_comments_status ON article_comments(status);

-- Insert sample categories
INSERT INTO categories (name, slug, description, color) VALUES
('Technologie', 'technologie', 'Články o technologiích a IT novinkách', '#3b82f6'),
('Marketing', 'marketing', 'Digital marketing a growth hacking', '#10b981'),
('Design', 'design', 'UI/UX design a kreativní procesy', '#f59e0b'),
('Business', 'business', 'Podnikání a business strategie', '#ef4444')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample articles
INSERT INTO articles (title, slug, content, excerpt, status, category_id, author_id, tags, published_at) VALUES
('Vítejte v našem CMS systému', 'vitejte-v-nasem-cms-systemu', 
 '<p>Toto je ukázkový článek v našem CMS systému. Demonstruje základní funkcionality jako je formátování textu, obrázky a další prvky.</p>', 
 'Úvodní článek představující náš CMS systém',
 'published', 1, 1, '["cms", "uvod", "system"]', NOW()),
('Jak vytvořit skvělý obsah', 'jak-vytvorit-skvely-obsah',
 '<p>Tipy a triky pro tvorbu kvalitního obsahu pro web. Naučte se psát články, které čtenáře zaujmou.</p>',
 'Praktické rady pro content marketing',
 'published', 2, 1, '["obsah", "marketing", "tipi"]', NOW())
ON CONFLICT (slug) DO NOTHING;

-- Insert default site settings
INSERT INTO site_settings (category, key, value, description, type, is_public) VALUES
('general', 'site_name', '"CMS Admin Panel"', 'Název webu', 'text', true),
('general', 'site_description', '"Moderní CMS systém"', 'Popis webu', 'textarea', true),
('general', 'site_logo', '""', 'URL loga webu', 'text', true),
('seo', 'default_meta_title', '"CMS Admin Panel"', 'Výchozí meta titulek', 'text', false),
('seo', 'default_meta_description', '"Moderní CMS systém pro správu obsahu"', 'Výchozí meta popis', 'textarea', false),
('analytics', 'google_analytics_id', '""', 'Google Analytics ID', 'text', false),
('newsletter', 'from_email', '"admin@example.com"', 'Odesílatel newsletteru', 'email', false),
('newsletter', 'from_name', '"Admin"', 'Jméno odesílatele', 'text', false)
ON CONFLICT (category, key) DO NOTHING;