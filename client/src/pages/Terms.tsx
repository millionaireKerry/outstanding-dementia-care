import { useEffect } from 'react';
export default function Terms() {
  useEffect(() => {
    document.title = "Terms & Conditions | Outstanding Dementia Care";
    return () => { document.title = "Outstanding Dementia Care - Resources for Carers"; };
  }, []);

  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <div className="bg-card border-2 border-border rounded-lg p-8 md:p-12">
        <h1 className="retro-heading text-3xl md:text-4xl text-primary mb-2">Terms &amp; Conditions</h1>
        <p className="text-muted-foreground text-sm mb-8">Last updated: 2 March 2026</p>

        <div className="prose prose-sm max-w-none text-foreground space-y-8">

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Outstanding Dementia Care. By accessing or using our website at{" "}
              <strong>outstandingdementiacare.com</strong>, you agree to be bound by these Terms and Conditions. 
              Please read them carefully before using our site. If you do not agree with any part of these terms, 
              please do not use our website.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              These terms are governed by the laws of England and Wales. Outstanding Dementia Care is operated 
              by Kerry Goodearl.
            </p>
          </section>

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">2. About Our Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Outstanding Dementia Care is a free resource centre providing educational content, blog articles, 
              downloadable ebooks, support group directories, and tools for dementia carers. Our content is 
              created by Kerry Goodearl, who has 10 years of experience in dementia care and is completing a 
              Masters in Dementia.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              The information on this website is provided for general educational and informational purposes only. 
              It is not intended to replace professional medical, nursing, or care advice. Always seek the guidance 
              of a qualified healthcare professional for any medical or care-related concerns.
            </p>
          </section>

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">3. Medical Disclaimer</h2>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
              <p className="text-amber-900 leading-relaxed font-medium">
                Important: The content on Outstanding Dementia Care is for informational and educational purposes only. 
                It does not constitute medical advice, diagnosis, or treatment. The information provided should not be 
                used as a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified 
                healthcare professional before making any decisions about care or treatment for a person living with dementia.
              </p>
            </div>
          </section>

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">4. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on this website, including but not limited to blog posts, ebooks, images, graphics, 
              and the website design, is the intellectual property of Kerry Goodearl / Outstanding Dementia Care 
              unless otherwise stated. All rights are reserved.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              You may share our content for non-commercial purposes provided you give clear attribution to 
              Outstanding Dementia Care and include a link back to the original content. You may not reproduce, 
              distribute, or create derivative works from our content for commercial purposes without our express 
              written permission.
            </p>
          </section>

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">5. Free Resources & Downloads</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our ebooks and downloadable resources are provided free of charge for personal and professional 
              use in dementia care settings. You may share these resources with colleagues and within your 
              organisation, provided they are not sold or used for commercial gain. The resources remain the 
              intellectual property of Outstanding Dementia Care.
            </p>
          </section>

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">6. Third-Party Links & Products</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website contains links to third-party websites and products, including The Listening Pod, 
              Care Documentation Audit, Care Home Surveys, Dementia Pocket Expert, and Love Letter Tales. 
              These are separate products with their own terms, conditions, and pricing. We are not responsible 
              for the content, accuracy, or practices of any third-party websites.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We also link to external support organisations and resources. These links are provided for 
              informational purposes only and do not constitute an endorsement of those organisations.
            </p>
          </section>

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">7. Advertising</h2>
            <p className="text-muted-foreground leading-relaxed">
              This website is monetised through Google AdSense. Advertisements displayed on our site are 
              served by Google and are not endorsements of the products or services advertised. We have no 
              control over the specific advertisements displayed. If you have concerns about an advertisement, 
              please use Google's ad reporting tools.
            </p>
          </section>

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">8. Voice Assistant (Dementia Pocket Expert)</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our AI-powered voice assistant is provided as an educational tool to help carers access information 
              about dementia care. The responses generated by the voice assistant are for informational purposes 
              only and should not be relied upon as professional medical or care advice. The assistant may 
              occasionally provide inaccurate information, and users should always verify important information 
              with qualified professionals.
            </p>
          </section>

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">9. Daily Good News</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Daily Good News feature generates AI-assisted content for use in care settings. The stories 
              and information contained in generated editions are for entertainment and wellbeing purposes. 
              While we strive for accuracy, we cannot guarantee the factual accuracy of all AI-generated content. 
              Users should exercise their own judgement when sharing content with residents.
            </p>
          </section>

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">10. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the fullest extent permitted by law, Outstanding Dementia Care and Kerry Goodearl shall not 
              be liable for any direct, indirect, incidental, consequential, or special damages arising from 
              your use of this website or reliance on any information contained herein. We make no warranties, 
              express or implied, about the completeness, accuracy, reliability, or suitability of the 
              information on this website.
            </p>
          </section>

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">11. Newsletter</h2>
            <p className="text-muted-foreground leading-relaxed">
              By subscribing to our newsletter, you consent to receiving periodic emails about new blog posts, 
              resources, and updates from Outstanding Dementia Care. You may unsubscribe at any time by clicking 
              the unsubscribe link in any email we send, or by contacting us directly. We will never share your 
              email address with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">12. Changes to These Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to update these Terms and Conditions at any time. Changes will be posted 
              on this page with an updated date. Your continued use of the website after any changes constitutes 
              your acceptance of the new terms. We encourage you to review these terms periodically.
            </p>
          </section>

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">13. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <div className="mt-3 p-4 bg-muted rounded-lg">
              <p className="text-foreground font-semibold">Outstanding Dementia Care</p>
              <p className="text-muted-foreground">Email: hello@outstandingdementiacare.com</p>
              <p className="text-muted-foreground">Website: outstandingdementiacare.com</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
