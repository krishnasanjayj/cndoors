import { Ruler, Wrench, CheckCircle, Headphones } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Ruler,
      title: 'Free Consultation & Measurement',
      description: 'Our experts visit your location for accurate measurements and professional consultation at no cost.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Wrench,
      title: 'Professional Installation',
      description: 'Skilled technicians ensure perfect installation with minimal disruption to your daily routine.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'Every installation undergoes rigorous quality checks to ensure it meets our high standards.',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: Headphones,
      title: 'After-Sales Support',
      description: 'Dedicated customer support and maintenance services to keep your doors and windows in perfect condition.',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Contact Us',
      description: 'Reach out via phone, email, or our contact form',
    },
    {
      step: '02',
      title: 'Site Visit',
      description: 'Free consultation and accurate measurements',
    },
    {
      step: '03',
      title: 'Quotation',
      description: 'Detailed quote with product options',
    },
    {
      step: '04',
      title: 'Installation',
      description: 'Professional installation at your convenience',
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions from consultation to installation and beyond
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className={`${service.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Process
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-200 -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
