import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, ArrowRight, Save, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

interface LeadQuoteFormProps {
  leadId: string;
}

interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export function LeadQuoteForm({ leadId }: LeadQuoteFormProps) {
  const { toast } = useToast();
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([
    { id: '1', description: 'Garage Door - Sectional', quantity: 1, unitPrice: 950 },
    { id: '2', description: 'Installation Labor', quantity: 1, unitPrice: 250 },
  ]);
  const [notes, setNotes] = useState('');

  const addItem = () => {
    const newItem: QuoteItem = {
      id: Math.random().toString(36).substring(2, 9),
      description: '',
      quantity: 1,
      unitPrice: 0,
    };
    setQuoteItems([...quoteItems, newItem]);
  };

  const removeItem = (id: string) => {
    setQuoteItems(quoteItems.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof QuoteItem, value: string | number) => {
    setQuoteItems(
      quoteItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const subtotal = quoteItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const taxRate = 0.07;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handleSubmit = () => {
    console.log({
      leadId,
      items: quoteItems,
      subtotal,
      tax,
      total,
      notes,
    });

    toast({
      title: 'Quote created',
      description: 'The quote has been created successfully.',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Quote</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Line Items</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addItem}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </div>

            <div className="space-y-2">
              {quoteItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-2 items-center"
                >
                  <div className="col-span-5">
                    <Label
                      htmlFor={`description-${item.id}`}
                      className="sr-only"
                    >
                      Description
                    </Label>
                    <Input
                      id={`description-${item.id}`}
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, 'description', e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Label
                      htmlFor={`quantity-${item.id}`}
                      className="sr-only"
                    >
                      Quantity
                    </Label>
                    <Input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="1"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          'quantity',
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                  <div className="col-span-3">
                    <Label
                      htmlFor={`unitPrice-${item.id}`}
                      className="sr-only"
                    >
                      Unit Price
                    </Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                        $
                      </span>
                      <Input
                        id={`unitPrice-${item.id}`}
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Price"
                        className="pl-7"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            'unitPrice',
                            parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-span-2 flex justify-between items-center">
                    <span className="text-sm font-medium">
                      ${(item.quantity * item.unitPrice).toFixed(2)}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-4">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes for the quote..."
              className="h-24 resize-none mt-1"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={handleSubmit}>
            <ArrowRight className="mr-2 h-4 w-4" />
            Send Quote
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}