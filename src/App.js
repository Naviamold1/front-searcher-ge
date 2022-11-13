import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

function App() {
  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <SearchBar />
        <ReactQueryDevtools initialIsOpen={false} />
  
      </QueryClientProvider>
    </div>
  );
}

export default App;
