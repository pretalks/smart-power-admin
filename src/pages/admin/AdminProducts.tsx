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
  Image as ImageIcon,
  Check
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  showOnHomepage: boolean;
  image: string | null;
  createdAt?: any;
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    title: '',
    description: '',
    category: 'Shop',
    showOnHomepage: false,
    image: null
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(items);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        description: product.description,
        category: product.category,
        showOnHomepage: product.showOnHomepage,
        image: product.image
      });
      setPreviewImage(product.image);
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        description: '',
        category: 'Shop',
        showOnHomepage: false,
        image: null
      });
      setPreviewImage(null);
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingProduct) {
        const docRef = doc(db, 'products', editingProduct.id);
        await updateDoc(docRef, { ...formData });
        toast.success('Product updated successfully!');
      } else {
        await addDoc(collection(db, 'products'), {
          ...formData,
          createdAt: serverTimestamp()
        });
        toast.success('Product added successfully!');
      }
      setIsDialogOpen(false);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">Manage your product catalog and visibility.</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search products..." 
              className="pl-10 max-w-sm" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-12 text-center text-gray-500">Loading products...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-4 px-4 font-semibold text-sm text-gray-600">Product</th>
                    <th className="py-4 px-4 font-semibold text-sm text-gray-600">Category</th>
                    <th className="py-4 px-4 font-semibold text-sm text-gray-600">Home</th>
                    <th className="py-4 px-4 font-semibold text-sm text-gray-600 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200">
                              {product.image ? (
                                <img src={product.image} alt="" className="h-full w-full object-cover" />
                              ) : (
                                <ImageIcon className="h-full w-full p-3 text-gray-300" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{product.title}</p>
                              <p className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">{product.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          {product.showOnHomepage ? (
                            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                              <Check className="h-3.5 w-3.5 text-green-600" />
                            </div>
                          ) : (
                            <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center" />
                          )}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleOpenDialog(product)}>
                                <Edit2 className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600 focus:text-red-600"
                                onClick={() => handleDelete(product.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-gray-500">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              <DialogDescription>
                Fill in the details below. All fields are required.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Product Title</Label>
                <Input 
                  id="title" 
                  value={formData.title} 
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(val) => setFormData({ ...formData, category: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Shop">Shop</SelectItem>
                      <SelectItem value="AMC">AMC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Checkbox 
                    id="home" 
                    checked={formData.showOnHomepage}
                    onCheckedChange={(checked) => setFormData({ ...formData, showOnHomepage: !!checked })}
                  />
                  <Label htmlFor="home">Show on Homepage</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea 
                  id="desc" 
                  value={formData.description} 
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[100px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Product Image</Label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                  {previewImage ? (
                    <div className="relative inline-block">
                      <img src={previewImage} alt="Preview" className="h-24 w-24 object-cover rounded-lg" />
                      <button 
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, image: null });
                          setPreviewImage(null);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer group">
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-gray-300 group-hover:text-primary mb-1 transition-colors" />
                        <span className="text-xs text-gray-500 group-hover:text-primary transition-colors">Click to upload</span>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving...' : (editingProduct ? 'Update Product' : 'Save Product')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
