
const testimonials = [
    {
        id: 1,
        author: "Francis Towne",
        role: "Future Response Technician",
        quote: "Lorem ipsum dolor sit amet consectetur. Adipiscing ut nisi leo nibh eros in. Sed nulla quis scelerisque vitae. Fringilla massa facilisis non mattis mauris nisl. Dui ut hendrerit fames imperdiet proin nisl sit mauris."
    },
    {
        id: 2,
        author: "Jane Doe",
        role: "Senior Software Engineer",
        quote: "Lorem ipsum dolor sit amet consectetur. Adipiscing ut nisi leo nibh eros in. Sed nulla quis scelerisque vitae. Fringilla massa facilisis non mattis mauris nisl. Dui ut hendrerit fames imperdiet proin nisl sit mauris."
    },
    {
        id: 3,
        author: "Peter Jones",
        role: "Marketing Manager",
        quote: "Lorem ipsum dolor sit amet consectetur. Adipiscing ut nisi leo nibh eros in. Sed nulla quis scelerisque vitae. Fringilla massa facilisis non mattis mauris nisl. Dui ut hendrerit fames imperdiet proin nisl sit mauris."
    }
];

export function ComunityLayout() {
    return (
        <div className="container mx-auto py-8 font-sans flex flex-col items-center">
            <header className="flex justify-between items-center mb-8 w-full max-w-4xl">
                <h1 className="text-2xl text-gray-800 font-semibold">Comunidad</h1>
                {/* <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="#" className="text-gray-800 hover:text-gray-600">Sobre mi</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-800 hover:text-gray-600">Mi perfil</a>
                        </li>
                    </ul>
                </nav> */}
            </header>

            <section className="w-full flex">
                {/* Content */}
                <div className="w-full p-4">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="flex items-start justify-center mb-12">
                            {/* Circular Avatar with First Letter */}
                            <div className="w-64 h-64 rounded-full overflow-hidden mr-6 flex items-center justify-center bg-gray-200 text-4xl font-bold uppercase text-gray-600">
                                {testimonial.author.charAt(0)}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="text-4xl text-gray-800 mb-2">“</div>
                                <p className="text-gray-800 text-sm leading-relaxed mb-4">{testimonial.quote}</p>
                                <p className="text-gray-800 text-xs font-medium mb-1">{testimonial.author}</p>
                                <p className="text-gray-800 text-xs">{testimonial.role}</p>
                                <button className="bg-green-800 hover:bg-green-700 text-white text-xs py-2 px-4 rounded mt-4 flex items-center space-x-2">
                                    <span>Ver más</span>
                                    <span></span>
                                </button>

                                {/* Carousel indicators */}
                                <div className="mt-4 flex items-center">
                                    <div className="w-40 h-0.5 bg-gray-200 rounded flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-green-800 ml-1/4"></div>
                                    </div>
                                    <div className="flex space-x-1 ml-2">
                                        <span className="w-2 h-2 rounded-full bg-green-800"></span>
                                        <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                                        <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
