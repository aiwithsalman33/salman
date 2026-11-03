import { email, instagram, topmate } from "@/data/social-links";
import { ButtonLink } from "@/components/ui/Button";
import { RevealTitle } from "@/components/motion/RevealTitle";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="shell">
        <p aria-hidden="true" className="display mx-auto max-w-[18ch] text-center text-h2 uppercase">
          Ideas in. Intelligent systems out.
        </p>

        <div className="mt-24 grid gap-14 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <RevealTitle id="contact-title" className="display max-w-[14ch] text-h2">
              Have a process worth automating?
            </RevealTitle>
            <p className="mt-6 max-w-[44ch] text-lead text-steel">
              Tell me what takes too much time. Let&apos;s explore how AI and automation can make it simpler.
            </p>

            <ul className="mt-10 flex flex-wrap gap-3">
              <li>
                <ButtonLink href="#contact-form" variant="outline">
                  Start a project
                </ButtonLink>
              </li>
              <li>
                <ButtonLink href={topmate.href} variant="outline" external>
                  Book a session
                </ButtonLink>
              </li>
              <li>
                <ButtonLink href={instagram.href} variant="outline" external>
                  Instagram
                </ButtonLink>
              </li>
              {email && (
                <li>
                  <ButtonLink href={`mailto:${email}`} variant="outline">
                    Email
                  </ButtonLink>
                </li>
              )}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
