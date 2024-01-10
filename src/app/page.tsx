 // pages/index.js
"use client"
import React, { useState, useEffect } from 'react';
import Link from "next/link"
import { Container, Table, InputGroup, FormControl, Pagination } from 'react-bootstrap';

const PAGE_SIZE = 10;

const fetchData = async (header:any) => {
  try {
    const response = await fetch("http://localhost:3000/api", {method: "GET", headers:header});
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status} ${response.statusText}`);
    }
    const resonse = await response.json();
    console.log();
    return resonse 
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const postData = async (id:number, body:Item) => {
  try {
    const response = await fetch("http://localhost:3000/api/" + id, {method: "POST", body: body});
    if (!response.ok) {
      throw new Error(`Failed to post data. Status: ${response.status} ${response.statusText}`);
    }
    const resonse = await response.json();
    console.log();
    return resonse 
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

const putData = async (id:number, body:Item) => {
  try {
    const response = await fetch("http://localhost:3000/api/" + id, {method: "PUT", body: body});
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status} ${response.statusText}`);
    }
    const resonse = await response.json();
    console.log();
    return resonse 
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const deleteData = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/${id}`, { method: "DELETE" });

    if (!response.ok) {
      throw new Error(`Failed to delete data. Status: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

  interface Item {
    id: number;
    name: string;
    email: string;
    age: number;
    city: string;
  }

interface ApiResponse {
  data: Item[];
  totalData: number;
}

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(PAGE_SIZE);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const result: ApiResponse = await fetchData(
          {"x-page" : currentPage, "x-page-size" : itemsPerPage, "x-search" : searchTerm});
        console.log(currentPage)
        setData(result.data);
        setTotalItems(result.totalData);
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };

    fetchDataAndSetState();
  }, [currentPage, itemsPerPage, searchTerm]);

  const currentItems = data;
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

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>City</th>
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

      <Pagination>
        <Pagination.Prev
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <Pagination.Item active>{currentPage}</Pagination.Item>
        <Pagination.Next
          onClick={() => setCurrentPage(currentPage + 1)}
        />
      </Pagination>

      <button onClick={() =>{
        deleteData(1)
      }}>
        Delete data
      </button>

      <br/>
      <Link href="/putdata">PUT DATA</Link>
      <br/>
      <Link href="/postdata">POST DATA</Link>

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