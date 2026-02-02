export interface FrequentRecord {
  id: string;
  title: string;
  cat: string;
  subCat: string;
  subset?: string;
  freq: string;
  unit: string;
  src?: string;
  sData?: string;
  datatype?: string;
  hierarchy?: string[];
  db?: string;
}

export interface NestedCategories {
  [key: string]: NestedCategories | Record<string, never>;
}

export interface EconomicData {
  categories: NestedCategories;
  frequent: FrequentRecord[];
}

export interface DataPanelProps {
  economicData: EconomicData;
  /**
   * When true, show skeleton rows instead of data.
   * (No delays are introduced; you control this flag from API state.)
   */
  loading?: boolean;
}

export interface SidebarProps {
  categories: NestedCategories;
  selectedOption: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface LoginFormData {
  username: string;
  password: string;
}
