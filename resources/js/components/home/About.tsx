import React from 'react'
import { Button } from '../ui/button'
import { Link } from '@inertiajs/react'

const About = () => {
  return (
    <div>
      <div className="bg-gray-100 px-4 py-12">
      <h2 className="text-slate-900 text-3xl font-bold mb-6 text-center">About Alpha Beta Safety Academy</h2>
  <div className="grid lg:grid-cols-2 gap-12 lg:max-w-6xl  mx-auto">
    <div className="text-left">
    

      <p className="mb-4 text-base text-slate-600 leading-relaxed">
        ALPHA BETA SAFETY ACADEMY is a world-class safety training institute recognized for delivering globally accepted certifications and quality education in safety and risk management. We offer:
      </p>

  
      <p className="mb-4 text-base text-slate-600 leading-relaxed">
        Alpha Beta Safety Academy Ltd is registered with the Corporate Affairs Commission of Nigeria (CAC) with Registration No: 6874094. We are accredited training providers with numerous national and international certifications and partnerships.
      </p>
      <ul className="mb-4 text-base text-slate-600 leading-relaxed list-disc list-inside">
        <li>Comprehensive curriculum tailored to industries like oil & gas, construction, and manufacturing</li>
        <li>Internationally recognized certifications</li>
        <li>Modern training methods using simulations and interactive tools</li>
        <li>Highly experienced and qualified instructors</li>
        <li>Emphasis on practical, hands-on learning</li>
        <li>Commitment to continuous improvement and innovation</li>
        <li>Strong partnerships with industry leaders and professional organizations</li>
      </ul>

    
      <Link href='/about'>
    <Button size={'lg'}>
Read More
    </Button>
      </Link>
    </div>

 
    <div>
      <img src="/images/img2.jpg" alt="Alpha Beta Safety Academy" className="rounded-lg object-contain w-full h-full" />
    </div>
  </div>
</div>

    </div>
  )
}

export default About
