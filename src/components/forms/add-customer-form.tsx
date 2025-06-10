import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';

interface AddCustomerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCustomer?: (customer: any) => void;
}

const serviceTypes = [
  'Garage Door Installation',
  'Garage Door Repair',
  'Spring Replacement',
  'Opener Installation',
  'Maintenance Check',
  'Emergency Service'
];

const communicationPreferences = [
  'Email',
  'Phone calls',
  'Text messages',
  'Mail'
];

export function AddCustomerForm({ open, onOpenChange, onAddCustomer }: AddCustomerFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    alternatePhone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    company: '',
    referredBy: '',
    preferredTechnician: '',
    serviceInterests: [] as string[],
    communicationPreferences: [] as string[],
    notes: '',
    propertyType: '',
    bestTimeToCall: '',
    hasGarage: false,
    garageSize: '',
    currentDoorAge: ''
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceInterestToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      serviceInterests: prev.serviceInterests.includes(service)
        ? prev.serviceInterests.filter(s => s !== service)
        : [...prev.serviceInterests, service]
    }));
  };

  const handleCommunicationPreferenceToggle = (preference: string) => {
    setFormData(prev => ({
      ...prev,
      communicationPreferences: prev.communicationPreferences.includes(preference)
        ? prev.communicationPreferences.filter(p => p !== preference)
        : [...prev.communicationPreferences, preference]
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Name is required.',
        variant: 'destructive',
      });
      return false;
    }
    if (!formData.phone.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Phone number is required.',
        variant: 'destructive',
      });
      return false;
    }
    if (!formData.address.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Address is required.',
        variant: 'destructive',
      });
      return false;
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const newCustomer = {
        id: `cust-${Date.now()}`,
        ...formData,
        status: 'Active',
        totalSpent: 0,
        serviceCount: 0,
        joinDate: new Date().toISOString(),
        lastService: null,
        nextMaintenance: null,
        customerSince: '0 days'
      };

      await onAddCustomer?.(newCustomer);
      
      toast({
        title: 'Customer Added',
        description: `${formData.name} has been added to your customer database.`,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        alternatePhone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        company: '',
        referredBy: '',
        preferredTechnician: '',
        serviceInterests: [],
        communicationPreferences: [],
        notes: '',
        propertyType: '',
        bestTimeToCall: '',
        hasGarage: false,
        garageSize: '',
        currentDoorAge: ''
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error adding customer:', error);
      toast({
        title: 'Error',
        description: 'Failed to add customer. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Add New Customer
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john.smith@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Primary Phone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="alternate-phone">Alternate Phone</Label>
                  <Input
                    id="alternate-phone"
                    value={formData.alternatePhone}
                    onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
                    placeholder="(555) 987-6543"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="ABC Corporation"
                  />
                </div>
                <div>
                  <Label htmlFor="best-time">Best Time to Call</Label>
                  <Select 
                    value={formData.bestTimeToCall} 
                    onValueChange={(value) => handleInputChange('bestTimeToCall', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                      <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                      <SelectItem value="anytime">Anytime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Address Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="123 Main Street"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="San Francisco"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="CA"
                  />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    value={formData.zip}
                    onChange={(e) => handleInputChange('zip', e.target.value)}
                    placeholder="94105"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="property-type">Property Type</Label>
                <Select 
                  value={formData.propertyType} 
                  onValueChange={(value) => handleInputChange('propertyType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="multi-family">Multi-Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Garage Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Garage Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has-garage"
                  checked={formData.hasGarage}
                  onCheckedChange={(checked) => handleInputChange('hasGarage', checked as boolean)}
                />
                <Label htmlFor="has-garage">Property has a garage</Label>
              </div>
              
              {formData.hasGarage && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="garage-size">Garage Size</Label>
                    <Select 
                      value={formData.garageSize} 
                      onValueChange={(value) => handleInputChange('garageSize', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single Car</SelectItem>
                        <SelectItem value="double">Double Car</SelectItem>
                        <SelectItem value="triple">Triple Car</SelectItem>
                        <SelectItem value="custom">Custom Size</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="door-age">Current Door Age</Label>
                    <Select 
                      value={formData.currentDoorAge} 
                      onValueChange={(value) => handleInputChange('currentDoorAge', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select age" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Less than 1 year</SelectItem>
                        <SelectItem value="1-5">1-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10-20">10-20 years</SelectItem>
                        <SelectItem value="20+">20+ years</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Service Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Service Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-base font-medium">Services of Interest</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {serviceTypes.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={`service-${service}`}
                        checked={formData.serviceInterests.includes(service)}
                        onCheckedChange={() => handleServiceInterestToggle(service)}
                      />
                      <Label htmlFor={`service-${service}`} className="text-sm">
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Communication Preferences</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  {communicationPreferences.map((preference) => (
                    <div key={preference} className="flex items-center space-x-2">
                      <Checkbox
                        id={`comm-${preference}`}
                        checked={formData.communicationPreferences.includes(preference)}
                        onCheckedChange={() => handleCommunicationPreferenceToggle(preference)}
                      />
                      <Label htmlFor={`comm-${preference}`} className="text-sm">
                        {preference}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="referred-by">Referred By</Label>
                  <Input
                    id="referred-by"
                    value={formData.referredBy}
                    onChange={(e) => handleInputChange('referredBy', e.target.value)}
                    placeholder="Customer name or source"
                  />
                </div>
                <div>
                  <Label htmlFor="preferred-technician">Preferred Technician</Label>
                  <Select 
                    value={formData.preferredTechnician} 
                    onValueChange={(value) => handleInputChange('preferredTechnician', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select technician" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alex">Alex Rodriguez</SelectItem>
                      <SelectItem value="carlos">Carlos Mendez</SelectItem>
                      <SelectItem value="jessica">Jessica Taylor</SelectItem>
                      <SelectItem value="david">David Brown</SelectItem>
                      <SelectItem value="maria">Maria Garcia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Additional notes about the customer, special instructions, access codes, etc."
                  className="h-24 resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Adding Customer...' : 'Add Customer'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}