import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Nav";

export default async function Index() {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navbar />

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <section className="features">
            <h2 className="text-4xl font-bold mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Instant Notifications</h3>
                <p>Send real-time alerts to your team and contacts.</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Message Customization</h3>
                <p>Tailor your notifications based on the type of emergency and recipients.</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Contact Management</h3>
                <p>Easily organize and manage your contact list for targeted distribution.</p>
              </div>
            </div>
          </section>

          <section className="cta">
            <h2 className="text-4xl font-bold mb-4">Ready to Secure Your Business?</h2>
            <p className="text-xl mb-8">Sign up now and benefit from the 30-day Pro edition.</p>
            <button className="bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-dark">Sign Up</button>
          </section>
          
          <section className="faq">
  <h2 className="text-4xl font-bold mb-8">Frequently Asked Questions</h2>
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>How can I configure my emergency notifications?</AccordionTrigger>
      <AccordionContent>
        You can configure your emergency notifications by logging into your Credo Alert account and accessing the notification settings. There, you can customize messages, choose recipients, and define alert triggers.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-2">
      <AccordionTrigger>What distribution channels are available?</AccordionTrigger>
      <AccordionContent>
        Credo Alert supports sending notifications via SMS, email, voice calls, and push notifications. You can choose the channels that best suit your situation and contacts.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-3">
      <AccordionTrigger>Can I import my existing contact list?</AccordionTrigger>
      <AccordionContent>
        Yes, you can easily import your existing contact list into Credo Alert from a CSV file or using our API. You can then organize and segment your contacts according to your needs.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-4">
      <AccordionTrigger>How does Credo Alert compare to other crisis management providers?</AccordionTrigger>
      <AccordionContent>
        While there are well-known crisis management providers like F24, Everbridge, and OnSolve, Credo Alerte differentiates itself through its simplicity and affordability. We focus on providing the essential features you need to effectively manage and communicate during a crisis, without the complexity and high costs often associated with feature-heavy solutions.
        <br /><br />
        Our intuitive interface and streamlined processes ensure that you can quickly and easily send emergency notifications when it matters most. We believe that a crisis management solution should be accessible to organizations of all sizes, which is why we offer our service at a price point that is up to 10 times more affordable than our competitors.
        <br /><br />
        With Credo Alert, you get a powerful yet simple solution that allows you to focus on what's important during a crisis: communicating with your team and stakeholders to ensure their safety and well-being.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</section>

        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://credo-innovation.ca"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Crédo Innovation Inc.
          </a>
        </p>
      </footer>
    </div>
  );
}
