import { MailIcon, PhoneCallIcon } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import AnimatedButton from "./AnimatedButton";

export default function Footer() {
  return (
    <footer className="w-full overflow-hidden bg-bgfooter px-4 py-8 text-neutral sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-16">
          <div className="space-y-4 sm:space-y-5">
            <h3 className="border-b border-textcolor/20 pb-2 text-lg font-bold text-textcolor sm:text-xl">
              Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { to: "/hardware", text: "Explore Hardware" },
                { to: "/jobs", text: "Find a Job" },
                { to: "/post-site", text: "Engineer? Post site to get Labour" },
                {
                  to: "/register-supplier",
                  text: "Supplier? Register your Hardware",
                },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="group flex items-center text-sm transition-all duration-200 sm:text-base"
                  >
                    <span className="border-b border-transparent text-textfooter transition-all group-hover:border-textcolor">
                      {link.text}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <h3 className="border-b border-textcolor/20 pb-2 text-lg font-bold text-textcolor sm:text-xl">
              Contact Us
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-3">
                <PhoneCallIcon className="h-4 w-4 flex-shrink-0 text-textcolor sm:h-5 sm:w-5" />
                <a
                  href="tel:+255626689808"
                  className="text-sm text-textfooter transition-colors hover:text-textcolor sm:text-base"
                >
                  +255 626 689 808
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MailIcon className="h-4 w-4 flex-shrink-0 text-textcolor sm:h-5 sm:w-5" />
                <a
                  href="mailto:support@ramani.co.tz"
                  className="break-all text-sm text-textfooter transition-colors hover:text-textcolor sm:break-normal sm:text-base"
                >
                  support@niperamani.com
                </a>
              </div>
              <div className="pt-2">
                <textarea
                  placeholder="Write your message..."
                  className="w-full rounded-lg border border-textfooter/30 bg-textfooter/10 px-3 py-2 text-sm text-textcolor placeholder-textcolor/30 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-textcolor/40 sm:px-4 sm:py-3 sm:text-base"
                  rows="3"
                ></textarea>
                <AnimatedButton className="hover:bg-primary-dark mt-2 w-full rounded-lg bg-primary px-4 py-2 text-sm text-white shadow-sm transition-colors hover:shadow-md sm:w-auto sm:px-5 sm:text-base">
                  Send Message
                </AnimatedButton>
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <h3 className="border-b border-textcolor/20 pb-2 text-lg font-bold text-textcolor sm:text-xl">
              Connect With Us
            </h3>
            <div className="flex justify-start space-x-4 sm:justify-start sm:space-x-5">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.9, y: 1 }}
                href="#"
                className="group rounded-full bg-bgcolor p-2.5 hover:bg-bgcolor/30 sm:p-3"
                aria-label="WhatsApp"
              >
                <span className="text-textfooter transition-colors group-hover:text-textcolor">
                  <FaWhatsapp className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.9, y: 1 }}
                href="#"
                className="group rounded-full bg-bgcolor p-2.5 hover:bg-bgcolor/30 sm:p-3"
                aria-label="Instagram"
              >
                <span className="text-textfooter transition-colors group-hover:text-textcolor">
                  <FaInstagram className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.9, y: 1 }}
                href="#"
                className="group rounded-full bg-bgcolor p-2.5 hover:bg-bgcolor/30 sm:p-3"
                aria-label="Twitter"
              >
                <span className="text-textfooter transition-colors group-hover:text-textcolor">
                  <FaXTwitter className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-textcolor/20 pt-6 text-center text-xs text-textfooter sm:mt-10 sm:pt-8 sm:text-sm lg:mt-12">
          <p>© {new Date().getFullYear()} NipeRamani. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
