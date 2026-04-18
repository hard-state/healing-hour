import { useState } from 'react';

function LocationForm({ locationData, onSave, onCancel }: { locationData: any, onSave: (data: any) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    address: {
      line1: locationData?.address?.line1 || '',
      line2: locationData?.address?.line2 || ''
    },
    contact: {
      phone: locationData?.contact?.phone || '',
      email: locationData?.contact?.email || ''
    },
    hours: locationData?.hours || '',
    mapEmbedUrl: locationData?.mapEmbedUrl || '',
    backgroundImage: locationData?.backgroundImage || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
        <input
          type="text"
          value={formData.address.line1}
          onChange={(e) => setFormData({ ...formData, address: { ...formData.address, line1: e.target.value } })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="United Kingdom"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
        <input
          type="text"
          value={formData.address.line2}
          onChange={(e) => setFormData({ ...formData, address: { ...formData.address, line2: e.target.value } })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="London area"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          type="tel"
          value={formData.contact.phone}
          onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, phone: e.target.value } })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="00447843018518"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={formData.contact.email}
          onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="Healingtouch64@outlook.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Business Hours</label>
        <input
          type="text"
          value={formData.hours}
          onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="Monday - Sunday: 9:00 AM - 2:00 AM"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Map Embed URL</label>
        <textarea
          value={formData.mapEmbedUrl}
          onChange={(e) => setFormData({ ...formData, mapEmbedUrl: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          rows={2}
          placeholder="https://www.google.com/maps/embed?..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
        <input
          type="url"
          value={formData.backgroundImage}
          onChange={(e) => setFormData({ ...formData, backgroundImage: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="https://images.unsplash.com/photo-..."
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

export default LocationForm;
