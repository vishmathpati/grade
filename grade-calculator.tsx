import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const GradeCalculator = () => {
  const [currentGrade, setCurrentGrade] = useState('');
  const [finalWeight, setFinalWeight] = useState('');
  const [desiredGrade, setDesiredGrade] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateGrade = () => {
    const current = parseFloat(currentGrade);
    const weight = parseFloat(finalWeight);
    const desired = parseFloat(desiredGrade);

    if (isNaN(current) || isNaN(weight) || isNaN(desired)) {
      setError('Please enter valid numbers for all fields.');
      setResult(null);
      return;
    }

    if (weight <= 0 || weight >= 100) {
      setError('Final exam weight must be between 0 and 100.');
      setResult(null);
      return;
    }

    const nonFinalWeight = 100 - weight;
    const requiredScore = (desired - (current * nonFinalWeight / 100)) / (weight / 100);

    if (requiredScore > 100) {
      setError('It is not possible to achieve the desired grade.');
      setResult(null);
    } else if (requiredScore < 0) {
      setError('You have already achieved higher than the desired grade.');
      setResult(null);
    } else {
      setError('');
      setResult(requiredScore.toFixed(2));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Final Grade Calculator</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="currentGrade">Current Grade (%)</Label>
          <Input
            id="currentGrade"
            type="number"
            value={currentGrade}
            onChange={(e) => setCurrentGrade(e.target.value)}
            placeholder="Enter your current grade"
          />
        </div>
        <div>
          <Label htmlFor="finalWeight">Final Exam Weight (%)</Label>
          <Input
            id="finalWeight"
            type="number"
            value={finalWeight}
            onChange={(e) => setFinalWeight(e.target.value)}
            placeholder="Enter final exam weight"
          />
        </div>
        <div>
          <Label htmlFor="desiredGrade">Desired Final Grade (%)</Label>
          <Input
            id="desiredGrade"
            type="number"
            value={desiredGrade}
            onChange={(e) => setDesiredGrade(e.target.value)}
            placeholder="Enter your desired grade"
          />
        </div>
        <Button onClick={calculateGrade} className="w-full">Calculate</Button>
      </div>
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {result !== null && (
        <Alert className="mt-4">
          <AlertTitle>Result</AlertTitle>
          <AlertDescription>
            You need to score {result}% on your final exam to achieve your desired grade.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default GradeCalculator;
