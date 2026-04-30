import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { whyChooseUsItems as defaultWhyChoose, services as defaultServices, reviews as defaultReviews, subsidyStates as defaultSubsidy } from '@/data/siteData';

interface SiteContextType {
  globalSettings: any;
  homepageSections: any;
  products: any[];
  subsidyStates: any[];
  reviews: any[];
  loading: boolean;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [globalSettings, setGlobalSettings] = useState<any>(null);
  const [homepageSections, setHomepageSections] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [subsidyStates, setSubsidyStates] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Global Settings
        const settingsSnap = await getDoc(doc(db, 'globalSettings', 'main'));
        if (settingsSnap.exists()) setGlobalSettings(settingsSnap.data());

        // Fetch Homepage Sections
        const sectionsSnap = await getDoc(doc(db, 'homepageSections', 'main'));
        if (sectionsSnap.exists()) setHomepageSections(sectionsSnap.data());

        // Fetch Products
        const prodSnap = await getDocs(query(collection(db, 'products'), orderBy('createdAt', 'desc')));
        if (!prodSnap.empty) {
          setProducts(prodSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }

        // Fetch Subsidy States
        const subSnap = await getDocs(query(collection(db, 'subsidyStates'), orderBy('createdAt', 'desc')));
        if (!subSnap.empty) {
          setSubsidyStates(subSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }

        // Fetch Reviews
        const revSnap = await getDocs(query(collection(db, 'reviews'), orderBy('createdAt', 'desc')));
        if (!revSnap.empty) {
          setReviews(revSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }

      } catch (error) {
        console.error("Error fetching site data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <SiteContext.Provider value={{ 
      globalSettings, 
      homepageSections, 
      products, 
      subsidyStates, 
      reviews, 
      loading 
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSiteData must be used within a SiteProvider');
  }
  return context;
};
