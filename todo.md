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

## Create Meta Ad for Dementia Experience Training (Mar 5, 2026)
- [x] Generate scroll-stopping Meta ad image (1200x628px)
- [x] Write optimised Meta ad copy (primary text, headline, description)

## Update Dementia Experience Page Wording (Mar 5, 2026)
- [x] Fix simulation description: reframe goggles/audio as "perceptual changes + co-existing sensory impairment" not "dementia itself"
- [x] Soften "lasting behaviour change" claim to "can improve empathy, knowledge and care confidence"
- [x] Add pre-brief mention to the agenda (10-15 mins before simulation)
- [x] Update cancellation policy from 24 hours to 14 days notice
- [x] Add Dementia Training Standards Framework alignment note
- [x] Add Mental Capacity Act micro-segment to agenda
- [x] Add travel mileage rate reference (HMRC 45p/mile)

## International Women's Day Blog Post (Mar 8, 2026)
- [x] Write IWD blog post: Women in Dementia Care
- [x] Add blog post to database via admin seed/SQL
- [x] Ensure image placeholder is ready for user to upload

## SEO Canonical Fix (Mar 9, 2026)
- [x] Add canonical link tag to index.html pointing to https://outstandingdementiacare.com
- [x] Add www-to-non-www redirect in Express server
- [x] Add dynamic canonical tags per page via React Helmet or equivalent

## Daily Good News Bug Fix (Mar 11, 2026)
- [x] Investigate why "Generate Today's Edition" button is not working
- [x] Fix the generation issue - date comparison bug + server timeout + progress UI
- [x] Fix blank PDF on download (Feb 22 edition)
- [x] Fix Generate Today's Edition button not working
- [x] Regenerate Feb 22 edition with working PDF (PDF was always fine - browser display issue fixed)
- [x] Fix "View Example" button not working on Daily Good News page

## Daily Good News - Round 2 Fix (Mar 11, 2026)
- [x] Make PDF download open to all visitors (no login required)
- [x] Keep Generate button admin-only, hidden from visitors when no edition exists
- [x] Fix blank PDF - added server-side PDF proxy route to bypass CloudFront CORS restriction

## Daily Good News - PDF Generation Fix (Mar 11, 2026)
- [x] Fix blank/empty PDF being generated and stored in S3 (upgraded to PDF 1.7, added metadata)
- [x] Regenerate today's edition with working PDF (329KB, 3 pages, verified)

## Family Dementia Workshop Page (Mar 13, 2026)
- [x] Create FamilyWorkshop.tsx page with 90-min Zoom call details, pricing (£25), and payment link placeholder
- [x] Add route /family-workshop to App.tsx
- [x] Add "Family Workshop" link to navigation
- [ ] Care homes research: 30-mile radius of Gravesend, Kent - name, address, email, CQC rating, phone
- [ ] Compile care home data into downloadable Excel/CSV spreadsheet

## Family Dementia Workshop Page (Mar 13, 2026)
- [x] Create FamilyWorkshop.tsx page with 90-min Zoom call details, pricing (£25), and payment link placeholder
- [x] Add route /family-workshop to App.tsx
- [x] Add "Family Workshop" link to navigation

## Care Home Research Spreadsheet (Mar 13, 2026)
- [x] Download CQC directory (March 2026) - 56,000+ locations
- [x] Filter to care homes in postcodes within 30 miles of Gravesend
- [x] Geocode all postcodes using postcodes.io API
- [x] Filter by exact 30-mile radius using haversine distance (859 homes found)
- [x] Scrape CQC ratings for first 100 homes
- [x] Build colour-coded Excel spreadsheet with all data
- [x] Deliver spreadsheet to user

