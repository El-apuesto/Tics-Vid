import { useState, useEffect, useRef } from 'react';
import { Lock, Eye, EyeOff, Save, Plus, Trash2, LogOut, DollarSign, Calendar, Video, ShoppingBag, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Show, Video as VideoType, Donation, Product } from '@/types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

// Default credentials
const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = 'tourettes2026';

export function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  // Admin data state
  const [shows, setShows] = useState<Show[]>([]);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // File upload refs
  const videoThumbnailInputRef = useRef<HTMLInputElement>(null);
  const productImageInputRef = useRef<HTMLInputElement>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedShows = localStorage.getItem('admin_shows');
    const savedVideos = localStorage.getItem('admin_videos');
    const savedDonations = localStorage.getItem('admin_donations');
    const savedProducts = localStorage.getItem('admin_products');
    const savedCredentials = localStorage.getItem('admin_credentials');

    if (savedShows) setShows(JSON.parse(savedShows));
    if (savedVideos) setVideos(JSON.parse(savedVideos));
    if (savedDonations) setDonations(JSON.parse(savedDonations));
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedCredentials) {
      const creds = JSON.parse(savedCredentials);
      setNewUsername(creds.username);
    }
  }, []);

  const handleLogin = () => {
    const savedCredentials = localStorage.getItem('admin_credentials');
    let validUsername = DEFAULT_USERNAME;
    let validPassword = DEFAULT_PASSWORD;

    if (savedCredentials) {
      const creds = JSON.parse(savedCredentials);
      validUsername = creds.username;
      validPassword = creds.password;
    }

    if (username === validUsername && password === validPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleUpdateCredentials = () => {
    if (newUsername && newPassword) {
      localStorage.setItem('admin_credentials', JSON.stringify({
        username: newUsername,
        password: newPassword
      }));
      alert('Credentials updated successfully!');
    }
  };

  const handleAddShow = () => {
    const newShow: Show = {
      id: Date.now().toString(),
      date: 'New Date',
      venue: 'New Venue',
      location: 'New Location',
      link: '#'
    };
    const updatedShows = [...shows, newShow];
    setShows(updatedShows);
    localStorage.setItem('admin_shows', JSON.stringify(updatedShows));
  };

  const handleUpdateShow = (id: string, field: keyof Show, value: string) => {
    const updatedShows = shows.map(show =>
      show.id === id ? { ...show, [field]: value } : show
    );
    setShows(updatedShows);
    localStorage.setItem('admin_shows', JSON.stringify(updatedShows));
  };

  const handleDeleteShow = (id: string) => {
    const updatedShows = shows.filter(show => show.id !== id);
    setShows(updatedShows);
    localStorage.setItem('admin_shows', JSON.stringify(updatedShows));
  };

  const handleAddVideo = () => {
    const newVideo: VideoType = {
      id: Date.now().toString(),
      title: 'New Video',
      thumbnail: '/video_reel.jpg',
      url: '',
      embedUrl: ''
    };
    const updatedVideos = [...videos, newVideo];
    setVideos(updatedVideos);
    localStorage.setItem('admin_videos', JSON.stringify(updatedVideos));
  };

  const handleUpdateVideo = (id: string, field: keyof VideoType, value: string) => {
    const updatedVideos = videos.map(video =>
      video.id === id ? { ...video, [field]: value } : video
    );
    setVideos(updatedVideos);
    localStorage.setItem('admin_videos', JSON.stringify(updatedVideos));
  };

  const handleDeleteVideo = (id: string) => {
    const updatedVideos = videos.filter(video => video.id !== id);
    setVideos(updatedVideos);
    localStorage.setItem('admin_videos', JSON.stringify(updatedVideos));
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: 'New Product',
      description: 'Product description',
      price: 25,
      image: '/product_tshirt_1.jpg',
      category: 'apparel',
      variants: ['Men\'s T-Shirt', 'Women\'s T-Shirt', 'Unisex Sweater'],
      printfulUrl: 'https://www.printful.com/'
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('admin_products', JSON.stringify(updatedProducts));
  };

  const handleUpdateProduct = (id: string, field: keyof Product, value: string | number) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, [field]: value } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('admin_products', JSON.stringify(updatedProducts));
  };

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('admin_products', JSON.stringify(updatedProducts));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    onClose();
  };

  const handleVideoThumbnailUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        handleUpdateVideo(id, 'thumbnail', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductImageUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        handleUpdateProduct(id, 'image', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Keyboard shortcut listener (Ctrl + Tab + Down Arrow)
  useEffect(() => {
    const keysPressed = new Set<string>();

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.add(e.key);
      
      // Check for Ctrl + Tab + ArrowDown
      if (
        keysPressed.has('Control') &&
        keysPressed.has('Tab') &&
        keysPressed.has('ArrowDown')
      ) {
        e.preventDefault();
        // Open admin (you'll need to pass a prop to trigger this from parent)
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.delete(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  if (!isAuthenticated) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display font-black text-2xl flex items-center gap-3">
              <Lock className="w-6 h-6 text-primary" />
              Admin Login
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <Button onClick={handleLogin} className="w-full btn-primary">
              <Lock className="w-4 h-4 mr-2" />
              Login
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              Default: admin / tourettes2026
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-card border-border max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="font-display font-black text-2xl flex items-center justify-between">
            <span className="flex items-center gap-3">
              Admin Dashboard
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="shows" className="pt-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="shows">
              <Calendar className="w-4 h-4 mr-2" />
              Shows
            </TabsTrigger>
            <TabsTrigger value="videos">
              <Video className="w-4 h-4 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="products">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="donations">
              <DollarSign className="w-4 h-4 mr-2" />
              Donations
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Lock className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Shows Tab */}
          <TabsContent value="shows" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Upcoming Shows</h3>
              <Button onClick={handleAddShow} size="sm" className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Show
              </Button>
            </div>
            
            <div className="space-y-3">
              {shows.map((show) => (
                <div key={show.id} className="grid grid-cols-4 gap-3 p-3 bg-background border border-border rounded-lg">
                  <Input
                    value={show.date}
                    onChange={(e) => handleUpdateShow(show.id, 'date', e.target.value)}
                    placeholder="Date"
                  />
                  <Input
                    value={show.venue}
                    onChange={(e) => handleUpdateShow(show.id, 'venue', e.target.value)}
                    placeholder="Venue"
                  />
                  <Input
                    value={show.location}
                    onChange={(e) => handleUpdateShow(show.id, 'location', e.target.value)}
                    placeholder="Location"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={show.link}
                      onChange={(e) => handleUpdateShow(show.id, 'link', e.target.value)}
                      placeholder="Link"
                    />
                    <button
                      onClick={() => handleDeleteShow(show.id)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {shows.length === 0 && (
                <p className="text-muted-foreground text-center py-8">No shows added yet.</p>
              )}
            </div>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Video Gallery</h3>
              <Button onClick={handleAddVideo} size="sm" className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Video
              </Button>
            </div>
            
            <div className="space-y-3">
              {videos.map((video) => (
                <div key={video.id} className="grid grid-cols-1 gap-3 p-3 bg-background border border-border rounded-lg">
                  <Input
                    value={video.title}
                    onChange={(e) => handleUpdateVideo(video.id, 'title', e.target.value)}
                    placeholder="Title"
                  />
                  <Input
                    value={video.embedUrl || ''}
                    onChange={(e) => handleUpdateVideo(video.id, 'embedUrl', e.target.value)}
                    placeholder="YouTube Embed URL"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={video.thumbnail}
                      onChange={(e) => handleUpdateVideo(video.id, 'thumbnail', e.target.value)}
                      placeholder="Thumbnail URL"
                      className="flex-1"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleVideoThumbnailUpload(video.id, e)}
                      className="hidden"
                      id={`thumbnail-upload-${video.id}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById(`thumbnail-upload-${video.id}`)?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                    <button
                      onClick={() => handleDeleteVideo(video.id)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {videos.length === 0 && (
                <p className="text-muted-foreground text-center py-8">No videos added yet.</p>
              )}
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Printful Products</h3>
              <Button onClick={handleAddProduct} size="sm" className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
            
            <div className="space-y-3">
              {products.map((product) => (
                <div key={product.id} className="grid grid-cols-1 gap-3 p-3 bg-background border border-border rounded-lg">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      value={product.name}
                      onChange={(e) => handleUpdateProduct(product.id, 'name', e.target.value)}
                      placeholder="Product Name"
                    />
                    <Input
                      value={product.price}
                      type="number"
                      onChange={(e) => handleUpdateProduct(product.id, 'price', parseFloat(e.target.value))}
                      placeholder="Price"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={product.image}
                      onChange={(e) => handleUpdateProduct(product.id, 'image', e.target.value)}
                      placeholder="Image URL"
                      className="flex-1"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleProductImageUpload(product.id, e)}
                      className="hidden"
                      id={`product-image-upload-${product.id}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById(`product-image-upload-${product.id}`)?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      value={product.printfulUrl || ''}
                      onChange={(e) => handleUpdateProduct(product.id, 'printfulUrl', e.target.value)}
                      placeholder="Printful URL"
                    />
                    <Input
                      value={product.category}
                      onChange={(e) => handleUpdateProduct(product.id, 'category', e.target.value)}
                      placeholder="Category"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No products added yet.</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Add products with Printful links to display on the shop page.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Donations Tab */}
          <TabsContent value="donations" className="space-y-4">
            <h3 className="font-bold text-lg">Donation History</h3>
            
            <div className="space-y-3">
              {donations.length > 0 ? (
                donations.map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
                    <div>
                      <p className="font-bold">${donation.amount}</p>
                      <p className="text-sm text-muted-foreground">{donation.date}</p>
                      {donation.donor && <p className="text-sm">From: {donation.donor}</p>}
                    </div>
                    {donation.message && (
                      <p className="text-sm text-muted-foreground italic">&quot;{donation.message}&quot;</p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No donations recorded yet.</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Donations made through Cash App will appear here.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <h3 className="font-bold text-lg">Update Credentials</h3>
            
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="newUsername">New Username</Label>
                <Input
                  id="newUsername"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter new username"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              
              <Button onClick={handleUpdateCredentials} className="btn-primary">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>

            <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h4 className="font-bold mb-2">Keyboard Shortcut</h4>
              <p className="text-sm text-muted-foreground">
                Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl</kbd> +{' '}
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Tab</kbd> +{' '}
                <kbd className="px-2 py-1 bg-muted rounded text-xs">↓</kbd> to quickly open admin
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
