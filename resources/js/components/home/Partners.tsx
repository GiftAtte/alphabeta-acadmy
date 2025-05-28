export default function P() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto container px-6 lg:px-8">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="text-slate-900 text-3xl font-bold mb-6 text-center">
            Brands that trust Us
          </h2>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base ">
            We have clients that support our professional services tailored to the safety and security industry. 
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <img
            alt="Transistor"
            src="/images/brand1.jpeg"
            width={158}
            height={48}
            className="col-span-2 max-h-[120px] w-full object-contain lg:col-span-1"
          />
          <img
            alt="Reform"
             src="/images/brand2.jpeg"
            width={158}
            height={48}
            className="col-span-2 max-h-[120px] w-full object-contain lg:col-span-1"
          />
          <img
            alt="Tuple"
           src="/images/brand3.jpeg"
            width={158}
            height={48}
            className="col-span-2 max-h-[120px] w-full object-contain lg:col-span-1"
          />
          <img
            alt="SavvyCal"
            src="/images/brand4.jpeg"
            width={158}
            height={48}
            className="col-span-2 max-h-[120px] w-full object-contain sm:col-start-2 lg:col-span-1"
          />
          <img
            alt="Statamic"
            src="/images/brand5.jpeg"
            width={158}
            height={48}
            className="col-span-2 col-start-2 max-h-[120px] w-full object-contain sm:col-start-auto lg:col-span-1"
          />
        </div>
      </div>
    </div>
  )
}
