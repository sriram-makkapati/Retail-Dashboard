import React, { useMemo, useState, useEffect } from "react";
 
// Create the context instance with initial default values
const ContextInstance = React.createContext({
  datasets: [],
  setDatasets: () => {},
  selectedDataset: null,
  setSelectedDataset: () => {},
  datasetSubmitted: false,
  setDatasetSubmitted: () => {},
  uploadedFiles: [],
  setUploadedFiles: () => {},
  user: null,
  setUser: () => {},
  handleLogout: () => {},
  loading: false,
  setLoading: () => {},
  error: null,
  setError: () => {},
  user_id: null,
  setUserId: () => {},
  data_model_id: null,
  setDataModelId: () => {},
  table_names: [],
  setTableNames: () => {},
  kpis: [],
  setKpis: () => {},
  fileRelations: [],
  setFileRelations: () => {},
});
 
const AppContext = ({ children }) => {
  // Dataset and file upload states
  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [datasetSubmitted, setDatasetSubmitted] = useState(false);

  // Initialize uploadedFiles from localStorage
  const [uploadedFiles, setUploadedFiles] = useState(() => {
    const stored = localStorage.getItem("uploadedFiles");
    return stored ? JSON.parse(stored) : [];
  });

  // Persist uploadedFiles to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  // Initialize user from localStorage
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
 
  // Loading and error states for KPI Grid
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  // States for KPI Grid
  const [user_id, setUserId] = useState(null); // Dynamically set user_id
  const [data_model_id, setDataModelId] = useState(null); // Dynamically set data_model_id
  const [table_names, setTableNames] = useState([]); // Dynamically set table names
  const [kpis, setKpis] = useState([]); // Dynamically set KPIs
  const [fileRelations, setFileRelations] = useState([]); // Store file relationships
  const [generatedGraphs, setGeneratedGraphs] = useState([]); // New state for generated graphs
  // Logout function
  const handleLogout = () => {
    setUser(null);
    setUploadedFiles([]);
    setTableNames([]);
    setKpis([]);
    setFileRelations([]);
    // Clear all localStorage (including datamodelFiles, userData, etc)
    localStorage.clear();
  };
 
  // Memoize context values to prevent unnecessary re-renders
  const values = useMemo(() => {
    return {
      datasets,
      setDatasets,
      selectedDataset,
      setSelectedDataset,
      datasetSubmitted,
      setDatasetSubmitted,
      uploadedFiles,
      setUploadedFiles,
      user,
      setUser,
      handleLogout,
      loading,
      setLoading,
      error,
      setError,
      user_id,
      setUserId,
      data_model_id,
      setDataModelId,
      table_names,
      setTableNames,
      kpis,
      setKpis,
      fileRelations,
      setFileRelations,
      generatedGraphs, setGeneratedGraphs
    };
  }, [
    datasets,
    selectedDataset,
    datasetSubmitted,
    uploadedFiles,
    user,
    loading,
    error,
    user_id,
    data_model_id,
    table_names,
    kpis,
    fileRelations,
    generatedGraphs,
  ]);
 
  return <ContextInstance.Provider value={values}>{children}</ContextInstance.Provider>;
};
 
export { AppContext, ContextInstance };