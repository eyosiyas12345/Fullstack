import { useEffect, useState } from 'react'

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetching from your Node.js server port 8080
    fetch('http://localhost:8080/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log("Request fetching error: "+err));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Apple Store Test</h1>
      {products.map((item) => (
        <div key={item.product_id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h2>{item.product_name}</h2>
          <p>{item.product_description}</p>
        </div>
      ))}
    </div>
  )
}
export default App