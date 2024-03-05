'use client';

import Image from "next/image";
import './globals.css';


export default function Home() {
  return (
          <main>
              <h1>Home</h1>
              <Image
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  width={72}
                  height={16}
              />
          </main>
  );
}
