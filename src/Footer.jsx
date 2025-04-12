export function Footer() {
  const footerContent = [
    {
      title: "Features",
      links: ["Link Shortening", "Branded Links", "Analytics"],
    },
    {
      title: "Resources",
      links: ["Blog", "Developers", "Support"],
    },
    {
      title: "Company",
      links: ["About", "Our Team", "Careers"],
    },
  ];
  const socialLinks = [
    {
      name: "Facebook",
      icon: "/images/icon-facebook.svg",
      url: "https://www.facebook.com",
    },
    {
      name: "Twitter",
      icon: "/images/icon-twitter.svg",
      url: "https://www.twitter.com",
    },
    {
      name: "Pinterest",
      icon: "/images/icon-pinterest.svg",
      url: "https://www.pinterest.com",
    },
    {
      name: "Instagram",
      icon: "/images/icon-instagram.svg",
      url: "https://www.instagram.com",
    },
  ];

  return (
    <div className="footer">
      <div className="footer-img-container">
        <img className="pt-2" src="/images/logo.svg" alt="Logo" />
      </div>
      <div className="links flex-column centered">
        {footerContent.map((section, index) => (
          <div key={index}>
            <h4 className="pb-1 mt-2">{section.title}</h4>
            <ul>
              {section.links.map((link, i) => (
                <li className="pointer ttl" key={i}>
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="social-icons flex centered gap-1 mt-2">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
          >
            <img src={social.icon} alt={social.name} />
          </a>
        ))}
      </div>
    </div>
  );
}
