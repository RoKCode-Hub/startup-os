
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";

const DataPrivacy = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <Section 
          id="data-privacy"
          title="Data Privacy"
          description="Information about how we handle your data"
        >
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2>Privacy Policy</h2>
            <p>
              At Startup OS, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you visit our website.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We may collect personal identification information from users in various ways, including, 
              but not limited to, when users visit our site, register on the site, subscribe to the newsletter, 
              and in connection with other activities, services, features, or resources we make available.
            </p>

            <h2>How We Use Your Information</h2>
            <p>
              We may use the information we collect from you to:
            </p>
            <ul>
              <li>Personalize your experience</li>
              <li>Improve our website</li>
              <li>Process transactions</li>
              <li>Send periodic emails</li>
              <li>Administer promotions, surveys, or other site features</li>
            </ul>

            <h2>Cookies</h2>
            <p>
              We use cookies to enhance your experience on our site. These are small files that a site 
              transfers to your computer's hard drive through your web browser that enables our systems 
              to recognize your browser and capture and remember certain information.
            </p>

            <h2>Third-Party Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to 
              outside parties unless we provide you with advance notice and obtain your consent.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:<br />
              hello@startupos.com
            </p>
          </div>
        </Section>
      </div>
      
      <Footer />
    </div>
  );
};

export default DataPrivacy;
