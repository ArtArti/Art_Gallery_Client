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
            <h3 className="mt-6 text-gray-700 text-xl font-semibold">
              Pencil Sketches that Speak to the Soul
            </h3>
            <p className="mt-4 text-gray-600 font-sans">
              Welcome to <span className="font-semibold text-amber-600">Art_Gallery</span> – your one-stop destination for stunning pencil artwork. Whether you're an art lover looking to buy handcrafted sketches or someone who wants to turn their own photo into a beautiful pencil drawing — we’ve got you covered.
            </p>
            <p className="mt-4 text-gray-600 font-sans">
              🛒 <span className="font-medium">Buy from Our Gallery:</span> Explore our unique collection of ready-made pencil sketches. Add them to your cart and place orders easily, just like popular shopping apps.
            </p>
            <p className="mt-4 text-gray-600 font-sans">
              🖼️ <span className="font-medium">Upload Your Image:</span> Want a custom pencil sketch of your photo? Use our <span className="italic">Upload</span> section to submit your image and details — our artists will create a personalized masterpiece for you.
            </p>
            <p className="mt-4 text-gray-600 font-sans">
              💰 <span className="font-medium">Cash on Delivery:</span> We offer secure and simple <span className="text-amber-600 font-semibold">COD (Cash on Delivery)</span> for all purchases, whether it's a ready-made artwork or a custom request.
            </p>
            <p className="mt-4 text-gray-600 font-sans">
              Every sketch is made with passion and precision to bring your memories and imagination to life through the art of pencil drawing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
