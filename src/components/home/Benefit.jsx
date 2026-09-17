function Benefits() {
    const benefits = [
      {
        id: 1,
        icon: "/img/truck.png", 
        title: "Free Shipping",
        description: "Upgrade your style today and get FREE shipping on all orders! Don't miss out.",
      },
      {
        id: 2,
        icon: "/img/award.png",
        title: "Satisfaction Guarantee",
        description: "Shop confidently with our Satisfaction Guarantee: Love it or get a refund.",
      },
      {
        id: 3,
        icon: "/img/shield.png",
        title: "Secure Payment",
        description: "Your security is our priority. Your payments are secure with us.",
      },
    ];
  
    return (
      <section className="py-8 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="flex flex-col items-center text-sm">
              {/* Benefit Image - Smaller Size */}
              <img src={benefit.icon} alt={benefit.title} className="w-13 h-13 mb-2" />
  
              {/* Benefit Title */}
              <h3 className="font-medium">{benefit.title}</h3>
  
              {/* Benefit Description - Smaller Text */}
              <p className="text-gray-600 mt-1 text-xs max-w-xs">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default Benefits;
  