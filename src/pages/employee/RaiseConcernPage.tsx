import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ShieldAlert, Send, UploadCloud } from 'lucide-react';
import { concernCategories } from '@/mockData/employeePortalMiscData';

export default function RaiseConcernPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Concern submitted successfully.', { description: 'HR will review your concern shortly.' });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Raise a Concern</h1>
      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="flex items-center"><ShieldAlert className="mr-2 h-5 w-5" /> Submit Your Concern</CardTitle>
            <CardDescription>Please provide details about your concern. It will be handled confidentially.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Select name="category" required>
                <SelectTrigger id="category"><SelectValue placeholder="Select a category" /></SelectTrigger>
                <SelectContent>{concernCategories.map(cat => (<SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input type="text" id="subject" placeholder="Enter a brief subject" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="description">Description of Concern</Label>
              <Textarea id="description" placeholder="Describe your concern in detail..." rows={6} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="attachment">Attachment (Optional)</Label>
              <Input id="attachment" type="file" />
              <p className='text-xs text-muted-foreground'>Mock file upload. Max file size: 5MB.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full md:w-auto">
              <Send className="mr-2 h-4 w-4" /> Submit Concern
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
