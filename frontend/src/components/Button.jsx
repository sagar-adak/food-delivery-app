import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className,
  ...props 
}) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all active:scale-[0.98] rounded-xl outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-primary hover:bg-orange-600 text-white shadow-md hover:shadow-lg",
    secondary: "bg-gray-900 hover:bg-gray-800 text-white shadow-md hover:shadow-lg",
    outline: "border-2 border-primary text-primary hover:bg-orange-50",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-bold",
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.98 }}
      className={clsx(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
