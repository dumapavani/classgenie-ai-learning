const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold">ClassGeine</h3>
          <p className="text-background/80">
            AI-Powered Personalized Learning for Students
          </p>
          <div className="pt-4 border-t border-background/20">
            <p className="text-sm text-background/60">
              &copy; {currentYear} ClassGeine. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
