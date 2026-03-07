import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CityQuizForm() {
  const [answer, setAnswer] = useState('');
  const submitHandler: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const message =
      answer.toLowerCase() === 'takeru' ? 'Correct!' : 'Incorrect!';
    toast(message);
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Character Quiz</h2>
      <p className="mb-4">
        What is the name of the character from Saiki K who has an unorthodox way
        of holding his chopsticks?
      </p>
      <form onSubmit={submitHandler}>
        <Input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          minLength={6}
          maxLength={6}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
