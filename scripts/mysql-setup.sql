-- Create database
CREATE DATABASE IF NOT EXISTS wealthwise_db;
USE wealthwise_db;

-- Create blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  image VARCHAR(500),
  status VARCHAR(20) DEFAULT 'Published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'New',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(100),
  role VARCHAR(20) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample blog posts
INSERT INTO blog_posts (title, excerpt, content, author, category, image) VALUES
('Understanding VAT Implementation in Nepal: A Complete Guide', 'Learn about the latest VAT regulations and how they affect your business operations in Nepal.', '<h2>Introduction to VAT in Nepal</h2><p>Value Added Tax (VAT) is a crucial component of Nepal''s tax system. Understanding its implementation is essential for businesses operating in Nepal.</p><h2>Key VAT Regulations</h2><p>The VAT system in Nepal follows specific regulations that businesses must comply with. Here are the key points:</p><ul><li>Standard VAT rate is 13%</li><li>Registration threshold for businesses</li><li>Monthly filing requirements</li><li>Input tax credit mechanisms</li></ul>', 'CA Muskan Agrawal', 'Tax', '/placeholder.svg?height=200&width=400'),
('Business Registration Process in Nepal: Step by Step', 'A comprehensive guide to registering your business in Nepal, including required documents and procedures.', '<h2>Getting Started</h2><p>Registering a business in Nepal involves several steps and requires proper documentation.</p><h2>Required Documents</h2><ul><li>Company name reservation</li><li>Memorandum and Articles of Association</li><li>Board resolution</li><li>Shareholder details</li></ul>', 'Jiban Prajuli', 'Business', '/placeholder.svg?height=200&width=400'),
('Financial Planning Strategies for Small Businesses', 'Essential financial planning tips to help small businesses grow and maintain healthy cash flow.', '<h2>Cash Flow Management</h2><p>Effective cash flow management is crucial for small business success.</p><h2>Investment Strategies</h2><p>Smart investment decisions can help your business grow sustainably.</p>', 'CA Manish Shrestha', 'Finance', '/placeholder.svg?height=200&width=400'),
('ESG Compliance for Nepali Corporations', 'Environmental, Social, and Governance compliance requirements for modern businesses in Nepal.', '<h2>ESG Framework</h2><p>Environmental, Social, and Governance (ESG) factors are becoming increasingly important for businesses.</p>', 'Kinjal Puri', 'Compliance', '/placeholder.svg?height=200&width=400'),
('Remote Work Tax Implications in Nepal', 'Tax considerations for businesses adopting remote work policies and digital nomads.', '<h2>Tax Implications</h2><p>Remote work brings unique tax challenges that businesses must address.</p>', 'CA Muskan Agrawal', 'Tax', '/placeholder.svg?height=200&width=400');

-- Insert default admin user (password: wealthwise2024)
-- Note: In production, use proper password hashing
INSERT INTO admin_users (username, password_hash, email) VALUES
('admin', '$2b$10$rGKqDxhQJQmhQJQmhQJQmOK7vr3UzvDuez6MjAMjAMjAMjAMjAMjA', 'admin@wealthwise.com');
