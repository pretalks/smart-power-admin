import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Star,
  Quote
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  createdAt?: any;
}

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState<Omit<Review, 'id'>>({
    name: '',
    rating: 5,
    text: ''
  });

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(items);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleOpenDialog = (review?: Review) => {
    if (review) {
      setEditingReview(review);
      setFormData({
        name: review.name,
        rating: review.rating,
        text: review.text
      });
    } else {
      setEditingReview(null);
      setFormData({
        name: '',
        rating: 5,
        text: ''
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingReview) {
        await updateDoc(doc(db, 'reviews', editingReview.id), { ...formData });
        toast.success('Review updated successfully!');
      } else {
        await addDoc(collection(db, 'reviews'), {
          ...formData,
          createdAt: serverTimestamp()
        });
        toast.success('Review added successfully!');
      }
      setIsDialogOpen(false);
      fetchReviews();
    } catch (error) {
      console.error("Error saving review:", error);
      toast.error("Failed to save review");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteDoc(doc(db, 'reviews', id));
        toast.success('Deleted successfully');
        fetchReviews();
      } catch (error) {
        console.error("Error deleting review:", error);
        toast.error("Failed to delete");
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Reviews</h1>
          <p className="text-gray-500 mt-1">Manage testimonials shown on the website.</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Review
        </Button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-500">Loading reviews...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Card key={review.id} className="relative overflow-hidden group">
                <CardContent className="pt-6">
                  <Quote className="absolute top-4 right-4 h-8 w-8 text-gray-100 group-hover:text-primary/10 transition-colors" />
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6 leading-relaxed">"{review.text}"</p>
                  <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                        <p className="text-xs text-gray-400">
                          {review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString() : 'Just now'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenDialog(review)}>
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(review.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <Star className="h-12 w-12 mx-auto text-gray-200 mb-4" />
              <p className="text-gray-500">No reviews yet.</p>
            </div>
          )}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{editingReview ? 'Edit Review' : 'Add New Review'}</DialogTitle>
              <DialogDescription>Add a customer testimonial with rating.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Customer Name</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: num })}
                      className={`h-10 w-10 rounded-lg flex items-center justify-center transition-all ${
                        formData.rating >= num ? 'bg-yellow-100 text-yellow-600 shadow-sm' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      <Star className={`h-5 w-5 ${formData.rating >= num ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="text">Review Text</Label>
                <Textarea id="text" value={formData.text} onChange={(e) => setFormData({ ...formData, text: e.target.value })} required className="min-h-[120px]" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save Review'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminReviews;
