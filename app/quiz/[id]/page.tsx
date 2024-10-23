'use client'

import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'

export default function QuizPage() {
  const [quiz, setQuiz] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
  }, [])

  return <div>page</div>
}
