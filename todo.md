# Outstanding Dementia Care - Project TODO

## Database Schema & Backend
- [x] Design database schema for blog posts with categories and tags
- [x] Design database schema for ebooks with categories and file storage
- [x] Design database schema for support groups directory
- [x] Implement tRPC procedures for blog CRUD operations
- [x] Implement tRPC procedures for ebook management
- [x] Implement tRPC procedures for support groups management
- [ ] Set up S3 file storage for ebook PDFs
- [ ] Implement search functionality backend for blogs and ebooks

## 1950s Retro Design & Theming
- [x] Create vintage color palette (pastels, warm tones typical of 1950s)
- [x] Integrate period-appropriate typography (serif fonts, retro headings)
- [x] Design CSS variables for consistent retro theme
- [x] Add retro design elements (borders, patterns, vintage styling)
- [x] Ensure accessibility and readability with retro aesthetic

## Core Layout & Navigation
- [x] Design user-friendly navigation for non-technical users
- [x] Create responsive header with clear menu structure
- [x] Build footer with links and information
- [x] Implement homepage with welcoming retro design
- [x] Ensure mobile-responsive layout throughout

## Blog System
- [x] Create blog listing page with search and filters
- [x] Build individual blog post page with retro styling
- [ ] Implement admin interface for creating blog posts
- [ ] Add blog post editing and deletion functionality
- [x] Implement categories and tags for blog organization
- [ ] Add featured blog posts section on homepage

## Ebook Library
- [x] Create ebook library listing page with categories
- [ ] Implement PDF upload functionality for admin
- [x] Build ebook detail pages with download buttons
- [x] Add categorization system for ebooks
- [x] Implement search within ebook library
- [x] Display ebook previews and descriptions

## Support Groups Directory
- [x] Create support groups listing page
- [ ] Implement admin interface for adding support group links
- [x] Add categorization for different types of support groups
- [x] Display external links with clear indicators
- [x] Add search/filter functionality for support groups

## Product Showcase
- [x] Create products page with retro card design
- [x] Add Listening Pod product section with description and link
- [x] Add Care Documentation Audit product section with link
- [x] Add Care Home Surveys product section with link
- [x] Ensure clear call-to-action buttons for each product

## Voice Agent Integration
- [ ] Integrate voice recording functionality (placeholder added)
- [x] Implement speech-to-text using Whisper API (backend ready)
- [x] Create Dementia Pocket Expert voice agent interface
- [x] Add voice agent to prominent location on site
- [x] Implement conversation history and responses
- [ ] Test voice agent with dementia care queries

## AdSense Integration
- [ ] Set up AdSense configuration
- [ ] Implement ad placement in strategic locations
- [ ] Optimize ad placement for user experience
- [ ] Test AdSense integration

## Search & Additional Features
- [ ] Implement global search across blogs and ebooks
- [ ] Add search results page with filtering
- [ ] Optimize search performance
- [ ] Add breadcrumb navigation for better UX

## Testing & Quality Assurance
- [ ] Write vitest tests for blog procedures
- [ ] Write vitest tests for ebook procedures
- [ ] Write vitest tests for support groups procedures
- [ ] Write vitest tests for voice agent functionality
- [ ] Test responsive design on multiple devices
- [ ] Test accessibility for non-technical users
- [ ] Cross-browser testing

## Deployment & GitHub
- [ ] Create final checkpoint
- [ ] Create GitHub repository 'outstanding-dementia-care'
- [ ] Push code to GitHub
- [ ] Document deployment instructions

## Blog Layout Update (New Request)
- [x] Upload blog header image to S3
- [x] Update blog page layout to match UK Business Automations style
- [x] Add blog header image to blog page
- [x] Import sample blog post content
- [x] Test blog layout and functionality
- [x] Add introduction blog post to database with cover image

## UK Spelling Conversion (New Request)
- [ ] Check and convert US spelling to UK English in all pages
- [ ] Update blog post content with UK spelling
- [ ] Verify all text content uses UK English conventions

## Product Logos Integration (New Request)
- [x] Upload all product logos to S3
- [x] Add Outstanding Dementia Care logo to header
- [x] Add product logos to homepage product cards
- [x] Add product logos to detailed product pages

## Add Dementia Pocket Expert Product (New Request)
- [x] Upload Dementia Pocket Expert logo to S3
- [x] Add Dementia Pocket Expert to homepage product cards
- [x] Add Dementia Pocket Expert to products page with full details

