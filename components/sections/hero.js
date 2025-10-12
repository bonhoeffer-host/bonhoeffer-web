"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import { useTranslation } from '../../translation/useTranslation';
import sparePartsData from '../../app/spare-parts/[slug]/models.json';
import { GlobeDemo } from './globe';
import Brands from './brands';

// Custom hook for counting animation
const useCountUp = (end, duration = 2, delay = 0) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const startCounting = () => {
    if (hasStarted) return;
    setHasStarted(true);
    
    setTimeout(() => {
      const increment = end / (duration * 60); // 60 FPS
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 1000 / 60);
    }, delay * 1000);
  };

  return [count, startCounting];
};

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = "", prefix = "", delay = 0 }) => {
  const [count, startCounting] = useCountUp(end, 2.5, delay);
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      startCounting();
    }
  }, [inView, startCounting]);

  return (
    <motion.span
      ref={ref}
      className="font-bold text-[#989b2e]"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: delay }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
};

function Hero() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  const router = useRouter();

  // --- Product & Spare Part Data (for search) ---
  const allProducts = [
    // Agro Industrial Products
    { name: 'Gasoline Water Pump', slug: 'gasoline-water-pump', type: 'product', link: '/product/gasoline-water-pump' },
    { name: 'Gasoline Engine', slug: 'gasoline-engine', type: 'product', link: '/product/gasoline-engine' },
    { name: 'Gasoline Generator', slug: 'gasoline-generator', type: 'product', link: '/product/gasoline-generator' },
    { name: 'Gasoline Inverter', slug: 'gasoline-inverter', type: 'product', link: '/product/gasoline-inverter' },
    { name: 'Tiller', slug: 'gasoline-tiller', type: 'product', link: '/product/gasoline-tiller' },
    
    // Garden And Forestry Products
    { name: 'Earth Auger', slug: 'earth-auger', type: 'product', link: '/product/earth-auger' },
    { name: 'Water Pump 2 Stroke', slug: 'water-pump-2-stroke', type: 'product', link: '/product/water-pump-2-stroke' },
    { name: 'Engine 2 Strokes', slug: 'engine-2-stroke', type: 'product', link: '/product/engine-2-stroke' },
    { name: 'Lawn Mower', slug: 'lawn-mower', type: 'product', link: '/product/lawn-mower' },
    { name: 'Brush Cutter', slug: 'brush-cutter', type: 'product', link: '/product/brush-cutter' },
    { name: 'Backpack Brush Cutter', slug: 'backpack-brush-cutter', type: 'product', link: '/product/backpack-brush-cutter' },
    { name: 'Multi Tool', slug: 'multi-tool', type: 'product', link: '/product/multi-tool' },
    { name: 'Chainsaw', slug: 'chainsaw', type: 'product', link: '/product/chainsaw' },
    { name: 'Hedge Trimmer', slug: 'hedge-trimmer', type: 'product', link: '/product/hedge-trimmer' },
    { name: 'Blower', slug: 'blower', type: 'product', link: '/product/blower' },
    
    // Diesel Machines Products
    { name: 'Diesel Water Pump', slug: 'diesel-water-pump', type: 'product', link: '/product/diesel-water-pump' },
    { name: 'Diesel Generator', slug: 'diesel-generator', type: 'product', link: '/product/diesel-generator' },
    { name: 'Diesel Engine', slug: 'diesel-engine', type: 'product', link: '/product/diesel-engine' },
    
    // Electric Machine Products
    { name: 'Electric Lawn Mower', slug: 'electric', type: 'product', link: '/product/electric' },
    { name: 'Electric Pressure Washer', slug: 'electric-pressure-washer', type: 'product', link: '/product/electric-pressure-washer' },
    
    // Solar Products
    { name: 'Panel Solar', slug: 'solar-panel', type: 'product', link: '/product/solar-panel' },
    { name: 'Submersible Pump', slug: 'submersible-pump', type: 'product', link: '/product/submersible-pump' },
    
    // Sprayers And Fumigation Products
    { name: 'Knapsack Sprayer', slug: 'knapsack-sprayer', type: 'product', link: '/product/knapsack-sprayer' },
    { name: 'Manual Sprayer', slug: 'manual-sprayer', type: 'product', link: '/product/manual-sprayer' },
    { name: 'Mist Duster', slug: 'mistduster', type: 'product', link: '/product/mistduster' },
    { name: 'Thermal Fogger', slug: 'thermal-fogger', type: 'product', link: '/product/thermal-fogger' },
    
    // Domestic And Commercial Products
    { name: 'Gasoline Pressure Washer', slug: 'gasoline-pressure-washer', type: 'product', link: '/product/gasoline-pressure-washer' },
    { name: 'Pressure Washer Home Use', slug: 'pressure-washer-home-use', type: 'product', link: '/product/pressure-washer-home-use' },
    { name: 'Direct Driven Air Compressor', slug: 'direct-driven-air-compressor', type: 'product', link: '/product/direct-driven-air-compressor' },
    { name: 'Vacuum Cleaner Commercial Grade', slug: 'vacuum-cleaner', type: 'product', link: '/product/vacuum-cleaner' },
    
    // Industrial Products
    { name: 'Electric Motors', slug: 'electric-motor', type: 'product', link: '/product/electric-motor' },
    { name: 'Centrifugal Pump', slug: 'centrifugal-pump', type: 'product', link: '/product/centrifugal-pump' },
    { name: 'Welding Machines', slug: 'welding-machines', type: 'product', link: '/product/welding-machines' },
    
    // Construction Products
    { name: 'Plate Compactor', slug: 'plate-compactor', type: 'product', link: '/product/plate-compactor' },
    { name: 'Concrete Cutter', slug: 'concrete-cutter', type: 'product', link: '/product/concrete-cutter' },
    { name: 'Concrete Vibrator', slug: 'concrete-vibrator', type: 'product', link: '/product/concrete-vibrator' },
    { name: 'Concrete Power Trowel', slug: 'concrete-power-trowel', type: 'product', link: '/product/concrete-power-trowel' },
    { name: 'Tamping Rammer', slug: 'tamping-rammer', type: 'product', link: '/product/tamping-rammer' },
    
    // Tools Products
    { name: 'Power Tools', slug: 'power-tools', type: 'product', link: '/product/power-tools' },
    { name: 'Hand Tools', slug: 'hand-tools', type: 'product', link: '/product/hand-tools' },
    { name: 'Garden Tools', slug: 'garden-tools', type: 'product', link: '/product/garden-tools' },
    
    // Wood Chipper And Chaff Cutter Products
    { name: 'Wood Chipper', slug: 'wood-chipper', type: 'product', link: '/product/wood-chipper' },
    { name: 'Corn Thresher & Chaff Cutter', slug: 'corn-thresher-chaff-cutter', type: 'product', link: '/product/corn-thresher-chaff-cutter' },
    
    // Special Segment Products
    { name: 'Trencher', slug: 'trencher', type: 'product', link: '/product/trencher' },
    { name: 'Leaf Blower', slug: 'leaf-blower', type: 'product', link: '/product/leaf-blower' },
    { name: 'Mini Dumper', slug: 'mini-dumper', type: 'product', link: '/product/mini-dumper' },
    { name: 'Log Splitter', slug: 'log-splitter', type: 'product', link: '/product/log-splitter' },
    
    // Gasoline Water Pump Models
    { name: 'BON-P-WP1.0-31', type: 'product', link: '/product/gasoline-water-pump/BON-P-WP1.0-31' },
    { name: 'BON-P-WP1.5-79', type: 'product', link: '/product/gasoline-water-pump/BON-P-WP1.5-79' },
    { name: 'BON-P-WP2.0-149', type: 'product', link: '/product/gasoline-water-pump/BON-P-WP2.0-149' },
    { name: 'BON-P-WP2.0-196', type: 'product', link: '/product/gasoline-water-pump/BON-P-WP2.0-196' },
    { name: 'BON-P-WP3.0-196', type: 'product', link: '/product/gasoline-water-pump/BON-P-WP3.0-196' },
    { name: 'BON-P-WP4.0-272', type: 'product', link: '/product/gasoline-water-pump/BON-P-WP4.0-272' },
    { name: 'BON-P-WP1.5-224HL', type: 'product', link: '/product/gasoline-water-pump/BON-P-WP1.5-224HL' },
    { name: 'BON-P-WP6.0-420', type: 'product', link: '/product/gasoline-water-pump/BON-P-WP6.0-420' },
    { name: 'BON-P-WP2.0-224HL', type: 'product', link: '/product/gasoline-water-pump/BON-P-WP2.0-224HL' },
    { name: 'BON-P-WP2.0-420HL', type: 'product', link: '/product/gasoline-water-pump/BON-P-WP2.0-420HL' },
    { name: 'BON-P-WP3.0-420HL', type: 'product', link: '/product/gasoline-water-pump/BON-P-WP3.0-420HL' },
    { name: 'BON-P-WP2.0-196CH', type: 'product', link: '/product/gasoline-water-pump/BON-P-WP2.0-196CH' },
    { name: 'BON-P-WP2.0-196TR', type: 'product', link: '/product/gasoline-water-pump/BON-P-WP2.0-196TR' },
    { name: 'BON-P-WP3.0-196TR', type: 'product', link: '/product/gasoline-water-pump/BON-P-WP3.0-196TR' },
    
    // Gasoline Engine Models
    { name: 'BON-P-GE-3.0HP', type: 'product', link: '/product/gasoline-engine/BON-P-GE-3.0HP' },
    { name: 'BON-P-GE-3.5HP', type: 'product', link: '/product/gasoline-engine/BON-P-GE-3.5HP' },
    { name: 'BON-P-GE-4.0HP', type: 'product', link: '/product/gasoline-engine/BON-P-GE-4.0HP' },
    { name: 'BON-P-GE-5.0HP', type: 'product', link: '/product/gasoline-engine/BON-P-GE-5.0HP' },
    { name: 'BON-P-GE-7.0HP', type: 'product', link: '/product/gasoline-engine/BON-P-GE-7.0HP' },
    { name: 'BON-P-GE-9.0HP', type: 'product', link: '/product/gasoline-engine/BON-P-GE-9.0HP' },
    { name: 'BON-P-GE-13.0HP', type: 'product', link: '/product/gasoline-engine/BON-P-GE-13.0HP' },
    { name: 'BON-P-GE-14.0HP', type: 'product', link: '/product/gasoline-engine/BON-P-GE-14.0HP' },
    { name: 'BON-P-GE-16.0HP', type: 'product', link: '/product/gasoline-engine/BON-P-GE-16.0HP' },
    { name: 'BON-P-GE-24.0HP', type: 'product', link: '/product/gasoline-engine/BON-P-GE-24.0HP' },
    { name: 'BON-P-GE-34.0HP', type: 'product', link: '/product/gasoline-engine/BON-P-GE-34.0HP' },
    
    // Gasoline Generator Models
    { name: 'BON-P-GG-1.0KW', type: 'product', link: '/product/gasoline-generator/BON-P-GG-1.0KW' },
    { name: 'BON-P-GG-1.2KW', type: 'product', link: '/product/gasoline-generator/BON-P-GG-1.2KW' },
    { name: 'BON-P-GG-2.5KW', type: 'product', link: '/product/gasoline-generator/BON-P-GG-2.5KW' },
    { name: 'BON-P-GG-3.5KW', type: 'product', link: '/product/gasoline-generator/BON-P-GG-3.5KW' },
    { name: 'BON-P-GG-5.0KW', type: 'product', link: '/product/gasoline-generator/BON-P-GG-5.0KW' },
    { name: 'BON-P-GG-6.5KW', type: 'product', link: '/product/gasoline-generator/BON-P-GG-6.5KW' },
    { name: 'BON-P-GG-7.5KW', type: 'product', link: '/product/gasoline-generator/BON-P-GG-7.5KW' },
    { name: 'BON-P-GG-12.0KW', type: 'product', link: '/product/gasoline-generator/BON-P-GG-12.0KW' },
    { name: 'BON-P-GG-13.5KW', type: 'product', link: '/product/gasoline-generator/BON-P-GG-13.5KW' },
    { name: 'BON-P-GG-16.0KW', type: 'product', link: '/product/gasoline-generator/BON-P-GG-16.0KW' },
    
    // Gasoline Inverter Models
    { name: 'BON-P-GI-2.5KW', type: 'product', link: '/product/gasoline-inverter/BON-P-GI-2.5KW' },
    { name: 'BON-P-GI-2.9KW', type: 'product', link: '/product/gasoline-inverter/BON-P-GI-2.9KW' },
    { name: 'BON-P-GI-3.5KW', type: 'product', link: '/product/gasoline-inverter/BON-P-GI-3.5KW' },
    { name: 'BON-P-GI-5.5KW', type: 'product', link: '/product/gasoline-inverter/BON-P-GI-5.5KW' },
    { name: 'BON-P-GI-7.5KW', type: 'product', link: '/product/gasoline-inverter/BON-P-GI-7.5KW' },
    
    // Gasoline Tiller Models
    { name: 'BON-P-GT-52CC', type: 'product', link: '/product/gasoline-tiller/BON-P-GT-52CC' },
    { name: 'BON-P-GT-139CC', type: 'product', link: '/product/gasoline-tiller/BON-P-GT-139CC' },
    { name: 'BON-P-GT-196CC', type: 'product', link: '/product/gasoline-tiller/BON-P-GT-196CC' },
    { name: 'BON-P-GT-224CC', type: 'product', link: '/product/gasoline-tiller/BON-P-GT-224CC' },
    
    // Manual Sprayer Models
    { name: 'BON-P-MS2L', type: 'product', link: '/product/manual-sprayer/BON-P-MS2L' },
    { name: 'BON-P-MS5L', type: 'product', link: '/product/manual-sprayer/BON-P-MS5L' },
    { name: 'BON-P-MS20L-JB', type: 'product', link: '/product/manual-sprayer/BON-P-MS20L-JB' },
    { name: 'BON-P-MS20L-JP', type: 'product', link: '/product/manual-sprayer/BON-P-MS20L-JP' },
    { name: 'BON-P-EMS-20', type: 'product', link: '/product/manual-sprayer/BON-P-EMS-20' },
    
    // Mist Duster Models
    { name: 'BON-P-MD42', type: 'product', link: '/product/mistduster/BON-P-MD42' },
    { name: 'BON-P-MD52', type: 'product', link: '/product/mistduster/BON-P-MD52' },
    { name: 'BON-P-MD82', type: 'product', link: '/product/mistduster/BON-P-MD82' },
    
    // Thermal Fogger Models
    { name: 'BON-P-TF6L', type: 'product', link: '/product/thermal-fogger/BON-P-TF6L' },
    { name: 'BON-P-TF2L', type: 'product', link: '/product/thermal-fogger/BON-P-TF2L' },
    
    // Electric Lawn Mower Models
    { name: 'BON-E-LM-1600W', type: 'product', link: '/product/electric/BON-E-LM-1600W' },
    { name: 'BON-E-LM-1800W', type: 'product', link: '/product/electric/BON-E-LM-1800W' },
    
    // Electric Pressure Washer Models
    { name: 'BON-P-PW-E2.2KW', type: 'product', link: '/product/electric-pressure-washer/BON-P-PW-E2.2KW' },
    { name: 'BON-P-PW-E3.0KW', type: 'product', link: '/product/electric-pressure-washer/BON-P-PW-E3.0KW' },
    { name: 'BON-P-PW-E5.5KW', type: 'product', link: '/product/electric-pressure-washer/BON-P-PW-E5.5KW' },
    { name: 'BON-P-PW-E7.5KW', type: 'product', link: '/product/electric-pressure-washer/BON-P-PW-E7.5KW' },
    
    // Solar Panel Models
    { name: 'BON-MC-SP-430W', type: 'product', link: '/product/solar-panel/BON-MC-SP-430W' },
    
    // Submersible Pump Models
    { name: 'BON-P-SP-0.5HP', type: 'product', link: '/product/submersible-pump/BON-P-SP-0.5HP' },
    { name: 'BON-P-SP-1.0HP', type: 'product', link: '/product/submersible-pump/BON-P-SP-1.0HP' },
    { name: 'BON-P-SP-3.0HP', type: 'product', link: '/product/submersible-pump/BON-P-SP-3.0HP' },
    { name: 'BON-P-SP-2.0HP', type: 'product', link: '/product/submersible-pump/BON-P-SP-2.0HP' },
    { name: 'BON-P-SP-1.5HP', type: 'product', link: '/product/submersible-pump/BON-P-SP-1.5HP' },
    
    // Gasoline Pressure Washer Models
    { name: 'BON-P-PW-G6.5HP-AP', type: 'product', link: '/product/gasoline-pressure-washer/BON-P-PW-G6.5HP-AP' },
    { name: 'BON-P-PW-6.5HP-TP', type: 'product', link: '/product/gasoline-pressure-washer/BON-P-PW-6.5HP-TP' },
    { name: 'BON-P-PW-G6.5HP-TP', type: 'product', link: '/product/gasoline-pressure-washer/BON-P-PW-G6.5HP-TP' },
    { name: 'BON-P-PW-G9.0HP-TP', type: 'product', link: '/product/gasoline-pressure-washer/BON-P-PW-G9.0HP-TP' },
    { name: 'BON-P-PW-G13.0HP-TP', type: 'product', link: '/product/gasoline-pressure-washer/BON-P-PW-G13.0HP-TP' },
    
    // Pressure Washer Home Use Models
    { name: 'BON-E-PW-1400W', type: 'product', link: '/product/pressure-washer-home-use/BON-E-PW-1400W' },
    { name: 'BON-E-PW-1600W', type: 'product', link: '/product/pressure-washer-home-use/BON-E-PW-1600W' },
    { name: 'BON-E-PW-2000W', type: 'product', link: '/product/pressure-washer-home-use/BON-E-PW-2000W' },
    
    // Direct Driven Air Compressor Models
    { name: 'BON-P-DDAC-25L', type: 'product', link: '/product/direct-driven-air-compressor/BON-P-DDAC-25L' },
    { name: 'BON-P-DDAC-50L', type: 'product', link: '/product/direct-driven-air-compressor/BON-P-DDAC-50L' },
    
    // Vacuum Cleaner Models
    { name: 'BON-VC-1400W-30L', type: 'product', link: '/product/vacuum-cleaner/BON-VC-1400W-30L' },
    { name: 'BON-VC-1400W-50L', type: 'product', link: '/product/vacuum-cleaner/BON-VC-1400W-50L' },
    
    // Electric Motor Models
    { name: 'BON-EM-LRPM-1.0HP', type: 'product', link: '/product/electric-motor/BON-EM-LRPM-1.0HP' },
    { name: 'BON-EM-LRPM-2.0HP', type: 'product', link: '/product/electric-motor/BON-EM-LRPM-2.0HP' },
    { name: 'BON-EM-LRPM-3.0HP', type: 'product', link: '/product/electric-motor/BON-EM-LRPM-3.0HP' },
    { name: 'BON-EM-LRPM-4.0HP', type: 'product', link: '/product/electric-motor/BON-EM-LRPM-4.0HP' },
    { name: 'BON-EM-HRPM-1.0HP', type: 'product', link: '/product/electric-motor/BON-EM-HRPM-1.0HP' },
    { name: 'BON-EM-HRPM-2.0HP', type: 'product', link: '/product/electric-motor/BON-EM-HRPM-2.0HP' },
    { name: 'BON-EM-HRPM-3.0HP', type: 'product', link: '/product/electric-motor/BON-EM-HRPM-3.0HP' },
    { name: 'BON-EM-HRPM-4.0HP', type: 'product', link: '/product/electric-motor/BON-EM-HRPM-4.0HP' },
    
    // Centrifugal Pump Models
    { name: 'BON-P-CP-0.5HP', type: 'product', link: '/product/centrifugal-pump/BON-P-CP-0.5HP' },
    { name: 'BON-P-CP-2.0HP', type: 'product', link: '/product/centrifugal-pump/BON-P-CP-2.0HP' },
    { name: 'BON-P-CP-1.0HP', type: 'product', link: '/product/centrifugal-pump/BON-P-CP-1.0HP' },
    
    // Welding Machine Models
    { name: 'BON-WM-DUAL-200A', type: 'product', link: '/product/welding-machines/BON-WM-DUAL-200A' },
    { name: 'BON-WM-DUAL-130A', type: 'product', link: '/product/welding-machines/BON-WM-DUAL-130A' },
    { name: 'BON-WM-DUAL-160A', type: 'product', link: '/product/welding-machines/BON-WM-DUAL-160A' },
    
    // Additional Gasoline Generator Models (corrected from script output)
    { name: 'BON-P-GG-2.8KW', type: 'product', link: '/product/gasoline-generator/BON-P-GG-2.8KW' },
    { name: 'BON-P-GG-3.7KW', type: 'product', link: '/product/gasoline-generator/BON-P-GG-3.7KW' },
    { name: 'BON-P-GG-9.0KW', type: 'product', link: '/product/gasoline-generator/BON-P-GG-9.0KW' },
    { name: 'BON-P-GG-9.5KW', type: 'product', link: '/product/gasoline-generator/BON-P-GG-9.5KW' },
    
    // Additional Gasoline Inverter Models
    { name: 'BON-P-GI-1.8KW', type: 'product', link: '/product/gasoline-inverter/BON-P-GI-1.8KW' },
    { name: 'BON-P-GI-2.1KW', type: 'product', link: '/product/gasoline-inverter/BON-P-GI-2.1KW' },
    { name: 'BON-P-GI-3.8KW', type: 'product', link: '/product/gasoline-inverter/BON-P-GI-3.8KW' },
    
    // Additional Tiller Models
    { name: 'BON-DI-950', type: 'product', link: '/product/gasoline-tiller/BON-DI-950' },
    { name: 'BON-GT-500B', type: 'product', link: '/product/gasoline-tiller/BON-GT-500B' },
    { name: 'BON-GT-500S', type: 'product', link: '/product/gasoline-tiller/BON-GT-500S' },
    { name: 'BON-GT-900', type: 'product', link: '/product/gasoline-tiller/BON-GT-900' },
    { name: 'BON-GT-950T', type: 'product', link: '/product/gasoline-tiller/BON-GT-950T' },
    { name: 'BON-GT-950C', type: 'product', link: '/product/gasoline-tiller/BON-GT-950C' },
    
    // Additional Brush Cutter Models
    { name: 'BON-P-BC36', type: 'product', link: '/product/brush-cutter/BON-P-BC36' },
    { name: 'BON-P-BC45', type: 'product', link: '/product/brush-cutter/BON-P-BC45' },
    { name: 'BON-ET-BC53', type: 'product', link: '/product/brush-cutter/BON-ET-BC53' },
    
    // Backpack Brush Cutter Models
    { name: 'BON-P-BP-BC45', type: 'product', link: '/product/backpack-brush-cutter/BON-P-BP-BC45' },
    
    // Multi Tool Models
    { name: 'BON-P-MT45', type: 'product', link: '/product/multi-tool/BON-P-MT45' },
    
    // Chainsaw Models
    { name: 'BON-P-CS40', type: 'product', link: '/product/chainsaw/BON-P-CS40' },
    { name: 'BON-P-CS55', type: 'product', link: '/product/chainsaw/BON-P-CS55' },
    { name: 'BON-P-CS65', type: 'product', link: '/product/chainsaw/BON-P-CS65' },
    { name: 'BON-P-CS92', type: 'product', link: '/product/chainsaw/BON-P-CS92' },
    
    // Hedge Trimmer Models
    { name: 'BON-P-HT23', type: 'product', link: '/product/hedge-trimmer/BON-P-HT23' },
    
    // Blower Models
    { name: 'BON-P-BBL53', type: 'product', link: '/product/blower/BON-P-BBL53' },
    { name: 'BON-P-BL26', type: 'product', link: '/product/blower/BON-P-BL26' },
    { name: 'BON-P-BLV26', type: 'product', link: '/product/blower/BON-P-BLV26' },
    
    // Earth Auger Models
    { name: 'BON-P-EA63', type: 'product', link: '/product/earth-auger/BON-P-EA63' },
    { name: 'BON-P-EA52', type: 'product', link: '/product/earth-auger/BON-P-EA52' },
    { name: 'BON-P-EA159-4S', type: 'product', link: '/product/earth-auger/BON-P-EA159-4S' },
    
    // Water Pump 2 Stroke Models
    { name: 'BON-WP1.0-52-2S', type: 'product', link: '/product/water-pump-2-stroke/BON-WP1.0-52-2S' },
    
    // 2-Stroke Engine Models
    { name: 'BON-E-2S-23', type: 'product', link: '/product/engine-2-stroke/BON-E-2S-23' },
    { name: 'BON-E-2S-26', type: 'product', link: '/product/engine-2-stroke/BON-E-2S-26' },
    
    // Lawn Mower Models
    { name: 'BON-P-LM22', type: 'product', link: '/product/lawn-mower/BON-P-LM22' },
    
    // Diesel Water Pump Models
    { name: 'BON-P-DWP2.0-5.0HP', type: 'product', link: '/product/diesel-water-pump/BON-P-DWP2.0-5.0HP' },
    { name: 'BON-P-DWP3.0-5.5HP', type: 'product', link: '/product/diesel-water-pump/BON-P-DWP3.0-5.5HP' },
    { name: 'BON-P-DWP4.0-10.0HP', type: 'product', link: '/product/diesel-water-pump/BON-P-DWP4.0-10.0HP' },
    { name: 'BON-P-DWP2.0-10.0HP', type: 'product', link: '/product/diesel-water-pump/BON-P-DWP2.0-10.0HP' },
    { name: 'BON-P-DWP3.0-10.5HP', type: 'product', link: '/product/diesel-water-pump/BON-P-DWP3.0-10.5HP' },
    
    // Diesel Generator Models
    { name: 'BON-P-DG-6.0KW', type: 'product', link: '/product/diesel-generator/BON-P-DG-6.0KW' },
    { name: 'BON-P-DG-6.5KW', type: 'product', link: '/product/diesel-generator/BON-P-DG-6.5KW' },
    { name: 'BON-P-DG-3.0KW', type: 'product', link: '/product/diesel-generator/BON-P-DG-3.0KW' },
    { name: 'BON-P-DG-9.0KW', type: 'product', link: '/product/diesel-generator/BON-P-DG-9.0KW' },
    { name: 'BON-P-DG-10.0KW', type: 'product', link: '/product/diesel-generator/BON-P-DG-10.0KW' },
    
    // Diesel Engine Models
    { name: 'BON-P-DE-5.5HP', type: 'product', link: '/product/diesel-engine/BON-P-DE-5.5HP' },
    { name: 'BON-P-DE-5.0HP', type: 'product', link: '/product/diesel-engine/BON-P-DE-5.0HP' },
    { name: 'BON-P-DE-6.0HP', type: 'product', link: '/product/diesel-engine/BON-P-DE-6.0HP' },
    { name: 'BON-P-DE-9.0HP', type: 'product', link: '/product/diesel-engine/BON-P-DE-9.0HP' },
    { name: 'BON-P-DE-10.2HP', type: 'product', link: '/product/diesel-engine/BON-P-DE-10.2HP' },
    { name: 'BON-P-DE-11.0HP', type: 'product', link: '/product/diesel-engine/BON-P-DE-11.0HP' },
    { name: 'BON-P-DE-13.0HP', type: 'product', link: '/product/diesel-engine/BON-P-DE-13.0HP' },
    { name: 'BON-P-DE-18.3HP', type: 'product', link: '/product/diesel-engine/BON-P-DE-18.3HP' },
    
    // Tamping Rammer Models
    { name: 'BON-P-TR-13.7KN-4.0HP', type: 'product', link: '/product/tamping-rammer/BON-P-TR-13.7KN-4.0HP' },
    { name: 'BON-P-TR-10KN-4.0HP', type: 'product', link: '/product/tamping-rammer/BON-P-TR-10KN-4.0HP' },
    
    // Plate Compactor Models
    { name: 'BON-P-PC-10.5KN-6.5HP', type: 'product', link: '/product/plate-compactor/BON-P-PC-10.5KN-6.5HP' },
    { name: 'BON-P-PC-11KN-6.5HP', type: 'product', link: '/product/plate-compactor/BON-P-PC-11KN-6.5HP' },
    { name: 'BON-P-PC-15KN-6.5HP', type: 'product', link: '/product/plate-compactor/BON-P-PC-15KN-6.5HP' },
    
    // Concrete Cutter Models
    { name: 'BON-P-CC-14CM-13HP', type: 'product', link: '/product/concrete-cutter/BON-P-CC-14CM-13HP' },
    { name: 'BON-P-CC-15CM-13HP', type: 'product', link: '/product/concrete-cutter/BON-P-CC-15CM-13HP' },
    
    // Concrete Vibrator Models
    { name: 'BON-P-CV-6M-6.5HP', type: 'product', link: '/product/concrete-vibrator/BON-P-CV-6M-6.5HP' },
    
    // Concrete Power Trowel Models
    { name: 'BON-PT-6.5HP', type: 'product', link: '/product/concrete-power-trowel/BON-PT-6.5HP' },
    { name: 'BON-SFS-38CC', type: 'product', link: '/product/concrete-power-trowel/BON-SFS-38CC' },
    
    // Knapsack Sprayer Models
    { name: 'BON-P-KS26', type: 'product', link: '/product/knapsack-sprayer/BON-P-KS26' },
    { name: 'BON-P-KS37', type: 'product', link: '/product/knapsack-sprayer/BON-P-KS37' },
  ];

  // Map spare parts data from JSON - flatten the nested structure
  const allSpareParts = [];
  
  // Iterate through each category in the sparePartsData object
  Object.keys(sparePartsData).forEach(categorySlug => {
    const categoryData = sparePartsData[categorySlug];
    
    // Add the category itself as a searchable item
    allSpareParts.push({
      name: categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      slug: categorySlug,
      type: 'spare-part',
      link: `/spare-parts/${categorySlug}`
    });
    
    // Add each individual part model within the category
    Object.keys(categoryData).forEach(partId => {
      const part = categoryData[partId];
      allSpareParts.push({
        name: part.name,
        slug: `${categorySlug}/${partId}`,
        type: 'spare-part',
        link: `/spare-parts/${categorySlug}`,
        compatible: part.compatible
      });
    });
  });

  function fuzzyMatch(str, query) {
    if (!str || !query) return false;
    return str.toLowerCase().includes(query.toLowerCase());
  }

  function matchSparePart(part, query) {
    if (!query) return false;
    const searchLower = query.toLowerCase();
    
    // Search in name
    if (part.name && part.name.toLowerCase().includes(searchLower)) return true;
    
    // Search in compatibility info
    if (part.compatible && part.compatible.toLowerCase().includes(searchLower)) return true;
    
    return false;
  }

  function handleSearchInputChange(e) {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim().length === 0) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }
    // Search both products and spare parts
    const results = [
      ...allProducts.filter(p => fuzzyMatch(p.name, value)),
      ...allSpareParts.filter(s => matchSparePart(s, value)),
    ];
    setSearchResults(results);
    setShowSearchResults(true);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchResults.length === 1) {
      router.push(searchResults[0].link);
      setShowSearchResults(false);
      setSearchQuery('');
    } else if (searchResults.length > 1) {
      setShowSearchResults(true);
    } else {
      // Optionally show 'no results found'
      setShowSearchResults(true);
    }
  }

  function handleResultClick(result) {
    router.push(result.link);
    setShowSearchResults(false);
    setSearchQuery('');
  }

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest('.search-container')) {
        setShowSearchResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <>
      {/* Mobile header spacer for fixed header on mobile/tablet */}
      <div className="block lg:hidden" style={{ height: '4em' }} aria-hidden="true" />

      <section ref={containerRef} className="relative min-h-screen overflow-hidden">
        {/* Statistics capsules - Right side sticky */}
          <div className="fixed right-3 top-2/5 transform -translate-y-1/2 z-40 hidden lg:block">
          <div className="flex flex-col gap-3 bg-gradient-to-b from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl px-1 py-2 border border-gray-700/50">
            <div className="text-center px-1 py-1">
              <div className="text-2xl font-bold text-white animate-bounce">5 Mn+</div>
              <div className="text-base font-medium text-[#989b2e]">{t('hero.stats.clients', 'Clients')}</div>
            </div>
            <div className="h-px mx-2 bg-gray-600/50"></div>
            <div className="text-center px-1 py-1">
              <div className="text-2xl font-bold text-white animate-">22+</div>
              <div className="text-base font-medium text-[#989b2e]">{t('hero.stats.countries', 'Countries')}</div>
            </div>
            <div className="h-px mx-2 bg-gray-600/50"></div>
            <div className="text-center px-1 py-1">
              <div className="text-2xl font-bold text-white animate-bounce">5743+</div>
              <div className="text-base font-medium text-[#989b2e]">{t('hero.stats.distributors', 'Distributors')}</div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className='flex flex-col items-center text-white pt-10 relative z-10 w-full px-4'>
          {/* Hero Title - Simplified Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center w-full"
          >
            <motion.h1 
              className='text-3xl xs:text-4xl sm:text-4xl md:text-4xl xl:text-6xl font-bold mb-4 text-white break-words [@media(min-width:1280px)_and_(max-width:1350px)]:text-5xl'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {t('hero.title', 'Welcome to Bonhoeffer Machines')}
            </motion.h1>
            
            <motion.p
              className="text-base xs:text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {t('hero.subtitle', 'Innovating the future of industrial machinery with cutting-edge technology')}
            </motion.p>
          </motion.div>

          {/* Search Bar - Responsive with Results */}
          <motion.div 
            className='flex flex-col sm:flex-row mt-8 relative w-full max-w-lg search-container'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row w-full relative">
              <input 
                type='text' 
                placeholder={t('hero.search.placeholder', 'Search our products and spare parts...')}
                value={searchQuery}
                onChange={handleSearchInputChange}
                className='w-full sm:w-96 p-3 rounded-t-lg sm:rounded-t-none sm:rounded-l-lg bg-white/10 backdrop-blur-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#989b2e] transition-all duration-300 border border-white/20'
              />
              <button 
                type="submit"
                className='w-full cursor-pointer sm:w-auto px-6 py-3 bg-[#989b2e] rounded-b-lg sm:rounded-l-none sm:rounded-r-lg transition-all duration-300 font-semibold hover:bg-[#7a7d24]'
              >
                {t('hero.search.button', 'Search')}
              </button>
              
              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border border-white/30 rounded-lg mt-2 max-h-64 overflow-y-auto z-50 shadow-xl">
                  <div className="p-2">
                    {searchResults.length > 0 ? (
                      <>
                        {searchResults.map((result, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleResultClick(result)}
                            className="px-3 py-2 hover:bg-[#989b2e]/20 cursor-pointer rounded text-gray-800 flex items-center space-x-2"
                          >
                            <span className={`text-xs px-2 py-1 rounded ${
                              result.type === 'product' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {result.type === 'product' ? t('hero.search.productTag', 'Product') : t('hero.search.sparePartTag', 'Spare Part')}
                            </span>
                            <span>{result.name}</span>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="px-3 py-2 text-gray-600 text-center">
                        {t('hero.search.noResults', 'No results found for')}{" "}
                        <span className="font-semibold">&quot;{searchQuery}&quot;</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </div>

        {/* Video Section - Parallax, desktop untouched */}
        <motion.div 
          className='flex justify-center mt-8 relative w-full px-2 sm:px-0'
          style={{ y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <video 
            className='w-full sm:w-[75%] mx-auto object-cover rounded-2xl shadow-xl' 
            autoPlay 
            loop 
            muted
          >
            <source src="https://images.bonhoeffermachines.com/en/public/images/Brand_Video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        <Brands/>

        {/* Statistics Section - Responsive, desktop untouched */}
        <motion.div 
          className='flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 w-full px-2'
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Statistics Column */}
          <motion.div 
            className="text-center space-y-6 w-full md:w-auto"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="px-6 py-6 sm:px-12 sm:py-8 mb-3 sm:mb-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h2 className='text-3xl sm:text-4xl md:text-6xl font-bold mb-2 text-[#989b2e]'>{t('hero.stats.global', 'Global')}</h2>
              <h2 className='text-2xl sm:text-3xl md:text-5xl font-bold text-white'>{t('hero.stats.presence', 'Presence')}</h2>
            </div>
            <div className="space-y-3 sm:space-y-5">
              <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className='text-2xl sm:text-2xl md:text-3xl font-semibold text-white'>
                  <AnimatedCounter end={5} suffix=" Mn+" delay={0.5} /> {t('hero.stats.clients', 'Clients')}
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className='text-2xl sm:text-2xl md:text-3xl font-semibold text-white'>
                  <AnimatedCounter end={22} suffix="+" delay={0.8} /> {t('hero.stats.countries', 'Countries')}
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className='text-2xl sm:text-2xl md:text-3xl font-semibold text-white'>
                  <AnimatedCounter end={4535} suffix="+" delay={0.5} /> {t('hero.stats.products', 'Products')}
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className='text-2xl sm:text-2xl md:text-3xl font-semibold text-white'>
                  <AnimatedCounter end={5743} suffix="+" delay={0.5} /> {t('hero.stats.distributors', 'Distributors')}
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className='text-2xl sm:text-2xl md:text-3xl font-semibold text-white'>
                  <AnimatedCounter end={15347} suffix="+" delay={0.5} /> {t('hero.stats.retailPoints', 'Retail Points')}
                </h3>
              </div>
            </div>
          </motion.div>

          {/* GIF Section - Responsive, desktop untouched */}
          <motion.div
            className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* <img 
              src="https://bonhoeffermachines.com/en/public/index_files/Global%20Presence.gif" 
              alt="Hero Animation"
              className="w-full object-cover rounded-2xl border-2 border-[#989b2e]/30 shadow-lg"
            /> */}
            <GlobeDemo/>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}

export default Hero
