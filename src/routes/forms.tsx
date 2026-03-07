import { createFileRoute } from '@tanstack/react-router';
import { BugReportForm } from '@/components/forms/bug_report_form';

export const Route = createFileRoute('/forms')({
  component: RouteComponent,
});

import CityQuizForm from '@/components/forms/character_quiz_form';

function RouteComponent() {
  return (
    <div className="w-screen flex flex-col items-center justify-center bg-background">
      <BugReportForm />
      <div className="py-4" />
      <CityQuizForm />
    </div>
  );
}
