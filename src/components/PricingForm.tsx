import { useState } from 'react';

function PricingForm({ pricingData, onSave, onCancel }: { pricingData: any, onSave: (data: any) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    travelFeePackage: {
      title: pricingData?.travelFeePackage?.title || 'Travel Fee',
      timeRange: pricingData?.travelFeePackage?.timeRange || 'Price from 9:00 AM until 11.00 PM',
      originalPrice: pricingData?.travelFeePackage?.originalPrice || 90,
      discountedPrice: pricingData?.travelFeePackage?.discountedPrice || 70,
      options: pricingData?.travelFeePackage?.options || [{ duration: '60 MINUTE', price: '£70.00 +15 TRAVEL FEE' }]
    },
    uberPackageComplex: {
      title: pricingData?.uberPackageComplex?.title || 'Uber Package',
      timeRange: pricingData?.uberPackageComplex?.timeRange || 'Price from 11.00 PM until 2:00 AM',
      originalPrice: pricingData?.uberPackageComplex?.originalPrice || 130,
      discountedPrice: pricingData?.uberPackageComplex?.discountedPrice || 110,
      options: pricingData?.uberPackageComplex?.options || [{ duration: '60 MINUTE', price: '£110+UBER' }]
    },
    safetyNotice: {
      heading: pricingData?.safetyNotice?.heading || '* MASSAGE TRAVEL FEE ARE REQUIRED',
      content: pricingData?.safetyNotice?.content || 'All massage sessions require travel fee payment'
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateComplexOption = (packageType: 'travelFeePackage' | 'uberPackageComplex', index: number, field: 'duration' | 'price', value: string | number) => {
    const newOptions = [...formData[packageType].options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setFormData({
      ...formData,
      [packageType]: { ...formData[packageType], options: newOptions }
    });
  };

  const addComplexOption = (packageType: 'travelFeePackage' | 'uberPackageComplex') => {
    setFormData({
      ...formData,
      [packageType]: { 
        ...formData[packageType], 
        options: [...formData[packageType].options, { duration: '', price: '' }]
      }
    });
  };

  const removeComplexOption = (packageType: 'travelFeePackage' | 'uberPackageComplex', index: number) => {
    const newOptions = formData[packageType].options.filter((_: any, i: number) => i !== index);
    setFormData({
      ...formData,
      [packageType]: { ...formData[packageType], options: newOptions }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto">
      {/* Travel Fee Package */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Travel Fee Package</h4>
        <input
          type="text"
          value={formData.travelFeePackage.title}
          onChange={(e) => setFormData({ 
            ...formData, 
            travelFeePackage: { ...formData.travelFeePackage, title: e.target.value }
          })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="Title"
        />
        <input
          type="text"
          value={formData.travelFeePackage.timeRange}
          onChange={(e) => setFormData({ 
            ...formData, 
            travelFeePackage: { ...formData.travelFeePackage, timeRange: e.target.value }
          })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="Time Range"
        />
        <div className="flex gap-2 mt-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
            <input
              type="number"
              value={formData.travelFeePackage.originalPrice}
              onChange={(e) => setFormData({ 
                ...formData, 
                travelFeePackage: { ...formData.travelFeePackage, originalPrice: parseInt(e.target.value) || 0 }
              })}
              className="block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Original Price"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Discounted Price</label>
            <input
              type="number"
              value={formData.travelFeePackage.discountedPrice}
              onChange={(e) => setFormData({ 
                ...formData, 
                travelFeePackage: { ...formData.travelFeePackage, discountedPrice: parseInt(e.target.value) || 0 }
              })}
              className="block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Discounted Price"
            />
          </div>
        </div>
        
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Options (Duration & Price)</label>
          {formData.travelFeePackage.options.map((option: any, index: number) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={option.duration}
                onChange={(e) => updateComplexOption('travelFeePackage', index, 'duration', e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                placeholder="Duration (e.g., 60 MINUTE)"
              />
              <input
                type="text"
                value={option.price}
                onChange={(e) => updateComplexOption('travelFeePackage', index, 'price', e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                placeholder="Price (e.g., £70.00 +15 TRAVEL FEE)"
              />
              <button
                type="button"
                onClick={() => removeComplexOption('travelFeePackage', index)}
                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addComplexOption('travelFeePackage')}
            className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
          >
            Add Option
          </button>
        </div>
      </div>

      {/* Uber Package Complex */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Uber Package</h4>
        <input
          type="text"
          value={formData.uberPackageComplex.title}
          onChange={(e) => setFormData({ 
            ...formData, 
            uberPackageComplex: { ...formData.uberPackageComplex, title: e.target.value }
          })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="Title"
        />
        <input
          type="text"
          value={formData.uberPackageComplex.timeRange}
          onChange={(e) => setFormData({ 
            ...formData, 
            uberPackageComplex: { ...formData.uberPackageComplex, timeRange: e.target.value }
          })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="Time Range"
        />
        <div className="flex gap-2 mt-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
            <input
              type="number"
              value={formData.uberPackageComplex.originalPrice}
              onChange={(e) => setFormData({ 
                ...formData, 
                uberPackageComplex: { ...formData.uberPackageComplex, originalPrice: parseInt(e.target.value) || 0 }
              })}
              className="block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Original Price"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Discounted Price</label>
            <input
              type="number"
              value={formData.uberPackageComplex.discountedPrice}
              onChange={(e) => setFormData({ 
                ...formData, 
                uberPackageComplex: { ...formData.uberPackageComplex, discountedPrice: parseInt(e.target.value) || 0 }
              })}
              className="block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Discounted Price"
            />
          </div>
        </div>
        
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Options (Duration & Price)</label>
          {formData.uberPackageComplex.options.map((option: any, index: number) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={option.duration}
                onChange={(e) => updateComplexOption('uberPackageComplex', index, 'duration', e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                placeholder="Duration (e.g., 60 MINUTE)"
              />
              <input
                type="text"
                value={option.price}
                onChange={(e) => updateComplexOption('uberPackageComplex', index, 'price', e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                placeholder="Price (e.g., £110+UBER)"
              />
              <button
                type="button"
                onClick={() => removeComplexOption('uberPackageComplex', index)}
                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addComplexOption('uberPackageComplex')}
            className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
          >
            Add Option
          </button>
        </div>
      </div>

      {/* Safety Notice */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Safety Notice</h4>
        <input
          type="text"
          value={formData.safetyNotice.heading}
          onChange={(e) => setFormData({ 
            ...formData, 
            safetyNotice: { ...formData.safetyNotice, heading: e.target.value }
          })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="Safety Notice Heading"
        />
        <input
          type="text"
          value={formData.safetyNotice.content}
          onChange={(e) => setFormData({ 
            ...formData, 
            safetyNotice: { ...formData.safetyNotice, content: e.target.value }
          })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="Safety Notice Content"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default PricingForm;
