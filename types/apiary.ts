
export interface ApiaryUpdateData {
  title?: string;
  location?: string;
  numberOfHives?: number;
  notes?: string;
}

export interface Apiary {
  ownerEmail: string;
  title: string;
  location: string;
  numberOfHives: number; 
  notes?: string;
  ownerId?: string;
  dateAdded?: string;
  // add other fields as needed
}
