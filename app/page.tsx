import About from "./components/About";
import Contact from "./components/Contact";
import DevelopmentWorkflow from "./components/DevelopmentWorkflow";
import DevOpsSkills from "./components/DevOpsSkills";
import Footer from "./components/Footer";
import HardwareElectronics from "./components/HardwareElectronics";
import { Hero } from "./components/Hero";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import Stack from "./components/Stack";
import Tools from "./components/Tools";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO + główne H1 SEO */}
      <section className="">
        <h1 className="sr-only">
          Freelancer IT – Fullstack Developer – DevOps – Robert Senenko
        </h1>
        <Hero />
      </section>

      {/* STACK – technologie developerskie */}
      <section aria-labelledby="stack-heading">
        <h2 id="stack-heading" className="sr-only">
          Tech stack – technologie, w których pracuję jako developer
        </h2>
        <Stack />
      </section>

      {/* DevOps – serwery i infrastruktura */}
      <section aria-labelledby="devops-heading">
        <h2 id="devops-heading" className="sr-only">
          DevOps – infrastruktura, serwery, kontenery, CI/CD
        </h2>
        <DevOpsSkills />
      </section>

      {/* Tools – narzędzia */}
      <section aria-labelledby="tools-heading">
        <h2 id="tools-heading" className="sr-only">
          Tools – narzędzia, z których korzystam na co dzień
        </h2>
        <Tools />
      </section>

      {/* Workflow – proces developmentu */}
      <section aria-labelledby="workflow-heading">
        <h2 id="workflow-heading" className="sr-only">
          Workflow – proces tworzenia aplikacji
        </h2>
        <DevelopmentWorkflow />
      </section>

      {/* Hardware & Electronics  */}
      <section aria-labelledby="hardware-heading">
        <h2 id="hardware-heading" className="sr-only">
          Hardware & Electronics – serwis i elektronika komputerowa
        </h2>
        <HardwareElectronics />
      </section>

      {/* ABOUT – o mnie */}
      <section aria-labelledby="about-heading">
        <h2 id="about-heading" className="sr-only">
          O mnie – kim jestem jako freelancer IT
        </h2>
        <About />
      </section>
      {/* PORTFOLIO – projekty */}
      <section aria-labelledby="portfolio-heading">
        <h2 id="portfolio-heading" className="sr-only">
          Moje projekty – portfolio stron i aplikacji webowych
        </h2>
        <Portfolio />
      </section>

      {/* CONTACT – formularz */}
      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="sr-only">
          Kontakt – napisz wiadomość
        </h2>
        <Contact />
      </section>

      <Footer />
    </>
  );
}
