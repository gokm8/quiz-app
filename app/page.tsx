import Quiz from '@/components/home-page/hero'
import Hero from '@/components/home-page/hero'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  return (
    <>
      <Quiz />
    </>
  )
}
