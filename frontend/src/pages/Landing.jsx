import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiMedicines } from 'react-icons/gi';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { IoTrendingUpOutline } from "react-icons/io5";
export const Landing = () => {

  // Sanitization function
  const navigate = useNavigate();

  const sanitizeAndNavigate = (path) => {
    // Add your sanitization logic here
    console.log('Sanitizing the page...');
    // Example: Clear local storage, reset states, etc.
    localStorage.clear();
    // After sanitization, navigate to the specified path
    navigate(path);
  };

  useEffect(() => {
    // Call the sanitization function before navigating away
    const handleBeforeUnload = (event) => {
      sanitizeAndNavigate(window.location.pathname);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);

  const data = [
    {
      title: 'Inventory Management System',
      description: 'Efficiently manage and track pharmaceutical inventory, ensuring optimal stock levels and reducing waste.',
      icon: GiMedicines,
      link: '/login',
      color: 'bg-green-300'
    },
    {
      title: 'Branch POS',
      description: 'Point of Sale system for efficient transaction management and sales tracking across branches.',
      icon: IoTrendingUpOutline,
      link: '/branch',
      color: 'bg-indigo-300'
    }
  ];

  return (
    <div className=''>
      <section className="grid grid-rows-1fr md:grid-rows-1 md:grid-cols-2 w-full h-full md:p-0 text-center gap-4 md:gap-2 p-5">
        <div className="bg-transparent md:order-1 flex justify-center md:items-start text-start flex-col gap-5 relative md:p-10">
          <span className='text-4xl font-bold text-start'>Eurasia Management System</span>
          <span className='text-lg '>
            Eurasia Management System is a comprehensive software solution designed to streamline and enhance the operations of pharmaceutical and healthcare organizations.
          </span>
        </div>
        <div className="bg-transparent md:order-2 flex justify-center md:items-center flex-col gap-10 relative">
          <div className="w-auto gap-10 flex flex-col">
            {data.map((item, index) => (
              <Link to={item.link} className='w-full' onClick={sanitizeAndNavigate}>
                <Card className={`${item.color} rounded-2xl p-5 shadow-lg relative w-2/3 md:w-5/6 opacity-100 transition-all duration-300 hover:scale-105`}>
                <CardContent>
                  <div className="absolute -top-5 -left-5 bg-white rounded-full p-3 shadow-lg">
                    <item.icon className="text-2xl" />
                  </div>
                  <CardTitle className='py-2 text-2xl font-bold text-start'>
                    {item.title}
                  </CardTitle>
                  <CardDescription className='text-start'>
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};