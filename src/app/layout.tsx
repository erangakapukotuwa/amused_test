'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.css'

import { Inter } from 'next/font/google';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const inter = Inter({ subsets: ['latin'] });
import { useEffect } from 'react'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require('bootstrap/dist/js/bootstrap.js')
    }
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={inter.className}>
          <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="/">Amused Test</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/favorites">Favorites</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <div>
            {children}
          </div>
        </body>
      </html>
    </QueryClientProvider>
  );
}
