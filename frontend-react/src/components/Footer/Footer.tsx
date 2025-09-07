// Footer.tsx
import React from "react";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  iconClass: string; // ex: "fab fa-facebook-f"
  href: string;
}

interface FooterProps {
  companyDescription?: string;
  infoLinks?: FooterLink[];
  accountLinks?: FooterLink[];
  contact?: {
    address: string;
    phone: string;
    email: string;
  };
  socialLinks?: SocialLink[];
}

const defaultInfoLinks: FooterLink[] = [
  { label: "À propos de nous", href: "#" },
  { label: "Livraison", href: "#" },
  { label: "Politique de confidentialité", href: "#" },
  { label: "Conditions générales", href: "#" },
  { label: "FAQ", href: "#" },
];

const defaultAccountLinks: FooterLink[] = [
  { label: "Connexion", href: "#" },
  { label: "Créer un compte", href: "#" },
  { label: "Mes commandes", href: "#" },
  { label: "Liste de courses", href: "#" },
  { label: "Aide", href: "#" },
];

const defaultSocialLinks: SocialLink[] = [
  { iconClass: "fab fa-facebook-f", href: "#" },
  { iconClass: "fab fa-twitter", href: "#" },
  { iconClass: "fab fa-instagram", href: "#" },
  { iconClass: "fab fa-pinterest", href: "#" },
];

const defaultContact = {
  address: "123 Rue du Commerce, 75000 Paris",
  phone: "+33 1 23 45 67 89",
  email: "contact@marketplus.fr",
};

const Footer: React.FC<FooterProps> = ({
  companyDescription = "Votre épicerie en ligne avec des produits frais et de qualité livrés directement à votre porte.",
  infoLinks = defaultInfoLinks,
  accountLinks = defaultAccountLinks,
  contact = defaultContact,
  socialLinks = defaultSocialLinks,
}) => {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Grid Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">MarketPlus</h3>
            <p className="text-gray-400 mb-4">{companyDescription}</p>
            <div className="flex space-x-4">
              {socialLinks.map((link, idx) => (
                <a key={idx} href={link.href} className="text-gray-400 hover:text-white">
                  <i className={link.iconClass}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informations</h3>
            <ul className="space-y-2">
              {infoLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-400 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Mon compte</h3>
            <ul className="space-y-2">
              {accountLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-400 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-2"></i>
                <span>{contact.address}</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone mr-2"></i>
                <span>{contact.phone}</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                <span>{contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Newsletter</h3>
              <p className="text-gray-400">Inscrivez-vous pour recevoir nos offres exclusives</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="bg-gray-700 text-white py-2 px-4 rounded-l focus:outline-none focus:ring-1 focus:ring-primary w-full"
              />
              <button className="bg-primary hover:bg-accent text-white font-bold py-2 px-6 rounded-r transition duration-300">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2023 MarketPlus - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
