'use client'
import Events from "@/components/sections/events";
import Hero from "@/components/sections/hero";
import Social from "@/components/sections/social";
import Products from "@/components/sections/products";
import BgLayout from "@/components/templates/bgLayout";
import Producty from "@/components/sections/producty";
import { GlobeDemo } from "@/components/sections/globe";
import Cta from "@/components/sections/cta";
import FloatCta from "@/components/sections/floatCta";

export default function Home() {
  return (
    <BgLayout>
      <Hero/>
      {/* <GlobeDemo/> */}
      <Events/>
      <Social/>
      {/* <Products/> */}
      <Producty/>
      <Cta/>
      <FloatCta/>
    </BgLayout>
  );
}
