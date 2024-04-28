// components/ErrorMessage.tsx
import React from 'react';
import { MessageCircleWarning } from 'lucide-react';
interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <MessageCircleWarning  className="h-5 w-5 text-red-500 mr-2" />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
