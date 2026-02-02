import { useState, useEffect } from 'react';
import { supabase, type Testimonial } from '../lib/supabase';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={20}
        className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real experiences from satisfied customers across India
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <div
                key={testimonial.id}
                className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow relative"
              >
                <Quote className="text-blue-200 absolute top-6 right-6" size={48} />
                <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
                <p className="text-gray-700 mb-6 italic relative z-10">
                  "{testimonial.content}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-900">{testimonial.customer_name}</p>
                  {testimonial.location && (
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Join Our Satisfied Customers</h3>
          <p className="text-xl mb-8 opacity-90">
            Experience the CN Doors & Windows difference today
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Get Your Free Quote
          </button>
        </div>
      </div>
    </section>
  );
}
