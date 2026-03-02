export default function PrivacyPolicy() {
  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <div className="bg-card border-2 border-border rounded-lg p-8 md:p-12">
        <h1 className="retro-heading text-3xl md:text-4xl text-primary mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-8">Last updated: 2 March 2026</p>

        <div className="prose prose-sm max-w-none text-foreground space-y-8">

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">1. Who We Are</h2>
            <p className="text-muted-foreground leading-relaxed">
              Outstanding Dementia Care is a free resource centre for dementia carers, operated by Kerry Goodearl. 
              Our website is located at <strong>outstandingdementiacare.com</strong>. We provide educational materials, 
              blog articles, free ebooks, support group directories, and innovative tools to support those caring 
              for people living with dementia.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              If you have any questions about this privacy policy or how we handle your data, please contact us at: 
              <strong> hello@outstandingdementiacare.com</strong>
            </p>
          </section>

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">2. What Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We collect the following types of information when you use our website:
            </p>
            <div className="space-y-3">
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold text-foreground">Account Information</p>
                <p className="text-muted-foreground text-sm">If you create an account or sign in via Google, we collect your name and email address for authentication purposes.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold text-foreground">Newsletter Subscriptions</p>
                <p className="text-muted-foreground text-sm">If you subscribe to our newsletter, we collect your email address to send you updates about new blog posts and resources.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold text-foreground">Usage Data</p>
                <p className="text-muted-foreground text-sm">We collect anonymised data about how you use our website (pages visited, time spent) via Google Analytics to help us improve the site.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold text-foreground">Cookies</p>
                <p className="text-muted-foreground text-sm">We use cookies to remember your preferences and to enable advertising via Google AdSense. See our Cookie Policy section below for full details.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-3 ml-2">
              <li>To provide and maintain our website and services</li>
              <li>To send you our newsletter if you have subscribed (you may unsubscribe at any time)</li>
              <li>To understand how visitors use our site so we can improve it</li>
              <li>To display relevant advertisements via Google AdSense</li>
              <li>To comply with our legal obligations</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We will never sell your personal data to third parties, and we will never use your data for purposes 
              other than those listed above without your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">4. Legal Basis for Processing (UK GDPR)</h2>
            <p className="text-muted-foreground leading-relaxed">
              Under the UK General Data Protection Regulation (UK GDPR), we process your personal data on the 
              following legal bases:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-3 ml-2">
              <li><strong>Consent</strong> – for newsletter subscriptions and non-essential cookies</li>
              <li><strong>Legitimate interests</strong> – for website analytics to improve our service</li>
              <li><strong>Contract performance</strong> – to provide services you have requested (e.g. account access)</li>
            </ul>
          </section>

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">5. Cookie Policy</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Cookies are small text files stored on your device when you visit a website. We use the following types of cookies:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left font-semibold text-foreground">Cookie Type</th>
                    <th className="border border-border p-3 text-left font-semibold text-foreground">Purpose</th>
                    <th className="border border-border p-3 text-left font-semibold text-foreground">Required?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3 text-muted-foreground">Essential</td>
                    <td className="border border-border p-3 text-muted-foreground">Session management and security (login state)</td>
                    <td className="border border-border p-3 text-muted-foreground">Yes</td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="border border-border p-3 text-muted-foreground">Analytics (Google Analytics)</td>
                    <td className="border border-border p-3 text-muted-foreground">Understanding how visitors use our site (anonymised)</td>
                    <td className="border border-border p-3 text-muted-foreground">No – consent required</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 text-muted-foreground">Advertising (Google AdSense)</td>
                    <td className="border border-border p-3 text-muted-foreground">Displaying relevant advertisements to support our free service</td>
                    <td className="border border-border p-3 text-muted-foreground">No – consent required</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground leading-relaxed mt-3">
              You can manage your cookie preferences at any time using the cookie settings button at the bottom of any page, 
              or by adjusting your browser settings. Please note that disabling certain cookies may affect the functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">6. Google AdSense & Third-Party Advertising</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use Google AdSense to display advertisements on our website. Google may use cookies and similar 
              technologies to serve ads based on your prior visits to our website or other websites. You can opt out 
              of personalised advertising by visiting{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Google's Ad Settings
              </a>. 
              For more information about how Google uses data, please visit{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Google's Privacy Policy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">7. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-3 ml-2">
              <li>Account data is retained for as long as your account is active</li>
              <li>Newsletter subscriptions are retained until you unsubscribe</li>
              <li>Analytics data is retained for 26 months (Google Analytics default)</li>
            </ul>
          </section>

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">8. Your Rights Under UK GDPR</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              As a UK resident, you have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-2">
              <li><strong>Right of access</strong> – you can request a copy of the data we hold about you</li>
              <li><strong>Right to rectification</strong> – you can ask us to correct inaccurate data</li>
              <li><strong>Right to erasure</strong> – you can ask us to delete your data ("right to be forgotten")</li>
              <li><strong>Right to restrict processing</strong> – you can ask us to limit how we use your data</li>
              <li><strong>Right to data portability</strong> – you can request your data in a portable format</li>
              <li><strong>Right to object</strong> – you can object to processing based on legitimate interests</li>
              <li><strong>Right to withdraw consent</strong> – where processing is based on consent, you may withdraw it at any time</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              To exercise any of these rights, please contact us at <strong>hello@outstandingdementiacare.com</strong>. 
              You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at{" "}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ico.org.uk</a>.
            </p>
          </section>

          <section>
            <h2 className="retro-subheading text-xl text-primary mb-3">9. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this privacy policy from time to time. When we do, we will update the "Last updated" date 
              at the top of this page. We encourage you to review this policy periodically to stay informed about 
              how we protect your information.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
