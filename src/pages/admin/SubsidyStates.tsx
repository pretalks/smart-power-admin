import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Upload, 
  X,
  MapPin
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { uploadImage } from '@/lib/supabase';

interface SubsidyState {
  id: string;
  name: string;
  description: string;
  eligibility: string;
  benefits: string;
  image: string | null;
  createdAt?: any;
}

const SubsidyStates = () => {
  const [states, setStates] = useState<SubsidyState[]>([]);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingState, setEditingState] = useState<SubsidyState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState<Omit<SubsidyState, 'id'>>({
    name: '',
    description: '',
    eligibility: '',
    benefits: '',
    image: null
  });

  const fetchStates = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'subsidyStates'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SubsidyState[];
      setStates(items);
    } catch (error) {
      console.error("Error fetching states:", error);
      toast.error("Failed to load subsidy states");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const handleOpenDialog = (state?: SubsidyState) => {
    if (state) {
      setEditingState(state);
      setFormData({
        name: state.name,
        description: state.description,
        eligibility: state.eligibility,
        benefits: state.benefits,
        image: state.image
      });
      setPreviewImage(state.image);
    } else {
      setEditingState(null);
      setFormData({
        name: '',
        description: '',
        eligibility: '',
        benefits: '',
        image: null
      });
      setPreviewImage(null);
    }
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const dataToSave = { ...formData, image: imageUrl };

      if (editingState) {
        await updateDoc(doc(db, 'subsidyStates', editingState.id), dataToSave);
        toast.success('State info updated successfully!');
      } else {
        await addDoc(collection(db, 'subsidyStates'), {
          ...dataToSave,
          createdAt: serverTimestamp()
        });
        toast.success('State info added successfully!');
      }
      setIsDialogOpen(false);
      fetchStates();
    } catch (error) {
      console.error("Error saving state:", error);
      toast.error("Failed to save state info");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this state entry?')) {
      try {
        await deleteDoc(doc(db, 'subsidyStates', id));
        toast.success('Deleted successfully');
        fetchStates();
      } catch (error) {
        console.error("Error deleting state:", error);
        toast.error("Failed to delete");
      }
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

  const filteredStates = states.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subsidy States</h1>
          <p className="text-gray-500 mt-1">Manage state-wise solar subsidy information.</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add State
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search states..." 
          className="pl-10" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-500">Loading states...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStates.length > 0 ? (
            filteredStates.map((state) => (
              <Card key={state.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="h-48 relative overflow-hidden bg-gray-100">
                  {state.image ? (
                    <img src={state.image} alt={state.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <MapPin className="h-12 w-12" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/90 backdrop-blur shadow-sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleOpenDialog(state)}>
                          <Edit2 className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(state.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{state.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{state.description}</p>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Benefits</p>
                      <p className="text-sm text-green-800 line-clamp-2">{state.benefits}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">Eligibility</p>
                      <p className="text-sm text-blue-800 line-clamp-2">{state.eligibility}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-500">No subsidy states found.</p>
            </div>
          )}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{editingState ? 'Edit State Info' : 'Add New State'}</DialogTitle>
              <DialogDescription>Update the solar subsidy details for the state.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">State Name</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea id="desc" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eligibility">Eligibility Criteria</Label>
                  <Textarea id="eligibility" value={formData.eligibility} onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefits / Incentives</Label>
                  <Textarea id="benefits" value={formData.benefits} onChange={(e) => setFormData({ ...formData, benefits: e.target.value })} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Featured Image</Label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                  {previewImage ? (
                    <div className="relative inline-block w-full">
                      <img src={previewImage} alt="Preview" className="h-32 w-full object-cover rounded-lg" />
                      <button type="button" onClick={() => { setFormData({ ...formData, image: null }); setPreviewImage(null); setImageFile(null); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer py-4 block">
                      <Upload className="h-8 w-8 mx-auto text-gray-300 mb-2" />
                      <span className="text-sm text-gray-500">Upload state banner or map</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving...' : (editingState ? 'Update Info' : 'Save State Info')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubsidyStates;
