import { useState } from 'react';
import { RevealOnScroll } from '../RevealOnScroll';
import emailjs from 'emailjs-com';

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { VITE_SERVICE_ID, VITE_TEMPLATE_ID, VITE_PUBLIC_KEY } = import.meta.env;
        if (!VITE_SERVICE_ID || !VITE_TEMPLATE_ID || !VITE_PUBLIC_KEY) {
            console.error('EmailJS is not configured. Set VITE_SERVICE_ID, VITE_TEMPLATE_ID, and VITE_PUBLIC_KEY before building.');
            setStatus('error');
            return;
        }

        setStatus('sending');
        const templateParams = {
            name: formData.name,
            email: formData.email,
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            user_name: formData.name,
            user_email: formData.email,
            reply_to: formData.email,
        };

        try {
            await emailjs.send(VITE_SERVICE_ID, VITE_TEMPLATE_ID, templateParams, VITE_PUBLIC_KEY);
            setFormData({ name: '', email: '', message: '' });
            setStatus('success');
            window.setTimeout(() => setStatus('idle'), 4000);
        } catch (error) {
            console.error('EmailJS failed to send the contact message:', error);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="min-h-screen flex items-center justify-center py-20">
            <RevealOnScroll>
                <div className="px-4 w-full max-w-xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
                        Get In Touch
                    </h2>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="mb-2 block text-sm text-gray-300">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                                placeholder="Name..."
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                                placeholder="example@gmail.com"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="mb-2 block text-sm text-gray-300">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                value={formData.message}
                                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                                placeholder="Your Message..."
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>

                        {status === 'success' && (
                            <p role="status" className="text-sm text-emerald-400">Message sent — thank you!</p>
                        )}
                        {status === 'error' && (
                            <p role="alert" className="text-sm text-rose-400">
                                Message could not be sent. Please try again later.
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="w-full bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </RevealOnScroll>
        </section>
    );
};