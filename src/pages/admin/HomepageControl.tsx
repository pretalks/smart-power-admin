import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Save, 
  Plus, 
  Trash2, 
  Upload, 
  Image as ImageIcon,
  X
} from 'lucide-react';
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  image: string | null;
}

interface ServiceItem {
  id: string;
  title: string;
  image: string | null;
}

const HomepageControl = () => {
  const [whyChooseItems, setWhyChooseItems] = useState<WhyChooseItem[]>([]);
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const docRef = doc(db, 'homepageSections', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setWhyChooseItems(data.whyChooseItems || []);
          setServiceItems(data.serviceItems || []);
        }
      } catch (error) {
        console.error("Error fetching homepage sections:", error);
        toast.error("Failed to load homepage content");
      } finally {
        setLoading(false);
      }
    };
    fetchSections();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'homepageSections', 'main'), {
        whyChooseItems,
        serviceItems
      });
      toast.success('Homepage content saved successfully!');
    } catch (error) {
      console.error("Error saving homepage content:", error);
      toast.error("Failed to save content");
    } finally {
      setSaving(false);
    }
  };

  const addWhyChoose = () => {
    const newItem = { id: Date.now().toString(), title: '', description: '', image: null };
    setWhyChooseItems([...whyChooseItems, newItem]);
  };

  const addService = () => {
    const newItem = { id: Date.now().toString(), title: '', image: null };
    setServiceItems([...serviceItems, newItem]);
  };

  const handleWhyChooseImage = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setWhyChooseItems(whyChooseItems.map(item => 
        item.id === id ? { ...item, image: reader.result as string } : item
      ));
    };
    reader.readAsDataURL(file);
  };

  const handleServiceImage = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setServiceItems(serviceItems.map(item => 
        item.id === id ? { ...item, image: reader.result as string } : item
      ));
    };
    reader.readAsDataURL(file);
  };

  if (loading) {
    return <div className="py-20 text-center text-gray-500">Loading homepage content...</div>;
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Homepage Control</h1>
          <p className="text-gray-500 mt-1">Customize specific sections of your homepage.</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
          {saving ? 'Saving...' : <><Save className="h-4 w-4" /> Save All Changes</>}
        </Button>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Why Choose Us</h2>
          <Button variant="outline" size="sm" onClick={addWhyChoose} className="gap-2">
            <Plus className="h-4 w-4" /> Add Card
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {whyChooseItems.map((item) => (
            <Card key={item.id} className="relative group">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setWhyChooseItems(whyChooseItems.filter(i => i.id !== item.id))}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <CardContent className="pt-6 space-y-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                    {item.image ? (
                      <>
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                        <button onClick={() => setWhyChooseItems(whyChooseItems.map(i => i.id === item.id ? { ...i, image: null } : i))} className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </>
                    ) : (
                      <label className="cursor-pointer">
                        <Upload className="h-6 w-6 text-gray-300" />
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleWhyChooseImage(item.id, e.target.files[0])} />
                      </label>
                    )}
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="space-y-1">
                      <Label className="text-xs uppercase font-bold text-gray-400">Card Title</Label>
                      <Input 
                        value={item.title} 
                        onChange={(e) => setWhyChooseItems(whyChooseItems.map(i => i.id === item.id ? { ...i, title: e.target.value } : i))}
                        placeholder="e.g., Expert Installation"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs uppercase font-bold text-gray-400">Description</Label>
                      <Textarea 
                        value={item.description} 
                        onChange={(e) => setWhyChooseItems(whyChooseItems.map(i => i.id === item.id ? { ...i, description: e.target.value } : i))}
                        placeholder="Describe why customers should choose this..."
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Services Carousel</h2>
          <Button variant="outline" size="sm" onClick={addService} className="gap-2">
            <Plus className="h-4 w-4" /> Add Service
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {serviceItems.map((item) => (
            <Card key={item.id} className="relative group overflow-hidden">
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={() => setServiceItems(serviceItems.filter(i => i.id !== item.id))}
              >
                <X className="h-3 w-3" />
              </Button>
              <div className="aspect-square bg-gray-50 flex flex-col">
                <div className="flex-1 relative group/img">
                  {item.image ? (
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-200" />
                    </div>
                  )}
                  <label className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Upload className="h-6 w-6 text-white" />
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleServiceImage(item.id, e.target.files[0])} />
                  </label>
                </div>
                <div className="p-3">
                  <Input 
                    value={item.title} 
                    onChange={(e) => setServiceItems(serviceItems.map(i => i.id === item.id ? { ...i, title: e.target.value } : i))}
                    placeholder="Service Name"
                    className="h-8 text-sm"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomepageControl;
