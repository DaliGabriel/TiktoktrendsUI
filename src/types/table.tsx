import { Edge } from "./trends";

export interface TableProps {
  trends: Edge[];
  totalHashtags: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedCategory: string;
  setSelectedCategory: (country: string) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  loadMore: () => void;
}
