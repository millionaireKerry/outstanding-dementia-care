import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, Download, Loader2, Calendar, FileText } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function DailyGoodNews() {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingStep, setGeneratingStep] = useState('');
  
  const { data: editions, isLoading, refetch } = trpc.dailyGoodNews.list.useQuery();
  const { data: exampleEdition } = trpc.dailyGoodNews.getExample.useQuery();
  const generateMutation = trpc.dailyGoodNews.generateToday.useMutation();
  const downloadMutation = trpc.dailyGoodNews.download.useMutation();

  const handleGenerate = async () => {
    if (!user) {
      window.location.href = getLoginUrl();
      return;
    }

    setIsGenerating(true);
    setGeneratingStep('Gathering today\'s uplifting stories...');
    
    // Cycle through progress messages while waiting
    const steps = [
      'Gathering today\'s uplifting stories...',
      'Writing heartwarming content...',
      'Adding reminiscence memories...',
      'Selecting an inspiring quote...',
      'Designing the newspaper layout...',
      'Almost ready — creating your PDF...'
    ];
    let stepIdx = 0;
    const stepTimer = setInterval(() => {
      stepIdx = (stepIdx + 1) % steps.length;
      setGeneratingStep(steps[stepIdx]);
    }, 8000);
    
    try {
      const result = await generateMutation.mutateAsync();
      clearInterval(stepTimer);
      if (result.success) {
        setGeneratingStep('Edition ready!');
        await refetch();
        setTimeout(() => setGeneratingStep(''), 2000);
      }
    } catch (error) {
      clearInterval(stepTimer);
      console.error('Error generating edition:', error);
      setGeneratingStep('');
      alert('Failed to generate today\'s edition. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (id: number, pdfUrl: string, date: Date) => {
    try {
      await downloadMutation.mutateAsync({ id });
      
      // Force download via fetch to avoid blank-page issue in some browsers
      const dateStr = new Date(date).toISOString().split('T')[0];
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `daily-good-news-${dateStr}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading edition:', error);
    }
  };

  const handleViewExample = (pdfUrl: string) => {
    // Force download for cross-browser compatibility
    fetch(pdfUrl)
      .then(r => r.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'daily-good-news-example.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      })
      .catch(() => window.open(pdfUrl, '_blank'));
  };

  const todayEdition = editions?.find(e => {
    const editionDate = new Date(e.editionDate);
    const today = new Date();
    return editionDate.toDateString() === today.toDateString();
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header Banner */}
      <div className="w-full bg-gradient-to-r from-[#E8DCC4] to-[#D4C5A9] py-16">
        <div className="container">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Newspaper size={48} className="text-[#2C5F4F]" />
            <h1 className="text-5xl font-bold text-[#2C5F4F]" style={{ fontFamily: 'Playfair Display, serif' }}>
              Daily Good News
            </h1>
          </div>
          <p className="text-center text-xl text-[#2C5F4F]/80 max-w-3xl mx-auto">
            A respectful, dignified newspaper for care home residents. Only uplifting stories, no doom and gloom.
          </p>
          {exampleEdition && (
            <div className="flex justify-center mt-6">
              <Button
                onClick={() => handleViewExample(exampleEdition.pdfUrl || '')}
                variant="outline"
                size="lg"
                className="retro-button bg-[#bc9c2f] hover:bg-[#a88a28] text-white border-charcoal"
              >
                <FileText className="mr-2" size={20} />
                View Example
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="container py-12">
        {/* Generate Today's Edition Section */}
        <Card className="mb-12 retro-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText size={24} />
              Generate Today's Edition
            </CardTitle>
            <CardDescription>
              Create a fresh edition of Daily Good News with today's positive stories and reminiscence content.
              {!user && " Please log in to generate editions."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {todayEdition ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Today's edition has already been generated!
                </p>
                <Button
                  onClick={() => handleDownload(todayEdition.id, todayEdition.pdfUrl!, todayEdition.editionDate)}
                  className="bg-[#2C5F4F] hover:bg-[#234a3e]"
                >
                  <Download size={18} className="mr-2" />
                  Download Today's Edition
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !user}
                  className="bg-[#2C5F4F] hover:bg-[#234a3e]"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Newspaper size={18} className="mr-2" />
                      Generate Today's Edition
                    </>
                  )}
                </Button>
                {isGenerating && generatingStep && (
                  <div className="flex items-center gap-2 text-sm text-[#2C5F4F] font-medium">
                    <Loader2 size={14} className="animate-spin" />
                    <span>{generatingStep}</span>
                    <span className="text-xs text-muted-foreground ml-1">(this takes about 60 seconds)</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Previous Editions */}
        <div>
          <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Previous Editions
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 size={32} className="animate-spin text-[#2C5F4F]" />
            </div>
          ) : editions && editions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {editions.map((edition) => {
                const editionDate = new Date(edition.editionDate);
                const stories = JSON.parse(edition.stories);
                
                return (
                  <Card key={edition.id} className="retro-border hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar size={16} />
                        {format(editionDate, 'EEEE, MMMM d, yyyy')}
                      </div>
                      <CardTitle className="text-xl">{edition.headline}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold mb-2">Stories:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {stories.slice(0, 3).map((story: any, idx: number) => (
                            <li key={idx}>• {story.title}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{edition.downloadCount || 0} downloads</span>
                      </div>
                      
                      <Button
                        onClick={() => handleDownload(edition.id, edition.pdfUrl!, edition.editionDate)}
                        variant="outline"
                        className="w-full retro-border"
                      >
                        <Download size={16} className="mr-2" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="retro-border">
              <CardContent className="py-12 text-center">
                <Newspaper size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  No editions have been generated yet. Generate today's edition to get started!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
