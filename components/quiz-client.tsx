"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from "lucide-react";

type Question = {
  id: number;
  text: string;
  options: { id: string; text: string }[];
};

type Result = {
  correct: boolean;
  question: string;
  correctAnswer: string;
};

export default function QuizClient() {
  const [state, setState] = useState({
    currentQuestionIndex: 0,
    question: null as Question | null,
    selectedOption: "",
    results: null as Result[] | null,
    score: null as number | null,
    loading: true,
  });

  const fetchQuestion = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    const response = await fetch(`/api/${state.currentQuestionIndex}`);
    const newQuestion = await response.json();
    setState((prev) => ({
      ...prev,
      question: newQuestion,
      selectedOption: "",
      loading: false,
    }));
  };
  
  const handleSubmit = async () => {
    if (!state.selectedOption || !state.question) return;

    setState((prev) => ({ ...prev, loading: true }));

    const response = await fetch(`/api`, {
      method: "POST",
      body: JSON.stringify({
        questionId: state.question.id,
        answerId: state.selectedOption,
      }),
    });

    const data = await response.json();

    if (state.currentQuestionIndex < 2) {
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
      fetchQuestion();
    } else {
      setState((prev) => ({
        ...prev,
        results: data.results,
        score: data.score,
      }));
    }
  };

  if (state.results && state.score !== null) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-center">
          You scored {state.score} out of 3 questions
        </h2>
        <div className="space-y-3">
          {state.results.map((result, index) => (
            <div
              key={index}
              className="flex items-start gap-2 p-3 border rounded-md"
            >
              {result.correct ? (
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <p className="font-medium">{result.question}</p>
                <p className="text-sm text-gray-500">
                  Correct answer: {result.correctAnswer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (state.loading) {
    return <div className="text-center py-4">Connecting to server...</div>;
  }

  if (!state.question) {
    return <div className="text-center py-4">Error loading question</div>;
  }

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-500">
        Question {state.currentQuestionIndex + 1} of 3
      </div>

      <h2 className="text-xl font-bold">{state.question.text}</h2>

      <RadioGroup
        value={state.selectedOption}
        onValueChange={(value) =>
          setState((prev) => ({ ...prev, selectedOption: value }))
        }
        className="space-y-2"
      >
        {state.question.options.map((option, index) => (
          <div
            key={`${option.id}-${index}`}
            className="flex items-center space-x-2 border p-3 rounded-md"
          >
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id} className="flex-grow cursor-pointer">
              {option.text}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <Button
        className="w-full mt-4"
        onClick={handleSubmit}
        disabled={!state.selectedOption}
      >
        {state.currentQuestionIndex < 2 ? "Next Question" : "Submit Quiz"}
      </Button>
    </div>
  );
}
