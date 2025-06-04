

export default function Contact() {
  return (
    <div className="relative pt-24 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Contact Info */}
          <div className="bg-gray-100 rounded-xl p-6">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
              Get in touch
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Fill in the form to start a conversation
            </p>

            {/* Location */}
            <div className="flex items-center mb-4 text-gray-600">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="ml-4 font-medium">Acme Inc, Street, State, Postal Code</span>
            </div>

            {/* Phone */}
            <div className="flex items-center mb-4 text-gray-600">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.5 4.493a1 1 0 01-.502 1.21l-2.26 1.13a11 11 0 005.516 5.516l1.13-2.26a1 1 0 011.21-.502l4.49 1.5a1 1 0 01.69.95V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z" />
              </svg>
              <span className="ml-4 font-medium">+44 1234567890</span>
            </div>

            {/* Email */}
            <div className="flex items-center text-gray-600">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="ml-4 font-medium">info@acme.org</span>
            </div>
          </div>

          {/* Right Contact Form */}
          <form className="bg-white rounded-xl p-6 shadow-md space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Full Name"
                className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
          
              <input
                id="tel"
                name="tel"
                type="text"
                placeholder="message"
                className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* <div>
              <label htmlFor="file" className="sr-only">Upload Image</label>
              <input
                id="file"
                name="file"
                type="file"
                className="w-full py-2 px-4 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:border-orange-500"
              />
            </div> */}

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