## Voice Agent Enhancement (New Request)
- [x] Build voice recording functionality with speech-to-text
- [x] Add knowledge base about the website for answering site questions
- [x] Add emergency contact information (999, NHS 111, dementia helplines)
- [x] Implement conversational AI for natural question answering
- [x] Test voice agent with common dementia care questions

## Add Ebooks to Library (New Request)
- [x] Upload ebook PDFs to S3
- [x] Upload ebook cover images to S3
- [x] Add "An Introduction to Dementia" ebook to database
- [x] Add "The Importance of Life Stories" ebook to database
- [x] Add "Accessibility Over Aesthetics" ebook to database

## Update Product Links (New Request)
- [x] Update product links to open in new tabs
- [x] Add correct URLs for all four products
- [x] Test product links work correctly

## Add Support Group Links (New Request)
- [x] Add UK dementia support organizations to database
- [x] Populate Support Groups page with real links

## Convert US to UK Spelling (New Request)
- [x] Fix "organizations" to "organisations" on Support page
- [x] Check all pages for US spelling (organize, color, center, etc.)
- [x] Update any US spellings found to UK English

## Fix Blog Post Display Issue (New Request)
- [x] Check database for blog post data
- [x] Verify blog post query is working correctly
- [x] Fix any issues preventing blog posts from displaying
- [x] Test blog page shows introduction post

## Newsletter Signup Feature (New Request)
- [x] Add newsletter_subscribers table to database schema
- [x] Create tRPC procedures for newsletter subscription
- [x] Add newsletter signup component to footer
- [x] Add newsletter signup section on homepage
- [x] Implement email validation
- [x] Add admin view to see newsletter subscribers
- [x] Test newsletter signup functionality

## Add Love Letter Tales Product (New Request)
- [x] Upload Love Letter Tales logo to S3
- [x] Add Love Letter Tales to homepage product cards
- [x] Add Love Letter Tales to products page with full details
- [x] Update product links to include Love Letter Tales

## Add Love Letters Blog Post (New Request)
- [x] Upload Love Letters blog cover image to S3
- [x] Add "The Lost Art of the Letter" blog post to database
- [x] Test blog post displays correctly

## Connect Custom Domain for AdSense (New Request)
- [x] Guide user to connect outstandingdementiacare.com domain in Management UI
- [ ] Verify domain connection for AdSense verification (user action required)

## Integrate Google AdSense (New Request)
- [x] Add AdSense script to website head
- [x] Add ad placements on blog pages
- [x] Add ad placements on homepage
- [x] Test AdSense integration

## Daily Good News Feature (New Request)
- [x] Research Daily Sparkle format and design approach
- [x] Find good news API sources for positive stories
- [x] Design database schema for storing generated newspapers
- [x] Create backend logic to fetch good news stories
- [x] Add reminiscence story generation/selection
- [x] Implement PDF generation with newspaper layout
- [x] Create frontend page for care homes to generate/download PDFs
- [x] Add authentication/login for care homes
- [x] Test PDF generation with real news content
- [x] Style PDF to look like a newspaper (not patronizing)

## Update Header Colors (New Request)
- [x] Change header text color to #357372 (teal)
- [x] Change header shadow/outline to #bc9c2f (gold)
- [x] Test color changes across all pages

## Daily Good News Example Feature (New Request)
- [x] Generate today's Daily Good News edition
- [x] Store example edition in database
- [x] Add public route to view example PDF
- [x] Add "View Example" button to Daily Good News page
- [x] Test example viewing without login

## Daily Good News UK Fixes (New Request)
- [x] Fix PDF formatting to remove blank pages
- [x] Update content generation to use UK English spelling
- [x] Change terminology from "seniors" to UK terms (older people/residents)
- [x] Focus news generation on UK news sources and stories
- [x] Regenerate example edition with UK content
- [x] Test updated PDF formatting

## Add Open Graph Meta Tags (New Request)
- [x] Add OG meta tags to index.html for default site sharing
- [x] Add dynamic OG meta tags to blog post pages (title, description, image)
- [x] Add OG meta tags for Twitter Cards
- [ ] Test OG tags with Facebook Sharing Debugger
- [x] Ensure blog cover images appear when shared on social media

## Add Four New Blog Posts (New Request)
- [x] Upload Home Movie Night blog cover image to S3
- [x] Upload The Boomers Are Coming blog cover image to S3
- [x] Upload Who Do You Think You Are blog cover image to S3
- [x] Upload Wish You Were Here blog cover image to S3
- [x] Add "Home Movie Night" blog post to database
- [x] Add "The Boomers Are Coming" blog post to database
- [x] Add "Who Do You Think You Are" (ancestry) blog post to database
- [x] Add "Wish You Were Here" (virtual travel) blog post to database

