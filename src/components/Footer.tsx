const Footer = () => {
  return (
    <div className="bg-yellow-500 py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-2xl text-white font-bold tracking tight">
          DJ Nosework
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <span>&copy; 2021 JGR Consulting. All rights reserved.</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
