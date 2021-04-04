import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function Layout({ children, home }: {children: React.ReactNode, home?: boolean}) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Dasbot Stats</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/chats">Chats</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <main>{children}</main>
    </div>
  )
}