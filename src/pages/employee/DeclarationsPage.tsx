import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { FileUp, Save } from 'lucide-react';
import { financialYears } from '@/mockData/employeePortalMiscData';

export default function DeclarationsPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Declarations submitted successfully.', { description: 'Your declarations have been saved.' });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">IT & FBP Declarations</h1>
      <Card className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="flex items-center"><FileUp className="mr-2 h-5 w-5" /> Submit Your Declarations</CardTitle>
            <CardDescription>Provide your investment proofs and flexible benefit plan declarations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1.5 max-w-xs">
              <Label htmlFor="financialYear">Financial Year</Label>
              <Select name="financialYear" required>
                <SelectTrigger id="financialYear"><SelectValue placeholder="Select FY" /></SelectTrigger>
                <SelectContent>{financialYears.map(fy => (<SelectItem key={fy.id} value={fy.id}>{fy.name}</SelectItem>))}</SelectContent>
              </Select>
            </div>

            {/* Section 80C Example */}
            <Card className="bg-muted/30">
              <CardHeader><CardTitle className="text-lg">Section 80C Investments</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                  <div className="space-y-1.5">
                    <Label htmlFor="ppfAmount">Public Provident Fund (PPF)</Label>
                    <Input type="number" id="ppfAmount" placeholder="Enter amount" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ppfProof">Upload Proof for PPF</Label>
                    <Input id="ppfProof" type="file" />
                  </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                  <div className="space-y-1.5">
                    <Label htmlFor="elssAmount">Equity Linked Savings Scheme (ELSS)</Label>
                    <Input type="number" id="elssAmount" placeholder="Enter amount" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="elssProof">Upload Proof for ELSS</Label>
                    <Input id="elssProof" type="file" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FBP Example */}
            <Card className="bg-muted/30">
              <CardHeader><CardTitle className="text-lg">Flexible Benefit Plan (FBP)</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                  <div className="space-y-1.5">
                    <Label htmlFor="mealVoucherAmount">Meal Vouchers</Label>
                    <Input type="number" id="mealVoucherAmount" placeholder="Enter amount claimed" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="mealVoucherProof">Upload Bills/Proofs</Label>
                    <Input id="mealVoucherProof" type="file" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <p className='text-xs text-muted-foreground text-center'>This is a simplified form. More sections will be available in the full version.</p>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full md:w-auto">
              <Save className="mr-2 h-4 w-4" /> Save Declarations
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
