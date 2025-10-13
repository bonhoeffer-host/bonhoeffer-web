"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTranslation } from '../../translation/useTranslation';
import sparePartsData from '../../app/spare-parts/[slug]/models.json';
import '../../app/globals.css';

function Header() {
  const { t, currentLocale, switchLocale, isLoading } = useTranslation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [productDropdownTimeout, setProductDropdownTimeout] = useState(null);
  const [isGalleryDropdownOpen, setIsGalleryDropdownOpen] = useState(false);
  const [galleryDropdownTimeout, setGalleryDropdownTimeout] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  // Add state for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Mobile search state
  const [mobileSearch, setMobileSearch] = useState('');

  const router = useRouter();

  // --- Product & Spare Part Data (for search) ---
  // These arrays are auto-generated from your product/[slug]/page.js and workspace context
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
    { name: 'BON-P-WP1.0-31', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP1.0-31' },
    { name: 'BON-P-WP1.5-79', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP1.5-79' },
    { name: 'BON-P-WP2.0-149', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP2.0-149' },
    { name: 'BON-P-WP2.0-196', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP2.0-196' },
    { name: 'BON-P-WP3.0-196', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP3.0-196' },
    { name: 'BON-P-WP4.0-272', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP4.0-272' },
    { name: 'BON-P-WP1.5-224HL', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP1.5-224HL' },
    { name: 'BON-P-WP6.0-420', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP6.0-420' },
    { name: 'BON-P-WP2.0-224HL', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP2.0-224HL' },
    { name: 'BON-P-WP2.0-420HL', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP2.0-420HL' },
    { name: 'BON-P-WP3.0-420HL', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP3.0-420HL' },
    { name: 'BON-P-WP2.0-196CH', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP2.0-196CH' },
    { name: 'BON-P-WP2.0-196TR', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP2.0-196TR' },
    { name: 'BON-P-WP3.0-196TR', type: 'model', link: '/product/gasoline-water-pump/BON-P-WP3.0-196TR' },
    
    // Gasoline Engine Models
    { name: 'BON-P-GE-3.0HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-3.0HP' },
    { name: 'BON-P-GE-3.5HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-3.5HP' },
    { name: 'BON-P-GE-4.0HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-4.0HP' },
    { name: 'BON-P-GE-5.0HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-5.0HP' },
    { name: 'BON-P-GE-7.0HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-7.0HP' },
    { name: 'BON-P-GE-9.0HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-9.0HP' },
    { name: 'BON-P-GE-13.0HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-13.0HP' },
    { name: 'BON-P-GE-14.0HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-14.0HP' },
    { name: 'BON-P-GE-16.0HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-16.0HP' },
    { name: 'BON-P-GE-24.0HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-24.0HP' },
    { name: 'BON-P-GE-34.0HP', type: 'model', link: '/product/gasoline-engine/BON-P-GE-34.0HP' },
    
    // Gasoline Generator Models
    { name: 'BON-P-GG-1.0KW', type: 'model', link: '/product/gasoline-generator/BON-P-GG-1.0KW' },
    { name: 'BON-P-GG-1.2KW', type: 'model', link: '/product/gasoline-generator/BON-P-GG-1.2KW' },
    { name: 'BON-P-GG-2.5KW', type: 'model', link: '/product/gasoline-generator/BON-P-GG-2.5KW' },
    { name: 'BON-P-GG-3.5KW', type: 'model', link: '/product/gasoline-generator/BON-P-GG-3.5KW' },
    { name: 'BON-P-GG-5.0KW', type: 'model', link: '/product/gasoline-generator/BON-P-GG-5.0KW' },
    { name: 'BON-P-GG-6.5KW', type: 'model', link: '/product/gasoline-generator/BON-P-GG-6.5KW' },
    { name: 'BON-P-GG-7.5KW', type: 'model', link: '/product/gasoline-generator/BON-P-GG-7.5KW' },
    { name: 'BON-P-GG-12.0KW', type: 'model', link: '/product/gasoline-generator/BON-P-GG-12.0KW' },
    { name: 'BON-P-GG-13.5KW', type: 'model', link: '/product/gasoline-generator/BON-P-GG-13.5KW' },
    { name: 'BON-P-GG-16.0KW', type: 'model', link: '/product/gasoline-generator/BON-P-GG-16.0KW' },
    
    // Gasoline Inverter Models
    { name: 'BON-P-GI-2.5KW', type: 'model', link: '/product/gasoline-inverter/BON-P-GI-2.5KW' },
    { name: 'BON-P-GI-2.9KW', type: 'model', link: '/product/gasoline-inverter/BON-P-GI-2.9KW' },
    { name: 'BON-P-GI-3.5KW', type: 'model', link: '/product/gasoline-inverter/BON-P-GI-3.5KW' },
    { name: 'BON-P-GI-5.5KW', type: 'model', link: '/product/gasoline-inverter/BON-P-GI-5.5KW' },
    { name: 'BON-P-GI-7.5KW', type: 'model', link: '/product/gasoline-inverter/BON-P-GI-7.5KW' },
    
    // Gasoline Tiller Models
    { name: 'BON-P-GT-52CC', type: 'model', link: '/product/gasoline-tiller/BON-P-GT-52CC' },
    { name: 'BON-P-GT-139CC', type: 'model', link: '/product/gasoline-tiller/BON-P-GT-139CC' },
    { name: 'BON-P-GT-196CC', type: 'model', link: '/product/gasoline-tiller/BON-P-GT-196CC' },
    { name: 'BON-P-GT-224CC', type: 'model', link: '/product/gasoline-tiller/BON-P-GT-224CC' },
    
    // Manual Sprayer Models
    { name: 'BON-P-MS2L', type: 'model', link: '/product/manual-sprayer/BON-P-MS2L' },
    { name: 'BON-P-MS5L', type: 'model', link: '/product/manual-sprayer/BON-P-MS5L' },
    { name: 'BON-P-MS20L-JB', type: 'model', link: '/product/manual-sprayer/BON-P-MS20L-JB' },
    { name: 'BON-P-MS20L-JP', type: 'model', link: '/product/manual-sprayer/BON-P-MS20L-JP' },
    { name: 'BON-P-EMS-20', type: 'model', link: '/product/manual-sprayer/BON-P-EMS-20' },
    
    // Mist Duster Models
    { name: 'BON-P-MD42', type: 'model', link: '/product/mistduster/BON-P-MD42' },
    { name: 'BON-P-MD52', type: 'model', link: '/product/mistduster/BON-P-MD52' },
    { name: 'BON-P-MD82', type: 'model', link: '/product/mistduster/BON-P-MD82' },
    
    // Thermal Fogger Models
    { name: 'BON-P-TF6L', type: 'model', link: '/product/thermal-fogger/BON-P-TF6L' },
    { name: 'BON-P-TF2L', type: 'model', link: '/product/thermal-fogger/BON-P-TF2L' },
    
    // Electric Lawn Mower Models
    { name: 'BON-E-LM-1600W', type: 'model', link: '/product/electric/BON-E-LM-1600W' },
    { name: 'BON-E-LM-1800W', type: 'model', link: '/product/electric/BON-E-LM-1800W' },
    
    // Electric Pressure Washer Models
    { name: 'BON-P-PW-E2.2KW', type: 'model', link: '/product/electric-pressure-washer/BON-P-PW-E2.2KW' },
    { name: 'BON-P-PW-E3.0KW', type: 'model', link: '/product/electric-pressure-washer/BON-P-PW-E3.0KW' },
    { name: 'BON-P-PW-E5.5KW', type: 'model', link: '/product/electric-pressure-washer/BON-P-PW-E5.5KW' },
    { name: 'BON-P-PW-E7.5KW', type: 'model', link: '/product/electric-pressure-washer/BON-P-PW-E7.5KW' },
    
    // Solar Panel Models
    { name: 'BON-MC-SP-430W', type: 'model', link: '/product/solar-panel/BON-MC-SP-430W' },
    
    // Submersible Pump Models
    { name: 'BON-P-SP-0.5HP', type: 'model', link: '/product/submersible-pump/BON-P-SP-0.5HP' },
    { name: 'BON-P-SP-1.0HP', type: 'model', link: '/product/submersible-pump/BON-P-SP-1.0HP' },
    { name: 'BON-P-SP-3.0HP', type: 'model', link: '/product/submersible-pump/BON-P-SP-3.0HP' },
    { name: 'BON-P-SP-2.0HP', type: 'model', link: '/product/submersible-pump/BON-P-SP-2.0HP' },
    { name: 'BON-P-SP-1.5HP', type: 'model', link: '/product/submersible-pump/BON-P-SP-1.5HP' },
    
    // Gasoline Pressure Washer Models
    { name: 'BON-P-PW-G6.5HP-AP', type: 'model', link: '/product/gasoline-pressure-washer/BON-P-PW-G6.5HP-AP' },
    { name: 'BON-P-PW-6.5HP-TP', type: 'model', link: '/product/gasoline-pressure-washer/BON-P-PW-6.5HP-TP' },
    { name: 'BON-P-PW-G6.5HP-TP', type: 'model', link: '/product/gasoline-pressure-washer/BON-P-PW-G6.5HP-TP' },
    { name: 'BON-P-PW-G9.0HP-TP', type: 'model', link: '/product/gasoline-pressure-washer/BON-P-PW-G9.0HP-TP' },
    { name: 'BON-P-PW-G13.0HP-TP', type: 'model', link: '/product/gasoline-pressure-washer/BON-P-PW-G13.0HP-TP' },
    
    // Pressure Washer Home Use Models
    { name: 'BON-E-PW-1400W', type: 'model', link: '/product/pressure-washer-home-use/BON-E-PW-1400W' },
    { name: 'BON-E-PW-1600W', type: 'model', link: '/product/pressure-washer-home-use/BON-E-PW-1600W' },
    { name: 'BON-E-PW-2000W', type: 'model', link: '/product/pressure-washer-home-use/BON-E-PW-2000W' },
    
    // Direct Driven Air Compressor Models
    { name: 'BON-P-DDAC-25L', type: 'model', link: '/product/direct-driven-air-compressor/BON-P-DDAC-25L' },
    { name: 'BON-P-DDAC-50L', type: 'model', link: '/product/direct-driven-air-compressor/BON-P-DDAC-50L' },
    
    // Vacuum Cleaner Models
    { name: 'BON-VC-1400W-30L', type: 'model', link: '/product/vacuum-cleaner/BON-VC-1400W-30L' },
    { name: 'BON-VC-1400W-50L', type: 'model', link: '/product/vacuum-cleaner/BON-VC-1400W-50L' },
    
    // Electric Motor Models
    { name: 'BON-EM-LRPM-1.0HP', type: 'model', link: '/product/electric-motor/BON-EM-LRPM-1.0HP' },
    { name: 'BON-EM-LRPM-2.0HP', type: 'model', link: '/product/electric-motor/BON-EM-LRPM-2.0HP' },
    { name: 'BON-EM-LRPM-3.0HP', type: 'model', link: '/product/electric-motor/BON-EM-LRPM-3.0HP' },
    { name: 'BON-EM-LRPM-4.0HP', type: 'model', link: '/product/electric-motor/BON-EM-LRPM-4.0HP' },
    { name: 'BON-EM-HRPM-1.0HP', type: 'model', link: '/product/electric-motor/BON-EM-HRPM-1.0HP' },
    { name: 'BON-EM-HRPM-2.0HP', type: 'model', link: '/product/electric-motor/BON-EM-HRPM-2.0HP' },
    { name: 'BON-EM-HRPM-3.0HP', type: 'model', link: '/product/electric-motor/BON-EM-HRPM-3.0HP' },
    { name: 'BON-EM-HRPM-4.0HP', type: 'model', link: '/product/electric-motor/BON-EM-HRPM-4.0HP' },
    
    // Centrifugal Pump Models
    { name: 'BON-P-CP-0.5HP', type: 'model', link: '/product/centrifugal-pump/BON-P-CP-0.5HP' },
    { name: 'BON-P-CP-2.0HP', type: 'model', link: '/product/centrifugal-pump/BON-P-CP-2.0HP' },
    { name: 'BON-P-CP-1.0HP', type: 'model', link: '/product/centrifugal-pump/BON-P-CP-1.0HP' },
    
    // Welding Machine Models
    { name: 'BON-WM-DUAL-200A', type: 'model', link: '/product/welding-machines/BON-WM-DUAL-200A' },
    { name: 'BON-WM-DUAL-130A', type: 'model', link: '/product/welding-machines/BON-WM-DUAL-130A' },
    { name: 'BON-WM-DUAL-160A', type: 'model', link: '/product/welding-machines/BON-WM-DUAL-160A' },
    
    // Additional Gasoline Generator Models (corrected from script output)
    { name: 'BON-P-GG-2.8KW', type: 'model', link: '/product/gasoline-generator/BON-P-GG-2.8KW' },
    { name: 'BON-P-GG-3.7KW', type: 'model', link: '/product/gasoline-generator/BON-P-GG-3.7KW' },
    { name: 'BON-P-GG-9.0KW', type: 'model', link: '/product/gasoline-generator/BON-P-GG-9.0KW' },
    { name: 'BON-P-GG-9.5KW', type: 'model', link: '/product/gasoline-generator/BON-P-GG-9.5KW' },
    
    // Additional Gasoline Inverter Models
    { name: 'BON-P-GI-1.8KW', type: 'model', link: '/product/gasoline-inverter/BON-P-GI-1.8KW' },
    { name: 'BON-P-GI-2.1KW', type: 'model', link: '/product/gasoline-inverter/BON-P-GI-2.1KW' },
    { name: 'BON-P-GI-3.8KW', type: 'model', link: '/product/gasoline-inverter/BON-P-GI-3.8KW' },
    
    // Additional Tiller Models
    { name: 'BON-DI-950', type: 'model', link: '/product/gasoline-tiller/BON-DI-950' },
    { name: 'BON-GT-500B', type: 'model', link: '/product/gasoline-tiller/BON-GT-500B' },
    { name: 'BON-GT-500S', type: 'model', link: '/product/gasoline-tiller/BON-GT-500S' },
    { name: 'BON-GT-900', type: 'model', link: '/product/gasoline-tiller/BON-GT-900' },
    { name: 'BON-GT-950T', type: 'model', link: '/product/gasoline-tiller/BON-GT-950T' },
    { name: 'BON-GT-950C', type: 'model', link: '/product/gasoline-tiller/BON-GT-950C' },
    
    // Additional Brush Cutter Models
    { name: 'BON-P-BC36', type: 'model', link: '/product/brush-cutter/BON-P-BC36' },
    { name: 'BON-P-BC45', type: 'model', link: '/product/brush-cutter/BON-P-BC45' },
    { name: 'BON-ET-BC53', type: 'model', link: '/product/brush-cutter/BON-ET-BC53' },
    
    // Backpack Brush Cutter Models
    { name: 'BON-P-BP-BC45', type: 'model', link: '/product/backpack-brush-cutter/BON-P-BP-BC45' },
    
    // Multi Tool Models
    { name: 'BON-P-MT45', type: 'model', link: '/product/multi-tool/BON-P-MT45' },
    
    // Chainsaw Models
    { name: 'BON-P-CS40', type: 'model', link: '/product/chainsaw/BON-P-CS40' },
    { name: 'BON-P-CS55', type: 'model', link: '/product/chainsaw/BON-P-CS55' },
    { name: 'BON-P-CS65', type: 'model', link: '/product/chainsaw/BON-P-CS65' },
    { name: 'BON-P-CS92', type: 'model', link: '/product/chainsaw/BON-P-CS92' },
    
    // Hedge Trimmer Models
    { name: 'BON-P-HT23', type: 'model', link: '/product/hedge-trimmer/BON-P-HT23' },
    
    // Blower Models
    { name: 'BON-P-BBL53', type: 'model', link: '/product/blower/BON-P-BBL53' },
    { name: 'BON-P-BL26', type: 'model', link: '/product/blower/BON-P-BL26' },
    { name: 'BON-P-BLV26', type: 'model', link: '/product/blower/BON-P-BLV26' },
    
    // Earth Auger Models
    { name: 'BON-P-EA63', type: 'model', link: '/product/earth-auger/BON-P-EA63' },
    { name: 'BON-P-EA52', type: 'model', link: '/product/earth-auger/BON-P-EA52' },
    { name: 'BON-P-EA159-4S', type: 'model', link: '/product/earth-auger/BON-P-EA159-4S' },
    
    // Water Pump 2 Stroke Models
    { name: 'BON-WP1.0-52-2S', type: 'model', link: '/product/water-pump-2-stroke/BON-WP1.0-52-2S' },
    
    // 2-Stroke Engine Models
    { name: 'BON-E-2S-23', type: 'model', link: '/product/engine-2-stroke/BON-E-2S-23' },
    { name: 'BON-E-2S-26', type: 'model', link: '/product/engine-2-stroke/BON-E-2S-26' },
    
    // Lawn Mower Models
    { name: 'BON-P-LM22', type: 'model', link: '/product/lawn-mower/BON-P-LM22' },
    
    // Diesel Water Pump Models
    { name: 'BON-P-DWP2.0-5.0HP', type: 'model', link: '/product/diesel-water-pump/BON-P-DWP2.0-5.0HP' },
    { name: 'BON-P-DWP3.0-5.5HP', type: 'model', link: '/product/diesel-water-pump/BON-P-DWP3.0-5.5HP' },
    { name: 'BON-P-DWP4.0-10.0HP', type: 'model', link: '/product/diesel-water-pump/BON-P-DWP4.0-10.0HP' },
    { name: 'BON-P-DWP2.0-10.0HP', type: 'model', link: '/product/diesel-water-pump/BON-P-DWP2.0-10.0HP' },
    { name: 'BON-P-DWP3.0-10.5HP', type: 'model', link: '/product/diesel-water-pump/BON-P-DWP3.0-10.5HP' },
    
    // Diesel Generator Models
    { name: 'BON-P-DG-6.0KW', type: 'model', link: '/product/diesel-generator/BON-P-DG-6.0KW' },
    { name: 'BON-P-DG-6.5KW', type: 'model', link: '/product/diesel-generator/BON-P-DG-6.5KW' },
    { name: 'BON-P-DG-3.0KW', type: 'model', link: '/product/diesel-generator/BON-P-DG-3.0KW' },
    { name: 'BON-P-DG-9.0KW', type: 'model', link: '/product/diesel-generator/BON-P-DG-9.0KW' },
    { name: 'BON-P-DG-10.0KW', type: 'model', link: '/product/diesel-generator/BON-P-DG-10.0KW' },
    
    // Diesel Engine Models
    { name: 'BON-P-DE-5.5HP', type: 'model', link: '/product/diesel-engine/BON-P-DE-5.5HP' },
    { name: 'BON-P-DE-5.0HP', type: 'model', link: '/product/diesel-engine/BON-P-DE-5.0HP' },
    { name: 'BON-P-DE-6.0HP', type: 'model', link: '/product/diesel-engine/BON-P-DE-6.0HP' },
    { name: 'BON-P-DE-9.0HP', type: 'model', link: '/product/diesel-engine/BON-P-DE-9.0HP' },
    { name: 'BON-P-DE-10.2HP', type: 'model', link: '/product/diesel-engine/BON-P-DE-10.2HP' },
    { name: 'BON-P-DE-11.0HP', type: 'model', link: '/product/diesel-engine/BON-P-DE-11.0HP' },
    { name: 'BON-P-DE-13.0HP', type: 'model', link: '/product/diesel-engine/BON-P-DE-13.0HP' },
    { name: 'BON-P-DE-18.3HP', type: 'model', link: '/product/diesel-engine/BON-P-DE-18.3HP' },
    
    // Tamping Rammer Models
    { name: 'BON-P-TR-13.7KN-4.0HP', type: 'model', link: '/product/tamping-rammer/BON-P-TR-13.7KN-4.0HP' },
    { name: 'BON-P-TR-10KN-4.0HP', type: 'model', link: '/product/tamping-rammer/BON-P-TR-10KN-4.0HP' },
    
    // Plate Compactor Models
    { name: 'BON-P-PC-10.5KN-6.5HP', type: 'model', link: '/product/plate-compactor/BON-P-PC-10.5KN-6.5HP' },
    { name: 'BON-P-PC-11KN-6.5HP', type: 'model', link: '/product/plate-compactor/BON-P-PC-11KN-6.5HP' },
    { name: 'BON-P-PC-15KN-6.5HP', type: 'model', link: '/product/plate-compactor/BON-P-PC-15KN-6.5HP' },
    
    // Concrete Cutter Models
    { name: 'BON-P-CC-14CM-13HP', type: 'model', link: '/product/concrete-cutter/BON-P-CC-14CM-13HP' },
    { name: 'BON-P-CC-15CM-13HP', type: 'model', link: '/product/concrete-cutter/BON-P-CC-15CM-13HP' },
    
    // Concrete Vibrator Models
    { name: 'BON-P-CV-6M-6.5HP', type: 'model', link: '/product/concrete-vibrator/BON-P-CV-6M-6.5HP' },
    
    // Concrete Power Trowel Models
    { name: 'BON-PT-6.5HP', type: 'model', link: '/product/concrete-power-trowel/BON-PT-6.5HP' },
    { name: 'BON-SFS-38CC', type: 'model', link: '/product/concrete-power-trowel/BON-SFS-38CC' },
    
    // Knapsack Sprayer Models
    { name: 'BON-P-KS26', type: 'model', link: '/product/knapsack-sprayer/BON-P-KS26' },
    { name: 'BON-P-KS37', type: 'model', link: '/product/knapsack-sprayer/BON-P-KS37' },
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
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const languages = [
    { code: 'en', name: t('header.language.english', 'English') },
    { code: 'es', name: t('header.language.spanish', 'Español')},
    { code: 'pt', name: t('header.language.portuguese', 'Português')}
  ];

  const links = [
    { href: "/", label: t('header.navigation.home', 'Home') },
    { href: "/about-us", label: t('header.navigation.about', 'About Us') },
    { href: "/product", label: t('header.navigation.products', 'Products'), hasDropdown: false },
    { href: "/spare-parts", label: t('header.navigation.spareparts', 'Spare Parts') },
    { href: "/events", label: t('header.navigation.fair', 'Trade Fairs') },
    // { href: "/gallery", label: t('header.navigation.gallery', 'Gallery'), hasDropdown: true },
    // { href: "/blog", label: "Success Stories" },
    { href: "/contact-us", label: t('header.navigation.contact', 'Contact Us') }
  ]

  // Product categories for dropdown
  const productCategories = [
    { name: "Agro Industrial", slug: "agro-industrial", icon: "🚜" },
    { name: "Garden & Forestry", slug: "garden-forestry", icon: "🌲" },
    { name: "Diesel Machines", slug: "diesel-machines", icon: "⚙️" },
    { name: "Electric Machines", slug: "electric-machines", icon: "⚡" },
    { name: "Solar", slug: "solar", icon: "☀️" },
    { name: "Sprayers", slug: "sprayers", icon: "💧" },
    { name: "Domestic & Commercial", slug: "domestic-commercial", icon: "🏠" },
    { name: "Industrial", slug: "industrial", icon: "🏭" },
    { name: "Construction", slug: "construction", icon: "🏗️" },
    { name: "Tools", slug: "tools", icon: "🔧" },
    { name: "Wood Chipper", slug: "wood-chipper", icon: "🪵" },
    { name: "Special Segment", slug: "special-segment", icon: "⭐" }
  ];

  // Product dropdown timeout handlers
  const handleProductDropdownEnter = () => {
    if (productDropdownTimeout) {
      clearTimeout(productDropdownTimeout);
      setProductDropdownTimeout(null);
    }
    setIsProductsDropdownOpen(true);
  };

  const handleProductDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setIsProductsDropdownOpen(false);
    }, 300); // 0.3 second delay
    setProductDropdownTimeout(timeout);
  };

  // Gallery dropdown timeout handlers
  const handleGalleryDropdownEnter = () => {
    if (galleryDropdownTimeout) {
      clearTimeout(galleryDropdownTimeout);
      setGalleryDropdownTimeout(null);
    }
    setIsGalleryDropdownOpen(true);
  };

  const handleGalleryDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setIsGalleryDropdownOpen(false);
    }, 300); // 0.3 second delay
    setGalleryDropdownTimeout(timeout);
  };

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (productDropdownTimeout) {
        clearTimeout(productDropdownTimeout);
      }
      if (galleryDropdownTimeout) {
        clearTimeout(galleryDropdownTimeout);
      }
    };
  }, [productDropdownTimeout, galleryDropdownTimeout]);

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
      setIsSearchOpen(false);
      setShowSearchResults(false);
      setSearchQuery('');
    } else if (searchResults.length > 1) {
      setShowSearchResults(true);
    } else {
      // Optionally show 'no results found'
      setShowSearchResults(true);
    }
  }

  // Language switching function
  const handleLanguageChange = (langCode) => {
    switchLocale(langCode);
    setIsLanguageDropdownOpen(false);
  };

  // Handle scroll events for header transformation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Focus on search input when opening
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    }
  };

  // Hamburger icon for mobile
  const Hamburger = ({ open, toggle }) => (
    <button
      className="flex flex-col justify-center items-center w-10 h-10 z-50 focus:outline-none lg:hidden"
      aria-label="Toggle menu"
      onClick={toggle}
      type="button"
    >
      <span className="sr-only">Open main menu</span>
      <motion.span
        animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }}
        className="block w-7 h-1 bg-white rounded mb-1 origin-center transition-all"
      />
      <motion.span
        animate={{ opacity: open ? 0 : 1 }}
        className="block w-7 h-1 bg-white rounded mb-1 origin-center transition-all"
      />
      <motion.span
        animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }}
        className="block w-7 h-1 bg-white rounded origin-center transition-all"
      />
    </button>
  );

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Desktop/Tablet Header (untouched, just add responsive tweaks) */}
      <section
        className={`transition-all duration-700 ease-out ${isScrolled ? 'opacity-0 pointer-events-none transform -translate-y-4' : 'opacity-100 transform translate-y-0'} hidden lg:block`}
      >
        <div className="flex flex-row justify-around items-center gap-10 text-white">
            <div className="image pt-5">
              <Link href="/">
                <img
                    src="/logo.png"
                    alt="Bonhoeffer Machines Logo"
                    className="h-20 pl-10 pr-10"
                />
              </Link>

                {/* <h1 className="text-2xl font-bold mt-5 py-1 pl-5 bg-[#989b2e] w-70 rounded-r-xl">Become Our Dealer</h1> */}
            </div>

            <nav className="relative">
                <ul className="flex justify-center space-x-6">
                    {links.map((item) => (
                        <li key={item.href + item.label} className="relative">
                            {item.hasDropdown ? (
                                <div
                                    className="relative"
                                    onMouseEnter={item.label === 'Products' ? handleProductDropdownEnter : handleGalleryDropdownEnter}
                                    onMouseLeave={item.label === 'Products' ? handleProductDropdownLeave : handleGalleryDropdownLeave}
                                >
                                    <Link
                                        href={item.href}
                                        className="text-xl font-semibold text-white hover:text-gray-400 cursor-pointer flex items-center space-x-1"
                                    >
                                        <span>{item.label}</span>
                                        <svg 
                                            className={`w-4 h-4 transition-transform duration-200 ${
                                                (item.label === 'Products' && isProductsDropdownOpen) || 
                                                (item.label === 'Gallery' && isGalleryDropdownOpen) ? 'rotate-180' : ''
                                            }`}
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </Link>
                                    
                                    {/* Products Dropdown */}
                                    {item.label === 'Products' && isProductsDropdownOpen && (
                                        <div className="absolute top-full left-0 mt-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-800 z-50 min-w-[400px] max-w-[600px]">
                                            <div className="p-6">
                                                <h3 className="font-bold text-gray-100 mb-4 text-lg">Product Categories</h3>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {productCategories.map((category) => (
                                                        <Link
                                                            key={category.slug}
                                                            href="/product"
                                                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#989b2e] hover:text-white transition-colors group"
                                                        >
                                                            {/* <span className="text-xl">{category.icon}</span> */}
                                                            <span className="text-sm font-medium">{category.name}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                                <div className="mt-4 pt-4 border-t border-gray-200">
                                                    <Link
                                                        href="/product"
                                                        className="inline-flex items-center space-x-2 text-[#989b2e] hover:text-[#7a7d24] font-medium"
                                                    >
                                                        <span>View All Products</span>
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Gallery Dropdown */}
                                    {item.label === 'Gallery' && isGalleryDropdownOpen && (
                                        <div className="absolute top-full left-0 mt-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-800 z-50 min-w-[200px]">
                                            <div className="p-4">
                                                <h3 className="font-bold text-gray-100 mb-3 text-lg">Gallery</h3>
                                                <div className="space-y-2">
                                                    <Link
                                                        href="/gallery/photos"
                                                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#989b2e] hover:text-white transition-colors group"
                                                    >
                                                        {/* <span className="text-xl">📸</span> */}
                                                        <span className="text-sm font-medium">Photos</span>
                                                    </Link>
                                                    <Link
                                                        href="/gallery/videos"
                                                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#989b2e] hover:text-white transition-colors group"
                                                    >
                                                        {/* <span className="text-xl">🎥</span> */}
                                                        <span className="text-sm font-medium">Videos</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="text-xl font-semibold text-white hover:text-gray-400 cursor-pointer"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
            
            <div className='flex flex-row items-center gap-4'>
              <div className="">
                  <button 
                      onClick={toggleSearch}
                      className="text-white hover:text-gray-400 transition-colors duration-200 p-2 cursor-pointer"
                      aria-label="Open search"
                  >
                      <svg 
                          className="w-6 h-6" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                      >
                          <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                          />
                      </svg>
                  </button>
              </div>

              <div className="relative pr-0">
                  <button
                      onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                      className="flex items-center space-x-2 text-white hover:text-gray-400 transition-colors duration-200 p-2 cursor-pointer"
                      aria-label="Change language"
                  >
                      <span className="text-xl">
                          {languages.find(lang => lang.code === currentLocale)?.flag}
                      </span>
                      <span className="text-xl font-medium">
                          {languages.find(lang => lang.code === currentLocale)?.name}
                      </span>
                      <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                      >
                          <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M19 9l-7 7-7-7" 
                          />
                      </svg>
                  </button>

                  {isLanguageDropdownOpen && (
                      <div className="absolute top-full right-0 mt-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-lg border border-[#989b2e] py-2 z-50 min-w-[160px]">
                          {languages.map((language) => (
                              <button
                                  key={language.code}
                                  onClick={() => handleLanguageChange(language.code)}
                                  className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-[#989b2e] transition-colors cursor-pointer duration-150 ${
                                      currentLocale === language.code ? 'bg-[#989b2e] text-white font-medium' : 'text-gray-100'
                                  }`}
                              >
                                  <span className="text-xl">{language.flag}</span>
                                  <span className="text-lg">{language.name}</span>
                                  {currentLocale === language.code && (
                                      <svg className="w-4 h-4 ml-auto text-white" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                  )}
                              </button>
                          ))}
                      </div>
                  )}
              </div>
            </div>
        </div>
      </section>

      {/* Capsule Sticky Header (untouched, just add responsive tweaks) */}
      <div
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-700 ease-out ${isScrolled ? 'opacity-100 translate-y-4' : 'opacity-0 -translate-y-8 pointer-events-none'} hidden lg:block`}
      >
        <div className="bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-lg rounded-full shadow-2xl px-8 py-3">
          <nav className="relative">
            <ul className="flex items-center space-x-8">
              {links.map((item) => (
                <li key={`capsule-${item.href + item.label}`} className="relative">
                  {item.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={item.label === 'Products' ? handleProductDropdownEnter : handleGalleryDropdownEnter}
                      onMouseLeave={item.label === 'Products' ? handleProductDropdownLeave : handleGalleryDropdownLeave}
                    >
                      <Link
                        href={item.href}
                        className="text-lg font-medium text-white hover:text-[#989b2e] cursor-pointer flex items-center space-x-1 transition-colors duration-200 whitespace-nowrap"
                      >
                        <span>{item.label}</span>
                        <svg 
                          className={`w-3 h-3 transition-transform duration-200 ${
                            (item.label === 'Products' && isProductsDropdownOpen) || 
                            (item.label === 'Gallery' && isGalleryDropdownOpen) ? 'rotate-180' : ''
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Link>
                      
                      {/* Products Dropdown for Capsule */}
                      {item.label === 'Products' && isProductsDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-800 z-50 min-w-[400px] max-w-[600px]">
                          <div className="p-6">
                            <h3 className="font-bold text-gray-100 mb-4 text-lg">Product Categories</h3>
                            <div className="grid grid-cols-2 gap-3">
                              {productCategories.map((category) => (
                                <Link
                                  key={category.slug}
                                  href="/product"
                                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#989b2e] hover:text-white transition-colors group"
                                >
                                  <span className="text-base font-medium">{category.name}</span>
                                </Link>
                              ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <Link
                                href="/product"
                                className="inline-flex items-center space-x-2 text-[#989b2e] hover:text-[#7a7d24] font-medium"
                              >
                                <span>View All Products</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Gallery Dropdown for Capsule */}
                      {item.label === 'Gallery' && isGalleryDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-800 z-50 min-w-[200px]">
                          <div className="p-4">
                            <h3 className="font-bold text-gray-100 mb-3 text-lg">Gallery</h3>
                            <div className="space-y-2">
                              <Link
                                href="/gallery/photos"
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#989b2e] hover:text-white transition-colors group"
                              >
                                {/* <span className="text-xl">📸</span> */}
                                <span className="text-base font-medium">Photos</span>
                              </Link>
                              <Link
                                href="/gallery/videos"
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#989b2e] hover:text-white transition-colors group"
                              >
                                {/* <span className="text-xl">🎥</span> */}
                                <span className="text-base font-medium">Videos</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-lg font-medium text-white hover:text-[#989b2e] cursor-pointer transition-colors duration-200 whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              
              {/* Search button in capsule */}
              <li>
                <button 
                  onClick={toggleSearch}
                  className="text-white hover:text-[#989b2e] transition-colors duration-200 p-1 cursor-pointer"
                  aria-label="Open search"
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </button>
              </li>
              
              {/* Language selector in capsule */}
              <li className="relative">
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center space-x-1 text-white hover:text-[#989b2e] transition-colors duration-200 p-1 cursor-pointer"
                  aria-label="Change language"
                >
                  <span className="text-lg font-medium">
                    {languages.find(lang => lang.code === currentLocale)?.name}
                  </span>
                  <svg 
                    className={`w-3 h-3 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </button>

                {isLanguageDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-lg border border-[#989b2e] py-2 z-50 min-w-[160px]">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-[#989b2e] transition-colors cursor-pointer duration-150 ${
                          currentLocale === language.code ? 'bg-[#989b2e] text-white font-medium' : 'text-gray-100'
                        }`}
                      >
                        {/* <span className="text-xl">{language.flag}</span> */}
                        <span className="text-lg">{language.name}</span>
                        {currentLocale === language.code && (
                          <svg className="w-4 h-4 ml-auto text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>



      {/* Mobile/Foldable/Tablet Header (separate, only on < lg screens) */}
      <div className={`lg:hidden fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 flex items-center justify-between px-4 py-3 transition-all duration-300${mobileMenuOpen ? ' opacity-0 pointer-events-none' : ' opacity-100'}`}>
        <Link href="/">
          <img src="/logo.png" alt="Bonhoeffer Machines Logo" className="h-12" />
        </Link>
        
        {/* Mobile Search and Language Switcher */}
        <div className="flex items-center space-x-3">
          {/* Mobile Search Icon */}
          <button 
            onClick={toggleSearch}
            className="text-white hover:text-[#989b2e] transition-colors duration-200 p-2 cursor-pointer"
            aria-label="Open search"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </button>

          {/* Mobile Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center space-x-1 text-white hover:text-[#989b2e] transition-colors duration-200 p-2 cursor-pointer"
              aria-label="Change language"
            >
              <span className="text-lg font-medium">
                {currentLocale.toUpperCase()}
              </span>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </button>

            {isLanguageDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-lg border border-[#989b2e] py-2 z-50 min-w-[12px]">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`w-full flex items-center justify-between px-4 py-2 text-left hover:bg-[#989b2e] transition-colors cursor-pointer duration-150 ${
                      currentLocale === language.code ? 'bg-[#989b2e] text-white font-medium' : 'text-gray-100'
                    }`}
                  >
                    <span className="text-base font-medium">{language.code.toUpperCase()}</span>
                    {currentLocale === language.code && (
                      <svg className="w-4 h-4 ml-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Hamburger open={mobileMenuOpen} toggle={() => setMobileMenuOpen((v) => !v)} />
        </div>
      </div>
      {/* Animated Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex justify-end lg:hidden"
          >
            <motion.div
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.05 }}
              className="w-4/5 max-w-xs h-full overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl p-7 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <img src="/logo.png" alt="Bonhoeffer Machines Logo" className="h-20" />
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" className="text-gray-300 hover:text-white p-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Mobile Nav Links */}
              <ul className="flex flex-col gap-5">
                {links.map((item) => (
                  <li key={item.href + item.label}>
                    <Link
                      href={item.href}
                      className="text-xl font-semibold text-white hover:text-[#989b2e] transition-colors duration-200 block py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            {/* Click outside to close */}
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Global Search Overlay - Works for both desktop and mobile */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-16 lg:pt-24 px-2">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-[#989b2e] shadow-2xl rounded-2xl w-full max-w-2xl mx-auto relative">
            <form onSubmit={handleSearchSubmit} className="p-0">
              <div className="flex items-center space-x-4 px-4 lg:px-6 py-4 lg:py-6">
                <div className="flex-1 relative">
                  <input
                    id="search-input"
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder={t('header.search.placeholder', 'Search for products, models, or spare parts...')}
                    className="w-full px-4 lg:px-6 py-3 text-white text-base lg:text-lg bg-gray-900 border border-[#989b2e] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#989b2e] focus:border-transparent placeholder-gray-400"
                    autoComplete="off"
                  />
                  <svg 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#989b2e]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="px-4 lg:px-6 py-3 bg-[#989b2e] text-white rounded-xl hover:bg-[#7a7d24] transition-colors duration-200 font-semibold cursor-pointer shadow text-sm lg:text-base"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={toggleSearch}
                  className="p-2 lg:p-3 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                  aria-label="Close search"
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>
              </div>
              {showSearchResults && (
                <div className="mt-2 pb-4 lg:pb-6 px-4 lg:px-6 max-h-60 lg:max-h-80 overflow-y-auto custom-scrollbar">
                  {searchResults.length > 0 ? (
                    <ul className="divide-y divide-gray-800">
                      {searchResults.map((result, idx) => (
                        <li key={result.link + idx}>
                          <Link
                            href={result.link}
                            className="block px-3 py-3 lg:py-4 hover:bg-[#989b2e] hover:text-white rounded-xl transition-colors text-white/90 text-base lg:text-lg font-medium"
                            onClick={() => { setIsSearchOpen(false); setShowSearchResults(false); setSearchQuery(''); }}
                          >
                            <span className="font-semibold text-white">{result.name}</span>
                            <span className="ml-2 text-xs text-[#989b2e]">({result.type.replace('-', ' ')})</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-gray-400 px-3 py-3 lg:py-4 text-center text-sm lg:text-base">No results found.</div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      )}


      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #989b2e #23272a;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #989b2e 60%, #23272a 100%);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </>
  )
}

export default Header