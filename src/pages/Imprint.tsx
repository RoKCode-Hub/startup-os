
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";

const Imprint = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <Section 
          id="imprint"
          title="Imprint"
          description="Legal information about our website"
        >
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2>Company Information</h2>
            <p>
              Startup OS<br />
              123 Design St<br />
              Creative City, 12345<br />
              Country
            </p>

            <h2>Contact</h2>
            <p>
              Email: hello@startupos.com<br />
              Phone: +1 (555) 123-4567
            </p>

            <h2>Legal Representatives</h2>
            <p>
              John Doe, CEO<br />
              Jane Smith, COO
            </p>

            <h2>Regulatory Information</h2>
            <p>
              Commercial Register: Sample Registry<br />
              Registration Number: 12345<br />
              VAT ID: DE123456789
            </p>

            <h2>Disclaimer</h2>
            <p>
              Despite careful content control, we assume no liability for the content of external links. 
              The operators of the linked pages are solely responsible for their content.
            </p>
          </div>
        </Section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Imprint;
