
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

interface PricingCardProps {
  plan: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  perMonth?: string;
  features: string[];
  isPopular?: boolean;
  onSubscribe: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  price,
  originalPrice,
  discount,
  perMonth,
  features,
  isPopular = false,
  onSubscribe
}) => {
  return (
    <Card className={`relative ${isPopular ? 'border-2 border-blue-500 shadow-lg' : 'border-gray-200'}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-blue-500 text-white">ตัวเลือกยอดนิยม</Badge>
        </div>
      )}
      
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold mb-6">{plan}</CardTitle>
        
        <div className="mb-4">
          {originalPrice && (
            <p className="text-gray-500 line-through text-lg">฿{originalPrice}</p>
          )}
          <p className="text-4xl font-bold text-gray-900">฿{price}</p>
          {discount && (
            <Badge variant="destructive" className="mt-2">
              ประหยัด {discount}%
            </Badge>
          )}
        </div>
        
        {perMonth && (
          <p className="text-gray-600 mb-8">{perMonth}</p>
        )}
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          onClick={onSubscribe}
          className={`w-full py-3 font-medium ${
            isPopular 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
        >
          สมัครสมาชิก
        </Button>
      </CardContent>
    </Card>
  );
};
