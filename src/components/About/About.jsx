export default function About() {
  return (
    <div className="py-16 bg-white">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:w-5/12 lg:w-4/12">
            <img
              src="./Images/img.gif"
              alt="about-section-illustration"
            />
          </div>
          <div className="md:w-7/12 lg:w-6/12">
            <h2 className="text-2xl text-amber-600 font-bold md:text-4xl">
              Art_Gallery
            </h2>
            <h2 className="mt-6 text-gray-700">
              
              HELLO! WELCOME TO SUNZINE PHOTO GALLERY WITH CREATIVE & UNIQUE
              STYLE
            
            </h2>
            <p className="mt-4 text-gray-600 font-sans">
              Whether you're an art lover, a collector, or a curious browser, our gallery showcases a wide variety of styles—from realistic portraits to abstract compositions. Every piece you see is crafted with care, creativity, and passion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
