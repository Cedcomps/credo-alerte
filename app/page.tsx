import { createClient } from "@/utils/supabase/server";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Nav";
import { ClientHeader, ClientFetchDataSteps } from './client/ClientComponents';

export default async function Index() {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };
  console.log('Rendering on the server');

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navbar />

      <div className="mt-28 animate-in flex-1 flex flex-col gap-20 max-w-4xl px-3">
      <ClientHeader />
        <div className="flex-1 flex flex-col gap-6">
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
      The answer comes down to two words: simplicity and affordability.
      <br /><br />
We designed CredoAlert with a clear goal in mind: to make emergency alert management accessible to everyone, regardless of the size of your organization or your technical expertise. Where platforms like Everbridge, Singlewire, Navigate360, or Alertus can seem complex and oversized, CredoAlert offers you a streamlined and intuitive user experience. Send your alerts with just a few clicks, without getting lost in unnecessary features.
<br /><br />
This simplicity does not come at the expense of effectiveness. On the contrary, it allows you to save precious time in a crisis situation. When every second counts, you can count on CredoAlert to broadcast your emergency messages as reliably and quickly as Rave Mobile Safety, Restrata, F24, or Crisis24.
<br /><br />
We also believe that security should not be a luxury. That's why we wanted to make CredoAlert affordable, especially for small businesses and communities that often have limited budgets. Unlike AlertMedia, Noggin, OnSolve, or Vismo, which can represent a significant investment, CredoAlert offers you excellent value for money. You benefit from a high-performance and secure alert system without breaking the bank.
<br /><br />
With CredoAlert, emergency management is no longer reserved for large organizations. Regardless of your size, you can now ensure the safety of your teams and your citizens in a simple and affordable way. That's our difference.
        <br /><br />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</section>

        </div>
      </div>

     
    </div>
  );
}
