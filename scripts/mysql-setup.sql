-- =============================================================
--  WealthWise — Complete MySQL Setup Script (FULL DYNAMIC CMS)
--  Run this as root: mysql -u root -p < mysql-setup.sql
-- =============================================================

CREATE DATABASE IF NOT EXISTS wealthwise_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE wealthwise_db;

-- ---------------------------------------------------------------
-- Application user
-- ---------------------------------------------------------------
DROP USER IF EXISTS 'wealthwise'@'localhost';
CREATE USER 'wealthwise'@'localhost' IDENTIFIED BY 'WealthW1se!';
GRANT ALL PRIVILEGES ON wealthwise_db.* TO 'wealthwise'@'localhost';
FLUSH PRIVILEGES;

-- ---------------------------------------------------------------
-- 1. Blog posts
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_posts (
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  title      VARCHAR(255) NOT NULL,
  excerpt    TEXT         NOT NULL,
  content    LONGTEXT     NOT NULL,
  author     VARCHAR(100) NOT NULL,
  category   VARCHAR(50)  NOT NULL,
  image      VARCHAR(500),
  status     VARCHAR(20)  DEFAULT 'Published',
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
-- 2. Contact submissions
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_submissions (
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(100) NOT NULL,
  phone      VARCHAR(20),
  subject    VARCHAR(200) NOT NULL,
  message    TEXT         NOT NULL,
  status     VARCHAR(20)  DEFAULT 'New',
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
-- 3. Admin users
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
  id            INT          AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(50)  UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email         VARCHAR(100),
  role          VARCHAR(20)  DEFAULT 'admin',
  created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
-- 4. Site settings (key-value store for all editable text)
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  setting_key   VARCHAR(100) UNIQUE NOT NULL,
  setting_value LONGTEXT,
  setting_group VARCHAR(50)  DEFAULT 'general',
  label      VARCHAR(200),
  updated_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
-- 5. Services
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
  id               INT          AUTO_INCREMENT PRIMARY KEY,
  icon_name        VARCHAR(50)  NOT NULL DEFAULT 'Briefcase',
  title            VARCHAR(255) NOT NULL,
  description      TEXT         NOT NULL,
  features         JSON,
  full_description LONGTEXT,
  sort_order       INT          DEFAULT 0,
  is_active        TINYINT(1)   DEFAULT 1,
  created_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
-- 6. Team members
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS team_members (
  id               INT          AUTO_INCREMENT PRIMARY KEY,
  name             VARCHAR(100) NOT NULL,
  position         VARCHAR(100) NOT NULL,
  qualification    VARCHAR(200),
  image            VARCHAR(500),
  description      TEXT,
  full_description LONGTEXT,
  experience       VARCHAR(50),
  education        JSON,
  email            VARCHAR(100),
  phone            VARCHAR(50),
  linkedin         VARCHAR(200),
  slug             VARCHAR(150) UNIQUE NOT NULL,
  sort_order       INT          DEFAULT 0,
  is_active        TINYINT(1)   DEFAULT 1,
  created_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- SEED DATA
-- =============================================================

-- ---------------------------------------------------------------
-- Admin user  (password: WealthW1se!)
-- ---------------------------------------------------------------
INSERT IGNORE INTO admin_users (username, password_hash, email, role) VALUES
('admin',
 '$2b$10$XqmOmYszfxlHZdqbLwRrjOeShposuvBWOpGsHhup4c5R3JLfl2GBS',
 'admin@wealthwise.com',
 'admin');

-- ---------------------------------------------------------------
-- Blog posts
-- ---------------------------------------------------------------
INSERT IGNORE INTO blog_posts (title, excerpt, content, author, category, image) VALUES
('Understanding VAT Implementation in Nepal: A Complete Guide',
 'Learn about the latest VAT regulations and how they affect your business operations in Nepal.',
 '<h2>Introduction to VAT in Nepal</h2><p>Value Added Tax (VAT) is a crucial component of Nepal''s tax system.</p><h2>Key VAT Regulations</h2><ul><li>Standard VAT rate is 13%</li><li>Registration threshold for businesses</li><li>Monthly filing requirements</li><li>Input tax credit mechanisms</li></ul>',
 'CA Muskan Agrawal', 'Tax', '/placeholder.svg?height=200&width=400'),

('Business Registration Process in Nepal: Step by Step',
 'A comprehensive guide to registering your business in Nepal.',
 '<h2>Getting Started</h2><p>Registering a business in Nepal involves several steps.</p><h2>Required Documents</h2><ul><li>Company name reservation</li><li>Memorandum and Articles of Association</li><li>Board resolution</li><li>Shareholder details</li></ul>',
 'Jiban Prajuli', 'Business', '/placeholder.svg?height=200&width=400'),

('Financial Planning Strategies for Small Businesses',
 'Essential financial planning tips to help small businesses grow and maintain healthy cash flow.',
 '<h2>Cash Flow Management</h2><p>Effective cash flow management is crucial for small business success.</p>',
 'CA Manish Shrestha', 'Finance', '/placeholder.svg?height=200&width=400'),

('ESG Compliance for Nepali Corporations',
 'Environmental, Social, and Governance compliance requirements for modern businesses in Nepal.',
 '<h2>ESG Framework</h2><p>ESG factors are becoming increasingly important for businesses.</p>',
 'Kinjal Puri', 'Compliance', '/placeholder.svg?height=200&width=400'),

('Remote Work Tax Implications in Nepal',
 'Tax considerations for businesses adopting remote work policies and digital nomads.',
 '<h2>Tax Implications</h2><p>Remote work brings unique tax challenges that businesses must address.</p>',
 'CA Muskan Agrawal', 'Tax', '/placeholder.svg?height=200&width=400');

-- ---------------------------------------------------------------
-- Site settings
-- ---------------------------------------------------------------
INSERT IGNORE INTO site_settings (setting_key, setting_value, setting_group, label) VALUES
-- Hero section
('hero_headline',       'Expert Financial', 'hero', 'Hero Headline'),
('hero_headline_accent','Advisory Services', 'hero', 'Hero Headline Accent (blue)'),
('hero_subtext',        'Wealthwise is a trusted financial advisory and consulting firm specializing in tax, accounting, compliance, and business support services in Nepal.', 'hero', 'Hero Subtext'),
('hero_phone',          '+977 9843066123', 'hero', 'Hero Phone'),
('hero_email',          'info@wealthwise.com.np', 'hero', 'Hero Email'),
('chairman_name',       'CA Kinjal Puri', 'hero', 'Chairman Name'),
('chairman_title',      'Chairman, WealthWise', 'hero', 'Chairman Title'),
('chairman_quote',      '"At WealthWise, sustainable financial growth is not just a destination—it''s a journey. Through insightful planning and unwavering commitment, we strive to shape a financially empowered Nepal."', 'hero', 'Chairman Quote'),
('chairman_image',      '/images/chairman.jpg', 'hero', 'Chairman Photo URL'),

-- About section
('about_heading',       'About Wealthwise', 'about', 'About Heading'),
('about_description1',  'Wealthwise is a trusted financial advisory and consulting firm specializing in tax, accounting, compliance, and business support services.', 'about', 'About Description (short)'),
('about_description2',  'At Wealthwise Consulting Pvt. Ltd., we offer a full spectrum of financial, compliance, and business advisory services designed to empower individuals and businesses alike. From tax planning, accounting, and payroll management to business registration, valuation, and regulatory compliance, we deliver tailored solutions that simplify operations and drive growth.\n\nWe also specialize in mortgage facilitation services for clients in Australia, supporting licensed mortgage brokers with end-to-end loan processing. With Wealthwise, you gain a reliable and experienced partner committed to excellence, precision, and long-term success across both domestic and international operations.', 'about', 'About Description (full)'),
('about_mission',       'At Wealthwise, our mission is to deliver reliable, accurate, and client-focused financial and advisory solutions that exceed expectations. We are committed to ensuring complete client satisfaction by providing personalized services, timely support, and expert guidance across every area of our work—whether it''s tax, accounting, compliance, business setup, or mortgage facilitation. Your success is our purpose.', 'about', 'Mission Statement'),
('about_stat_team',     '9+', 'about', 'Stat: Team Members'),
('about_stat_experience','8+', 'about', 'Stat: Years Experience'),
('about_stat_clients',  '50+', 'about', 'Stat: Clients Served'),
('about_stat_success',  '100%', 'about', 'Stat: Success Rate'),
('about_expertise',     'Chartered Accountants: 2|Semi-qualified CAs: 3|MBA (Marketing & Finance): 1|MBS (Finance & Accounts): 1|Support Staff: 3', 'about', 'Expertise List (pipe-separated)'),

-- Contact section
('contact_phone',       '+977 9843066123', 'contact', 'Phone'),
('contact_email',       'info@wealthwise.com.np', 'contact', 'Email'),
('contact_address',     'Gyaneshwor-30, Kathmandu, Nepal', 'contact', 'Address'),
('contact_hours',       'Sunday - Friday: 9:00 AM - 6:00 PM|Saturday: 10:00 AM - 4:00 PM', 'contact', 'Business Hours (pipe-separated lines)'),

-- Footer / social
('footer_description',  'Trusted financial advisory and consulting firm specializing in tax, accounting, compliance, and business support services in Nepal.', 'footer', 'Footer Description'),
('social_facebook',     '#', 'social', 'Facebook URL'),
('social_twitter',      '#', 'social', 'Twitter URL'),
('social_linkedin',     '#', 'social', 'LinkedIn URL'),
('social_instagram',    'https://www.instagram.com/wealthwiseconsultingpvt/?igsh=cDFkNmp2NDVlc282#', 'social', 'Instagram URL'),

-- Company info
('company_name',        'WealthWise', 'general', 'Company Name'),
('company_tagline',     'Your Trusted Financial Partner', 'general', 'Company Tagline');

-- ---------------------------------------------------------------
-- Services
-- ---------------------------------------------------------------
INSERT IGNORE INTO services (icon_name, title, description, features, full_description, sort_order) VALUES
('Calculator', 'Tax Planning & Compliance',
 'Corporate and personal tax planning, assistance in preparation and submission of tax returns, VAT/Excise and Customs services.',
 '["Corporate Tax Planning","Personal Tax Returns","VAT/Excise Services","Tax Compliance"]',
 'Our comprehensive tax planning and compliance services ensure your business and personal finances are optimized. We provide expert advice on corporate and personal tax planning, assist with the preparation and submission of all necessary tax returns, and offer specialized services for VAT, Excise, and Customs regulations.',
 1),

('FileText', 'Accounting Services',
 'Complete accounting solutions including bookkeeping, financial statements, and accounting outsourcing services.',
 '["Bookkeeping Services","Financial Statements","Accounting Outsourcing","Monthly Reporting"]',
 'We offer complete accounting solutions designed to streamline your financial operations. Our services include meticulous bookkeeping, preparation of accurate financial statements, and comprehensive accounting outsourcing.',
 2),

('Users', 'Payroll Management',
 'Comprehensive payroll services including PAN facilitation, PF/CIT/SSF registration and monthly processing.',
 '["PAN Facilitation","PF/CIT/SSF Registration","Monthly Payroll","Compliance Management"]',
 'Our comprehensive payroll management services handle all aspects of your employee compensation including PAN facilitation, registration for Provident Fund (PF), Citizen Investment Trust (CIT), and Social Security Fund (SSF).',
 3),

('Building', 'Business Registration',
 'Complete business setup services including company registration, FDI registration, and liaison office setup.',
 '["Company Registration","FDI Registration","Liaison Office Setup","Joint Ventures"]',
 'We provide complete business setup services to help you establish your presence smoothly. Our expertise covers company registration, Foreign Direct Investment (FDI) registration, and setting up liaison offices.',
 4),

('TrendingUp', 'Business Valuation',
 'Professional business valuation services and financial restructuring solutions for growing businesses.',
 '["Business Valuation","Financial Restructuring","Due Diligence","Investment Advisory"]',
 'Our professional business valuation services provide accurate assessments of your company''s worth, crucial for mergers, acquisitions, or strategic planning.',
 5),

('Shield', 'Compliance Services',
 'Ensure your business stays compliant with all regulatory requirements and statutory obligations.',
 '["Regulatory Compliance","Statutory Audits","Internal Audits","Risk Assessment"]',
 'We help ensure your business adheres to all regulatory requirements and statutory obligations. Our compliance services include navigating complex regulatory landscapes, conducting statutory and internal audits.',
 6),

('Briefcase', 'Representation Services',
 'Acting as official representatives for foreign or local entities in various business matters.',
 '["Official Representation","Government Liaison","Legal Compliance","Documentation"]',
 'We offer professional representation services, acting as official representatives for both foreign and local entities. Our role includes liaising with government bodies, ensuring legal compliance in all business dealings.',
 7),

('Globe', 'Deregistration Services',
 'Professional assistance with company closure and formal deregistration processes.',
 '["Company Closure","Asset Liquidation","Final Compliance","Documentation Support"]',
 'Our deregistration services provide professional assistance for company closure and formal deregistration processes.',
 8),

('Globe', 'Mortgage Facilitation Services (Australia)',
 'Wealthwise aids brokers with loan docs, ApplyOnline, and end-to-end processing.',
 '["Loan Docs","ApplyOnline","CRM (Nexus)","Full Loan Support"]',
 'At Wealthwise Consulting Pvt. Ltd., we provide comprehensive mortgage application facilitation services to clients in Australia. While we are not licensed mortgage brokers, we specialize in managing the backend process by assisting clients and partnering brokers with the full preparation and coordination required for home loan applications.',
 9),

('TrendingUp', 'Income Tax Return – Australia',
 'We help individuals, sole traders, and expats lodge accurate, compliant Australian tax returns through myGov and the ATO.',
 '["Lodgement through myGov/ATO","Maximisation of deductions","Assistance for residents & expats","Support for current & prior year returns"]',
 'We assist individuals, sole traders, and expats in preparing and lodging their Australian income tax returns through myGov and the Australian Taxation Office (ATO). Our expert team ensures accurate compliance with Australian tax laws, maximises your eligible deductions, and guarantees timely lodgement.',
 10);

-- ---------------------------------------------------------------
-- Team members
-- ---------------------------------------------------------------
INSERT IGNORE INTO team_members (name, position, qualification, image, description, full_description, experience, education, email, phone, linkedin, slug, sort_order) VALUES

('CA Kinjal Puri', 'Executive Chairman', 'Chartered Accountant, B.Com',
 '/images/kinjal.jpg',
 'Leading the firm with extensive experience in financial advisory and strategic planning.',
 'Mr. Kinjal Puri, the Executive Chairman of Wealthwise Consulting Pvt. Ltd., is a Chartered Accountant and holds a B.Com degree specializing in Accounting and Finance. With over 7 years of professional experience, he brings deep expertise in auditing, accounting, taxation, and business consulting.\n\nMr. Puri has completed his articleship at one of India''s top audit firms and has served as an Audit Manager at one of Nepal''s oldest and most respected firms. His career includes extensive audit and advisory work for multinational corporations, public sector undertakings, listed entities, and private companies across both India and Nepal.',
 '7+ years',
 '["Chartered Accountant","B.Com (Accounting and Finance) from India"]',
 'kinjal.wealthwise@outlook.com', '+977-9843066123', 'linkedin.com/in/kinjalpuri', 'ca-kinjal-puri', 1),

('CA Bibek Parajuli', 'Managing Director', 'Semi-qualified CA, Bachelor''s Degree',
 '/images/bibek.jpg',
 'Expert in taxation, compliance, and financial reporting with 5+ years of experience.',
 'Mr. Bibek Parajuli serves as the Managing Director of Wealthwise Consulting Pvt. Ltd. He is a semi-qualified Chartered Accountant and holds a Bachelor''s degree from Tribhuvan University, Nepal. With over 5 years of experience in accounting, financial management, and business consulting, Mr. Parajuli brings strong analytical and strategic insight to the firm.',
 '5+ years',
 '["Semi-qualified Chartered Accountant","Bachelor''s Degree from Tribhuvan University, Nepal"]',
 'bibek.wealthwise@outlook.com', '+977-9741819815', 'linkedin.com/in/bibekparajuli', 'ca-bibek-parajuli', 2),

('CA Ramesh Shrestha', 'Director', 'Chartered Accountant (ICAI)',
 '/images/ramesh.jpg',
 'Specializes in business valuation, audit, and corporate finance solutions.',
 'Mr. Ramesh Shrestha is a Chartered Accountant, qualified from the Institute of Chartered Accountants of India (ICAI), and serves as a Consultant and Founding Shareholder at Wealthwise Consulting Pvt. Ltd. With over 5 years of experience in auditing, accounting, and business advisory, Mr. Shrestha brings a practical and entrepreneurial perspective to the firm.',
 '5+ years',
 '["Chartered Accountant from ICAI (India)","Completed articleship from reputed Indian audit firm"]',
 'ramesh.wealthwise@outlook.com', '+977-9766954290', 'linkedin.com/in/rameshshrestha', 'mr-ramesh-shrestha', 3),

('CA Mausam Agrawal', 'Director', 'Chartered Accountant, Bachelor''s Degree',
 '/images/mausam.jpg',
 'Oversees operations and client relationships with focus on business development.',
 'Mr. Mausam Agrawal is a qualified Chartered Accountant and holds a Bachelor''s degree from Tribhuvan University (TU), Nepal. With over 8 years of overall experience and 4 years of post-qualification practice, he serves as a Consultant and Founding Shareholder at Wealthwise Consulting Pvt. Ltd.',
 '8+ years',
 '["Chartered Accountant","Bachelor''s Degree from Tribhuvan University, Nepal"]',
 'mausam.wealthwise@outlook.com', '+91-9910567594', 'linkedin.com/in/mausamagrawal', 'mr-mausam-agrawal', 4),

('Mr. Bishal Dangol', 'Senior Accountant', 'Semi-qualified CA',
 '/images/bishal.jpg',
 'Handles complex accounting operations and financial analysis with precision.',
 'Mr. Bishal Dangol is a semi-qualified Chartered Accountant who has completed his articleship from a reputed CA firm in India. He currently serves as a Senior Accountant at Wealthwise Consulting Pvt. Ltd., where he plays a key role in delivering high-quality financial and consulting services.',
 '5+ years',
 '["Semi-qualified Chartered Accountant","Completed articleship from reputed CA firm in India"]',
 'bishal.wealthwise@outlook.com', '+977-9765411536', 'linkedin.com/in/bishaldangol', 'mr-bishal-dangol', 5),

('Mr. Nabraj Baral', 'Finance Associate', 'Master''s & Bachelor''s Degree',
 '/images/nabraj.jpg',
 'Supports financial operations and client service delivery with dedication.',
 'Mr. Nabraj Baral holds both a Bachelor''s and a Master''s degree from Tribhuvan University (TU), Nepal. With over 3 years of professional experience, he brings solid academic grounding and practical exposure to his role as a Finance Associate at Wealthwise Consulting Pvt. Ltd.',
 '3+ years',
 '["Master''s Degree from Tribhuvan University, Nepal","Bachelor''s Degree from Tribhuvan University, Nepal"]',
 'nabraj.wealthwise@outlook.com', '+977-9866473399', 'linkedin.com/in/nabrajbaral', 'mr-nabraj-baral', 6),

('Mr. Mohit Kharel', 'Client Relationship Manager', 'MBA Finance & Marketing, BBA',
 '/images/mohit.jpg',
 'Manages client relationships and ensures exceptional service delivery.',
 'Mr. Mohit Kharel holds an MBA in Finance and Marketing, along with a BBA, both earned from a reputable institution in Dehradun, India. He currently serves as the Client Relationship Manager at Wealthwise Consulting Pvt. Ltd., where he oversees client communication, service coordination, and relationship management.',
 '5+ years',
 '["MBA in Finance and Marketing from Dehradun, India","BBA from Dehradun, India"]',
 'mohit.wealthwise@outlook.com', '+977-9815338646', 'linkedin.com/in/mohitkharel', 'mr-mohit-kharel', 7);

-- ---------------------------------------------------------------
-- Verification
-- ---------------------------------------------------------------
SELECT 'TABLE' AS type, table_name AS name, table_rows AS row_count
  FROM information_schema.tables
 WHERE table_schema = 'wealthwise_db'
ORDER BY table_name;
