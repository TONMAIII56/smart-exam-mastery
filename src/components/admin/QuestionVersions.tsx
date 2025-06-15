
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, User } from 'lucide-react';
import { QuestionData } from '@/types/admin';

interface QuestionVersionsProps {
  questionId: string;
  onClose: () => void;
}

const QuestionVersions: React.FC<QuestionVersionsProps> = ({ questionId, onClose }) => {
  const { data: versions, isLoading } = useQuery({
    queryKey: ['question-versions', questionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('question_versions')
        .select('*, profiles(first_name, last_name)')
        .eq('question_id', questionId)
        .order('version_number', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const { data: currentQuestion } = useQuery({
    queryKey: ['current-question', questionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('*, options(*), profiles(first_name, last_name)')
        .eq('id', questionId)
        .single();

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading versions...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Version History</h3>
        <Button onClick={onClose} variant="outline">Close</Button>
      </div>

      {/* Current Version */}
      {currentQuestion && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Current Version {currentQuestion.version}</span>
              <Badge className="bg-blue-100 text-blue-800">Current</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Question:</h4>
              <p className="text-gray-700">{currentQuestion.question_text}</p>
            </div>
            
            {currentQuestion.options && currentQuestion.options.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Options:</h4>
                <div className="space-y-2">
                  {currentQuestion.options.map((option: any, index: number) => (
                    <div
                      key={option.id}
                      className={`p-2 rounded ${
                        option.is_correct ? 'bg-green-100 border border-green-200' : 'bg-gray-50'
                      }`}
                    >
                      <span className="font-medium">{index + 1}.</span> {option.option_text}
                      {option.is_correct && (
                        <Badge className="ml-2 bg-green-100 text-green-800">Correct</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentQuestion.explanation && (
              <div>
                <h4 className="font-semibold mb-2">Explanation:</h4>
                <p className="text-gray-700">{currentQuestion.explanation}</p>
              </div>
            )}

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(currentQuestion.updated_at).toLocaleString('th-TH')}</span>
              </div>
              {currentQuestion.profiles && (
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>
                    {Array.isArray(currentQuestion.profiles) 
                      ? `${currentQuestion.profiles[0]?.first_name} ${currentQuestion.profiles[0]?.last_name}`
                      : `${currentQuestion.profiles.first_name} ${currentQuestion.profiles.last_name}`
                    }
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Previous Versions */}
      <div className="space-y-4">
        <h4 className="font-semibold">Previous Versions</h4>
        {versions && versions.length > 0 ? (
          versions.map((version) => {
            const questionData = version.question_data as unknown as QuestionData;
            const profiles = Array.isArray(version.profiles) ? version.profiles[0] : version.profiles;
            
            return (
              <Card key={version.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Version {version.version_number}</span>
                    <Badge variant="outline">Archived</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Question:</h4>
                    <p className="text-gray-700">{questionData?.question_text}</p>
                  </div>
                  
                  {questionData?.options && (
                    <div>
                      <h4 className="font-semibold mb-2">Options:</h4>
                      <div className="space-y-2">
                        {questionData.options.map((option: any, index: number) => (
                          <div
                            key={index}
                            className={`p-2 rounded ${
                              option.is_correct ? 'bg-green-100 border border-green-200' : 'bg-gray-50'
                            }`}
                          >
                            <span className="font-medium">{index + 1}.</span> {option.option_text}
                            {option.is_correct && (
                              <Badge className="ml-2 bg-green-100 text-green-800">Correct</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(version.created_at).toLocaleString('th-TH')}</span>
                    </div>
                    {profiles && (
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>
                          {profiles.first_name} {profiles.last_name}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No previous versions found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuestionVersions;