## Add Five Additional Blog Posts (Batch 2)
- [ ] Upload "Watching TV is an Activity" blog cover image to S3
- [x] Upload "Step Away From The Pool Noodle" blog cover image to S3
- [ ] Add "Watching TV is an Activity" blog post to database (meaningful-activities-not-tick-box-blog.md)
- [ ] Add "Step Away From The Pool Noodle" blog post to database (pool-noodle-right-to-do-nothing-dementia-care-blog.md)
- [ ] Add "A Walk Down Memory Lane" blog post to database (walk-down-memory-lane-streetview-blog.md)

## Pin Welcome Blog Post (New Request)
- [x] Set welcome blog post as featured in database
- [x] Update blog query to sort featured posts first
- [x] Test that welcome post appears at top of blog page

## Add Nine Additional Blog Posts (Feb 22, 2026)
- [x] Activities Are Not a Tick Box
- [x] Walk Down Memory Lane (Street View)
- [x] That's My Spot (Comfort of Familiarity)
- [x] Mealtimes Dining Experience
- [x] Daily Good News
- [x] Dementia Pocket Expert (Product)
- [x] Care Home Survey Dashboard (Product)
- [x] Care Documentation Audit (Product)
- [x] The Listening Pod (Product)

## Fix Nested Anchor Tag Error (Feb 22, 2026)
- [x] Fix nested <a> tag error on blog page

## Fix Blog Display Issues (Feb 22, 2026)
- [x] Fix welcome post not appearing at top despite being featured
- [x] Fix recent blog posts showing as "Draft" instead of published date
- [x] Add missing cover images to recent blog posts

## Add Final Two Blog Posts (Feb 22, 2026)
- [x] Upload "The Generation Gap" blog cover image to S3
- [x] Upload "Step Away From The Pool Noodle" blog cover image to S3
- [x] Add "Different Generations, Same Care" blog post to database
- [x] Add "Put Down the Pool Noodle" blog post to database

## Blog Category Filter Feature (Feb 22, 2026)
- [x] Add category filter buttons to blog page
- [x] Implement category filtering logic
- [x] Style category filter with active states
- [x] Test category filtering functionality

## Fix Spelling Error in Pool Noodle Blog (Feb 22, 2026)
- [ ] Fix "busyness" to "business" in pool noodle blog post

## Enhance Daily Good News PDF Content (Feb 22, 2026)
- [x] Review current PDF generation and content
- [x] Increase content per page to make it more substantial
- [x] Add more detailed stories and articles
- [x] Improve layout to fill pages properly
- [x] Regenerate example edition with enhanced content

## Add Banner to Daily Good News PDF (Feb 22, 2026)
- [x] Upload banner image to S3
- [x] Integrate banner into PDF header
- [x] Regenerate example edition with banner

## Remove Markdown Asterisks from Daily Good News PDF (Feb 22, 2026)
- [x] Update LLM prompts to prevent markdown formatting
- [x] Add markdown stripping to PDF generation
- [x] Regenerate example edition without asterisks

## Add Google Analytics (Feb 22, 2026)
- [x] Add Google Analytics tracking code (G-HSR8VEQMJF) to website

## Create ads.txt File (Feb 28, 2026)
- [x] Create ads.txt in public directory with AdSense publisher ID

## Add AdSense Meta Tag (Feb 28, 2026)
- [x] Add google-adsense-account meta tag (ca-pub-3819753512414775) to index.html

## Legal & Compliance Pages (Mar 2, 2026)
- [x] Create sitemap.xml in public directory with all routes
- [x] Create Privacy Policy page
- [x] Create Terms & Conditions page
- [x] Add cookie consent banner with accept/decline options
- [x] Add footer links to Privacy Policy and Terms pages
- [x] Register routes for new pages in App.tsx

## The Dementia Experience Training Page (Mar 4, 2026)
- [x] Create DementiaExperience.tsx page with benefits headline, agenda, pricing, T&Cs
- [x] Add route /dementia-experience to App.tsx
- [x] Add navigation link in header/footer
- [x] Add Book Now button linking to Google Calendar

## Fix Em Dashes & UK English on Dementia Experience Page (Mar 4, 2026)
- [x] Remove all em dashes from DementiaExperience.tsx
- [x] Convert all American English spellings to UK English
