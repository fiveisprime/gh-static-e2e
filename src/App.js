import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      const response = await axios.get("api/products");
      setProducts(response.data);
      setLoading(false);
    }

    getProducts();
  }, []);

  return (
    <div id="app">
      <header>
        <div className="container">
          <div className="hero is-info is-bold">
            <div className="hero-body">
              <h1 className="is-size-1">Products</h1>
            </div>
          </div>
        </div>
      </header>
      <section className="section">
        <div className="container">
          <div>
            <table className="table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th className="has-text-centered">Units in Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map(
                  ({ id, name, brand, price, stockUnits }, index) => (
                    <tr>
                      <td>{name}</td>
                      <td>{brand.name}</td>
                      <td>{price}</td>
                      <td class="has-text-centered">{stockUnits}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            {loading ? (
              <div className="has-text-centered" v-show="products.length < 1">
                <h2 className="is-size-4 has-text-info">Loading...</h2>
              </div>
            ) : (
              ""
            )}
          </div>
          <div id="toast" v-show="toast.show" className="container">
            <h2 className="is-size-5 has-text-white">Unable to reach API</h2>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
