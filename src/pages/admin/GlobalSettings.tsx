import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { uploadImage } from '@/lib/supabase';

const GlobalSettings = () => {
  const [settings, setSettings] = useState({
    phone: '',
    email: '',
    bannerHeading: '',
    bannerSubheading: '',
    bannerImage: null as string | null
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'globalSettings', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as any;
          setSettings(data);
          if (data.bannerImage) setPreviewImage(data.bannerImage);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      let imageUrl = settings.bannerImage;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      
      const dataToSave = { ...settings, bannerImage: imageUrl };
      
      await setDoc(doc(db, 'globalSettings', 'main'), dataToSave);
      toast.success('Global settings saved successfully!');
      setSettings(dataToSave);
      setImageFile(null);
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      setImageFile(file);
    }
  };

  if (loading) {
    return <div className="flex h-96 items-center justify-center">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Global Settings</h1>
          <p className="text-gray-500 mt-1">Manage core website information and hero banner.</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
          {saving ? 'Saving...' : <><Save className="h-4 w-4" /> Save Changes</>}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>These details appear in header and footer.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={settings.phone} 
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={settings.email} 
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  placeholder="info@smartpowersolar.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Hero Banner</CardTitle>
            <CardDescription>Main banner content for the homepage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="heading">Banner Heading</Label>
                  <Input 
                    id="heading" 
                    value={settings.bannerHeading} 
                    onChange={(e) => setSettings({ ...settings, bannerHeading: e.target.value })}
                    placeholder="Premium Solar Solutions"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subheading">Banner Subheading</Label>
                  <Textarea 
                    id="subheading" 
                    value={settings.bannerSubheading} 
                    onChange={(e) => setSettings({ ...settings, bannerSubheading: e.target.value })}
                    placeholder="Leading the way in renewable energy..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Banner Image</Label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
                  {previewImage ? (
                    <div className="relative group">
                      <img 
                        src={previewImage} 
                        alt="Banner Preview" 
                        className="max-h-48 mx-auto rounded-lg object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => {
                            setSettings({ ...settings, bannerImage: null });
                            setPreviewImage(null);
                            setImageFile(null);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8">
                      <ImageIcon className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                      <p className="text-sm text-gray-500 mb-4">No image uploaded</p>
                      <label className="cursor-pointer">
                        <span className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
                          <Upload className="h-4 w-4" /> Upload Image
                        </span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GlobalSettings;
