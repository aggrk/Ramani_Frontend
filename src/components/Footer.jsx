import { MailIcon, PhoneCallIcon } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-secondary text-neutral w-full overflow-hidden py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-16">
          {/* Quick Links */}
          <div className="space-y-4 sm:space-y-5">
            <h3 className="text-lg sm:text-xl font-bold border-b border-accent/30 pb-2">
              Quick Links
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
                    className="flex items-center group transition-all duration-200 hover:text-accent text-sm sm:text-base"
                  >
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="border-b border-transparent group-hover:border-accent transition-all">
                      {link.text}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Support */}
          <div className="space-y-4 sm:space-y-5">
            <h3 className="text-lg sm:text-xl font-bold border-b border-accent/30 pb-2">
              Need Support? Contact Us
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-3">
                <PhoneCallIcon className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0" />
                <a
                  href="tel:+255626689808"
                  className="hover:text-accent transition-colors text-sm sm:text-base"
                >
                  +255 626 689 808
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MailIcon className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0" />
                <a
                  href="mailto:support@ramani.co.tz"
                  className="hover:text-accent transition-colors text-sm sm:text-base break-all sm:break-normal"
                >
                  support@ramani.co.tz
                </a>
              </div>
              <div className="pt-2">
                <textarea
                  placeholder="Write your message..."
                  className="w-full bg-neutral/10 border border-accent/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-textdark placeholder-textlight/70 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all text-sm sm:text-base"
                  rows="3"
                ></textarea>
                <button className="mt-2 w-full sm:w-auto px-4 sm:px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-sm hover:shadow-md text-sm sm:text-base">
                  Send Message
                </button>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4 sm:space-y-5 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold border-b border-accent/30 pb-2">
              Connect With Us
            </h3>
            <div className="flex justify-center sm:justify-start space-x-4 sm:space-x-5">
              {[
                {
                  icon: <FaWhatsapp className="h-5 w-5 sm:h-6 sm:w-6" />,
                  label: "WhatsApp",
                },
                {
                  icon: <FaInstagram className="h-5 w-5 sm:h-6 sm:w-6" />,
                  label: "Instagram",
                },
                {
                  icon: <FaXTwitter className="h-5 w-5 sm:h-6 sm:w-6" />,
                  label: "Twitter",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-neutral/10 p-2.5 sm:p-3 rounded-full hover:bg-accent/20 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <span className="text-accent group-hover:text-white transition-colors">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="pt-3 sm:pt-4">
              <h4 className="font-medium mb-3 text-sm sm:text-base text-center sm:text-left">
                Subscribe to our newsletter
              </h4>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-neutral/10 border border-accent/30 rounded-lg sm:rounded-l-lg sm:rounded-r-none px-3 sm:px-4 py-2 text-textdark focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent text-sm sm:text-base"
                />
                <button className="bg-primary text-white px-4 py-2 rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-primary-dark transition-colors text-sm sm:text-base">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-accent/30 mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-neutral/80">
          <p>© {new Date().getFullYear()} Ramani. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
