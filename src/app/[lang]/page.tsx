import { About } from "@/components/About";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Contact } from "@/components/Contact";
import { Estimator } from "@/components/Estimator";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { QuickContact } from "@/components/QuickContact";
import { QuoteForm } from "@/components/QuoteForm";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { Team } from "@/components/Team";
import { Trust } from "@/components/Trust";
export default function HomePage() {
  return <><Hero /><QuickContact /><Services /><Projects /><BeforeAfter /><About /><Team /><Process /><Estimator /><Pricing /><QuoteForm /><Reviews /><Trust /><Faq /><Contact /></>;
}