## Business Launch Features (Mar 13, 2026)
- [x] Create professional training brochure PDF (The Dementia Experience, 2-page, teal/gold design)
- [x] Create family workshop lead magnet ebook PDF (Understanding Dementia: A Practical Guide for Families, 7 pages)
- [x] Upload both PDFs to CDN
- [x] Install stripe and @stripe/stripe-js packages
- [x] Create server/products.ts with product definitions (£25 workshop, £650 training day, £1,750 programme)
- [x] Create server/stripeWebhook.ts with webhook handler and createCheckoutSession helper
- [x] Register Stripe webhook in server index BEFORE express.json()
- [x] Add payments.createCheckout tRPC procedure to routers.ts
- [x] Update FamilyWorkshop.tsx with live Stripe checkout button and loading state
- [x] Seed family ebook into database (Understanding Dementia guide)
- [x] Create 30-day ADHD-friendly business launch plan (PDF + Markdown)
- [ ] Claim Stripe sandbox (Kerry action required - deadline 12 May 2026)
- [ ] Add Consultancy page to website (3-Month Excellence Programme)
- [ ] Add newsletter email capture with Mailchimp integration
- [ ] Push code to GitHub (outstanding-dementia-care repo)

## Replace Logo (Mar 13, 2026)
- [x] Upload new Outstanding Dementia Care logo to CDN (Kerry's updated design with carer and older person)
- [x] Update Header.tsx to use new logo URL
- [x] Test logo displays correctly across all pages
- [x] Save checkpoint with new logo

## Replace Logo - Final Version (Mar 13, 2026)
- [x] Upload final Outstanding Dementia Care logo to CDN (diverse children holding Earth - global dementia care)
- [x] Update Header.tsx to use final logo URL
- [x] Save checkpoint with final logo


## HighLevel CRM Integration (Mar 13, 2026)
- [x] Add HighLevel API credentials to environment variables
- [x] Create HighLevel service (server/highlevel.ts) with contact creation function
- [x] Add downloadWithEmail procedure to ebook router
- [x] Update Ebooks page with email capture modal
- [x] Test TypeScript compilation and types
- [x] Verify HighLevel contact creation works end-to-end
- [x] Save checkpoint with HighLevel integration

## Dream Home Page (Mar 17, 2026)
- [x] Pull DreamHome.tsx and dreamHomeData.ts from GitHub commit
- [x] Download all 25 dream-home images from GitHub
- [x] Upload all 25 images to CDN
- [x] Update dreamHomeData.ts to use CDN URLs instead of local paths
- [x] Add DreamHome route to App.tsx
- [x] Add "Dream Home" link to Header.tsx navigation
- [x] Fix TypeScript errors
- [x] Save checkpoint with Dream Home page live

## Consultancy Page & Workshop Date (Mar 17, 2026)
- [x] Update Family Workshop page with 11th April 2026 date
- [x] Add seats remaining / urgency element to workshop page
- [x] Build Dementia Consultancy page with programme details
- [x] Add Consultancy nav link to header
- [x] Add Consultancy route to App.tsx
- [ ] Save checkpoint

## Full Site Audit & Fixes (Mar 17, 2026)
- [x] Fix Dream Home images (25 images were 0-byte empty files - regenerated and re-uploaded)
- [x] Update Consultancy page with real Google Calendar booking link
- [x] Add Consultancy section to homepage
- [x] Fix Family Workshop year from 2025 to 2026
- [x] Add "Add to Google Calendar" link for webinar on Family Workshop page
- [x] Create AdminBlog.tsx - full CRUD admin page for blog posts
- [x] Create AdminEbooks.tsx - full CRUD admin page for ebooks
- [x] Create AdminSupport.tsx - full CRUD admin page for support groups
- [x] Register admin sub-routes in App.tsx (/admin/blog, /admin/ebooks, /admin/support)
- [x] Implement voice recording with audio upload + Whisper transcription (was placeholder)
- [x] Fix stale TypeScript incremental build cache (disabled incremental compilation)
- [ ] Write vitest tests for admin procedures
- [ ] Push code to GitHub (outstanding-dementia-care repo)

## Consultancy Page Pricing Removal (Mar 23, 2026)
- [x] Remove all prices from Consultancy page (£1,750, £350, etc.)
- [x] Replace pricing cards with a free consultation CTA section
- [x] Keep programme details and outcomes but remove price references
- [x] Ensure "Book Your Free Call" button links to Google Calendar

## HighLevel Newsletter Integration (Mar 23, 2026)
- [x] Connect newsletter subscribe procedure to HighLevel CRM
- [x] Tag newsletter subscribers with "newsletter-subscriber" in HighLevel
- [ ] Test newsletter signup flows into HighLevel (verify with real signup)

## Booking Flow Simplification (Mar 23, 2026)
- [x] Update DementiaExperience page: replace all "Book Your Workshop" CTAs with "Book a Free 30-Minute Call"
- [x] Update DementiaExperience page: point BOOKING_URL to consultation calendar
- [x] Update DementiaExperience page: remove "Full payment required" text
- [x] Update Home page consultancy CTA to "Book a Free 30-Minute Call"
- [x] Update Consultancy page: all CTAs now say "Book a Free 30-Minute Call"
- [ ] Add Stripe payment link for The Dementia Experience (awaiting link from Kerry)
- [ ] Create 50% discount promo code in Stripe for March/April care home bookings

## Unified Booking Link (Mar 23, 2026)
- [x] Replace all Google Calendar booking links with unified 30-min Zoom call link (r1FrZpnQRMx9q6N57)
- [x] Updated: Home.tsx, DementiaExperience.tsx, Consultancy.tsx, FamilyWorkshop.tsx

## NEWCLIENT Promo Banner (Mar 23, 2026)
- [x] Add prominent promo section to homepage advertising NEWCLIENT discount code
- [x] Section to explain: 50% off first training session, use code NEWCLIENT, book a call to redeem
- [x] Include "Book Your Call" button linking to unified calendar link

## Social Media Footer Links (Mar 23, 2026)
- [x] Add Facebook icon link to footer (profile.php?id=61572413940255)
- [x] Add Instagram icon link to footer (@outstandingdementiacare)
- [x] Add TikTok icon link to footer (@outstandingdementiacare)

## Ask Dotty AI Chat Page (Mar 23, 2026)
- [x] Create server-side tRPC procedure for Dotty AI chat (dotty.chat)
- [x] Build AskDotty.tsx page with retro postcard/letter UI
- [x] Dotty personality: cheeky, down-to-earth, English elderly woman, time-traveller
- [x] Three modes: activity suggestions, quiz generator, reminiscence prompts
- [x] Use Dotty images from CDN as character illustrations
- [x] Add /ask-dotty route to App.tsx
- [x] Add Ask Dotty to main navigation

## OG Social Sharing Image (Mar 24, 2026)
- [x] Upload "I'm Still Here" image to CDN
- [x] Set as og:image in index.html meta tags
- [x] Set og:title, og:description, og:url correctly
- [x] Add Twitter Card meta tags too

## SEO & Analytics Audit (Mar 24, 2026)
- [x] Verify Google Analytics (G-HSR8VEQMJF) fires on all pages
- [x] Verify AdSense (ca-pub-3819753512414775) tag present in index.html
- [x] Check all pages have correct document title via useEffect
- [x] Add per-page document.title to all 14 pages
- [x] Confirm OG image, og:title, og:description set globally
- [x] sitemap.xml updated with Ask Dotty, Training, Family Workshop, Dream Home, Consultancy

## Header & UI Updates (Mar 24, 2026)
- [x] Update Masters sentence to add "(completing this summer 2026)"
- [x] New header: use OutstandingDementiaCareheader.png banner, two-row nav so all tabs fit
- [x] Rename "Voice Assistant" nav link to "Chat with Dotty" (clearer label)
- [x] Clarify voice assistant description on homepage hero
- [x] Build floating Dotty chat widget on all pages (business Q&A, contact capture, email Kerry@outstandingdementiacare.com)
