// pages/index.js
import React, { useState, useEffect } from 'react';
import { Container, Table, InputGroup, FormControl, Pagination } from 'react-bootstrap';

const PAGE_SIZE = 5; // Number of items per page

const fetchData = async () => {
  // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
  const apiUrl = `https://example-api-nextjs.vercel.app/api`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};

interface Item {
    id: number;
    name: string;
    email: string;
    age: number;
    city: string;
  }
  
  interface ApiResponse {
    items: Item[];
    totalItems: number;
  }

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(PAGE_SIZE);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const result: ApiResponse = await fetchData();
      setData(result.items);
      setTotalItems(result.totalItems);
    };

    fetchDataAndSetState();
  }, [currentPage, itemsPerPage, searchTerm]);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the subset of items for the current page
  const currentItems = data.slice(startIndex, endIndex);

  return (
    <Container className="mt-4">
      <InputGroup className="mb-3">
        <FormControl
        placeholder="Search items..."
        aria-label="Search"
        aria-describedby="search-addon"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.age}</td>
              <td>{item.city}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <Pagination.Item active>{currentPage}</Pagination.Item>
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={endIndex >= totalItems}
        />
      </Pagination> */}

      <div className="mt-3">
        <label>Items per page:</label>
        <input
          type="number"
          min="1"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
        />
      </div>
    </Container>
  );
};

export default HomePage;